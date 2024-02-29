import { useEffect, useState } from "react";
import { IProduct, IReqData } from "../../types/types";
import { fetchData } from "../../api/http";
import CardItem from "../../components/Card/Card";
import cl from "./Home.module.css";
import { RotatingLines } from "react-loader-spinner";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";

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
      <div className={cl.homeSearch}>
        <div className={[cl.form__group, cl.field].join(" ")}>
          <input
            type="input"
            className={cl.form__field}
            placeholder="Поиск..."
            name="search"
            id="search"
            required
          />
          <label htmlFor="search" className={cl.form__label}>
            Поиск...
          </label>
        </div>
        <button>
          <BsSearch style={{ width: "100%", height: "100%" }} />
        </button>
      </div>
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
                <div className={cl.cardWrapper} key={product.id}>
                  <CardItem
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
        <div className={cl.homePagination}>
          <button onClick={prevPage} disabled={offset === 0}>
            <SlArrowLeftCircle style={{ height: "100%", width: "100%" }} />
          </button>
          <button onClick={nextPage}>
            <SlArrowRightCircle style={{ height: "100%", width: "100%" }} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
