import "./Home.css";
import AllProducts from "./AllProducts/AllProducts";
import FilteredProducts from "./FilteredProducts/FilteredProducts";
import Select from "react-select";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [type, setType] = useState("product");
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  const searchOptions = [
    { value: "product", label: "По наименованию" },
    { value: "brand", label: "По бренду" },
    { value: "price", label: "По цене" },
  ];

  return (
    <div className={"home"}>
      <div className={"homeSearch"}>
        <Select
          onChange={(e) => setType(e?.value ?? "")}
          defaultValue={{ value: "product", label: "Поиск по наименованию" }}
          options={searchOptions}
        />
        <div className="form__group field">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type={type === "price" ? "number" : "text"}
            className={"form__field"}
            placeholder="Поиск..."
            name="search"
            id="search"
            required
          />
          <label htmlFor="search" className={"form__label"}>
            Поиск...
          </label>
        </div>
      </div>
      {value ? (
        <FilteredProducts setSeacrhValue={setText} type={type} value={value} />
      ) : (
        <AllProducts />
      )}
    </div>
  );
};

export default Home;
