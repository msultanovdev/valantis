import { useState, useEffect, FC } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { fetchData } from "../../../api/http";
import Card from "../../../components/Card/Card";
import { IProduct, IReqData } from "../../../types/types";
import CardSkeleton from "../../../components/Card/CardSkeleton/CardSkeleton";

type filterComponentProps = {
  type: string;
  value: string | number;
  setSeacrhValue: (a: string) => void;
};
const FilteredProducts: FC<filterComponentProps> = ({
  type,
  value,
  setSeacrhValue,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchItems = async (reqBody: IReqData) => {
    try {
      const data: IProduct[] = await fetchData(reqBody);
      if (data?.length) {
        const uniqueProducts = data?.filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj["id"] === item["id"]),
        );
        setTotalCount(data?.length);
        setAllProducts(uniqueProducts);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = {};
    if (type) {
      Object.defineProperty(params, `${type}`, {
        value: Number(value) ? Number(value) : value.toString().toLowerCase(),
        enumerable: true,
      });
    }
    fetchFilteredData({ action: "filter", params });
    setOffset(0);
  }, [value, type]);

  useEffect(() => {
    fetchItems({ action: "get_items", params: { ids: ids } });
  }, [ids]);

  const fetchFilteredData = async (reqBody: IReqData) => {
    try {
      setIsLoading(true);
      const data = await fetchData(reqBody);
      console.log(data);

      setIds(data);
    } catch (e) {
      console.log(e);
    }
  };

  const prevPage = () => {
    if (offset !== 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOffset((prevState) => (prevState -= 50));
    }
  };

  const nextPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset((prevState) => (prevState += 50));
  };

  useEffect(() => {
    if (allProducts?.length) {
      setProducts(allProducts.slice(offset, offset + 50));
    }
  }, [offset, allProducts]);

  return (
    <div>
      <div className={"homeProducts"}>
        {products?.length === 0 && !isLoading && (
          <div className={"homeNothingFound"}>
            {"Ничего не найдено :("}{" "}
            <button onClick={() => setSeacrhValue("")}>Сбросить фильтр</button>
          </div>
        )}
        {isLoading && <CardSkeleton cards={12} />}
        {products?.length && !isLoading
          ? products.map((product) => {
              return (
                <div className={"cardWrapper"} key={product.id}>
                  <Card
                    brand={product.brand}
                    id={product.id}
                    price={product.price}
                    product={product.product}
                  />
                </div>
              );
            })
          : ""}
      </div>
      {products?.length ? (
        <div className={"homePagination"}>
          <button onClick={prevPage} disabled={offset === 0}>
            <BsArrowLeft style={{ height: "100%", width: "100%" }} />
          </button>
          <button
            onClick={nextPage}
            disabled={offset + products.length >= totalCount}
          >
            <BsArrowRight style={{ height: "100%", width: "100%" }} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilteredProducts;
