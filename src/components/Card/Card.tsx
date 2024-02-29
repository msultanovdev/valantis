import { FC } from "react";
import cl from "./Card.module.css";

interface ICardProps {
  brand: string | null;
  price: number;
  id: string;
  product: string;
}

const Card: FC<ICardProps> = ({ brand, id, product, price }) => {
  return (
    <div className={cl.card}>
      <div className={cl.cardHeader}>
        <p>{product}</p>
      </div>
      <div className={cl.cardBody}>
        <p>Бренд: {brand ? <b>{brand}</b> : "Не указан"}</p>
        <p>
          Цена: <b>${price}</b>
        </p>
        <span>{id}</span>
      </div>
      <div className={cl.cardFooter}>
        <button>Купить сейчас</button>
        <button>В корзину</button>
      </div>
    </div>
  );
};

export default Card;
