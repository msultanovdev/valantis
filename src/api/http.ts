import axios from "axios";
import { IReqData } from "../types/types";
import { generateAuthString } from "../utils/helper";

export async function fetchData(reqBody: IReqData, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const configs = {
        headers: {
          "X-Auth": generateAuthString("Valantis"),
          "Content-Type": "application/json",
        },
      };
      let body = JSON.stringify(reqBody);
      const res = await axios.post(
        `${process.env.REACT_APP_URL}`,
        body,
        configs,
      );
      return res.data.result;
    } catch (e) {
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error("Превышено количество попыток");
      }
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
}
