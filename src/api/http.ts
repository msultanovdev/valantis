import axios from "axios";
import { IReqData } from "../types/types";
import { generateAuthString } from "../utils/helper";

export async function fetchData(reqBody: IReqData) {
  try {
    const configs = {
      headers: {
        "X-Auth": generateAuthString("Valantis"),
        "Content-Type": "application/json",
      },
    };
    let body = JSON.stringify(reqBody);
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}`,
      body,
      configs,
    );
    return data.result;
  } catch (e) {
    console.log(e);
  }
}
