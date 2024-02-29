import cl from "./Container.module.css";
import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className={cl.container}>{children}</div>;
};

export default Container;
