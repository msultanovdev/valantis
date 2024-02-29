import { useEffect, useState } from "react";
import { IProduct, IReqData } from "../../types/types";
import { fetchData } from "../../api/http";
import CardItem from "../../components/Card/Card";
import cl from "./Home.module.css";
import { RotatingLines } from "react-loader-spinner";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchIds = async (reqBody: IReqData) => {
    try {
      const data = await fetchData(reqBody);
      setIds(data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const fetchItems = async (reqBody: IReqData) => {
    try {
      setIsLoading(true);
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
      setOffset((prevState) => (prevState -= 50));
    }
  };

  const nextPage = () => {
    setOffset((prevState) => (prevState += 50));
  };

  return (
    <div className={cl.home}>
      <div className={cl.homeProducts}>
        {products?.length === 0 && !isLoading && "Ничего не найдено :("}
        {isLoading && (
          <div className={cl.spinner}>
            <RotatingLines
              visible={isLoading}
              strokeColor="white"
              width="96"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        )}
        {products?.length
          ? products.map((product) => {
              return (
                <CardItem
                  key={product.id}
                  brand={product.brand}
                  id={product.id}
                  price={product.price}
                  product={product.product}
                />
              );
            })
          : ""}
      </div>
      <div className={cl.homePagination}>
        <button onClick={prevPage} disabled={offset === 0}>
          <SlArrowLeftCircle size="lg" />
        </button>
        <button onClick={nextPage}>
          <SlArrowRightCircle size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Home;
