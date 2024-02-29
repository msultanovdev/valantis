import { useEffect, useState } from "react";
import { IProduct, IReqData } from "../../types/types";
import { fetchData } from "../../api/http";
import CardItem from "../../components/Card/Card";
import cl from "./Home.module.css";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIds = async (reqBody: IReqData) => {
    const data = await fetchData(reqBody);
    setIds(data);
  };

  const fetchItems = async (reqBody: IReqData) => {
    const data: IProduct[] = await fetchData(reqBody);
    if (data.length) {
      const uniqueProducts = data?.filter(
        (item, index, self) =>
          index === self.findIndex((obj) => obj["id"] === item["id"]),
      );
      setProducts(uniqueProducts);
    }
  };

  useEffect(() => {
    fetchIds({ action: "get_ids", params: { limit: 50 } });
  }, []);

  useEffect(() => {
    if (ids.length) {
      fetchItems({ action: "get_items", params: { ids: ids } });
    }
  }, [ids]);

  return (
    <div>
      <div className={cl.homeProducts}>
        {products.length
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
          : "Loading..."}
      </div>
    </div>
  );
};

export default Home;
