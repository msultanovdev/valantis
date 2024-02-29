import "./Home.css";
import { BsSearch } from "react-icons/bs";
import AllProducts from "./AllProducts/AllProducts";
import FilteredProducts from "./FilteredProducts/FilteredProducts";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  return (
    <div className={"home"}>
      <div className={"homeSearch"}>
        <Select
          onChange={(e) => setType(e?.value ?? "")}
          defaultValue={{ value: "Фильтровать по", label: "Фильтровать по" }}
          options={[
            { value: "brand", label: "По бренду" },
            { value: "product", label: "По названию" },
            { value: "price", label: "По цене" },
          ]}
        />
        <div className="form__group field">
          <input
            value={text}
            disabled={!type}
            onChange={(e) => setText(e.target.value)}
            type="input"
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
      {value ? <FilteredProducts type={type} value={value} /> : <AllProducts />}
    </div>
  );
};

export default Home;
