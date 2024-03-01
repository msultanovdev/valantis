import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { fetchData } from "../../../api/http";
import { IProduct, IReqData } from "../../../types/types";
import Card from "../../../components/Card/Card";
import CardSkeleton from "../../../components/Card/CardSkeleton/CardSkeleton";

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchIds = async (reqBody: IReqData) => {
    try {
      setIsLoading(true);
      const data = await fetchData(reqBody);
      setIds(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchItems = async (reqBody: IReqData) => {
    try {
      const data: IProduct[] = await fetchData(reqBody);
      if (data?.length) {
        const uniqueProducts = data?.filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj["id"] === item["id"]),
        );
        setProducts(uniqueProducts);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIds({ action: "get_ids", params: { offset, limit: 50 } });
  }, [offset]);

  useEffect(() => {
    if (ids?.length) {
      fetchItems({ action: "get_items", params: { ids: ids } });
    }
  }, [ids]);

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
  return (
    <div>
      <div className={"homeProducts"}>
        {products?.length === 0 && !isLoading && (
          <div className={"homeNothingFound"}>{"Ничего не найдено :("}</div>
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
          <button onClick={nextPage}>
            <BsArrowRight style={{ height: "100%", width: "100%" }} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AllProducts;
