import Skeleton from "react-loading-skeleton";
import "./CardSkeleton.css";
import { useRef } from "react";

const CardSkeleton = ({ cards }: { cards: number }) => {
  const windowSize = useRef(window.innerWidth);

  return (
    <>
      {Array(cards)
        .fill(0)
        .map((item, index) => (
          <div className="card-skeleton" key={index}>
            <div className="card-skeleton-header">
              <p>{<Skeleton />}</p>
              <p>{<Skeleton width={"95%"} />}</p>
            </div>
            <div className="card-body">
              <p>
                Бренд: <Skeleton width={100} />
              </p>
              <p>
                Цена:{" "}
                <b>
                  $<Skeleton width={40} style={{ marginLeft: "5px" }} />
                </b>
              </p>
              <span>
                <Skeleton width={"90%"} />
              </span>
            </div>
            <div className="card-footer">
              <button>
                <Skeleton width={55} />
              </button>
              <button>
                <Skeleton width={45} />
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardSkeleton;
