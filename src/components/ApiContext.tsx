import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const ApiContext = createContext();

interface StockPrice {
  adjustment: number;
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
  volume: number;
}

const ApiContextProvider = (props) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/${props.id}`).then((res) => {
      const result: Array<StockPrice> = res.data;
      setTableData(result.slice(0, 5));
    });
  });

  return (
    <ApiContext.Provider
      value={{
        tableData,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
