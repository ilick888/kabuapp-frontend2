import React, { useState, useEffect } from "react";
import Axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress, makeStyles } from "@material-ui/core";

interface Props {
  id: number;
}

interface StockPrice {
  adjustment: number;
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
  volume: number;
}

const useStyles = makeStyles((theme) => ({
  progress: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
}));

const StockTable: React.FC = (props: Props) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const id: number = props.id;
  useEffect(() => {
    Axios.get(`http://localhost:8000/${id}`).then((res) => {
      const result: Array<StockPrice> = res.data;
      setTableData(result.slice(0, 5));
      setLoading(false);
    });
  }, [id]);

  const rendarData = tableData.map((e: StockPrice) => {
    return (
      <TableRow key={e.date}>
        <TableCell>{e.date}</TableCell>
        <TableCell>{e.open}</TableCell>
        <TableCell>{e.high}</TableCell>
        <TableCell>{e.low}</TableCell>
        <TableCell>{e.close}</TableCell>
        <TableCell>{e.volume}</TableCell>
        <TableCell>{e.adjustment}</TableCell>
      </TableRow>
    );
  });

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>始値</TableCell>
            <TableCell>高値</TableCell>
            <TableCell>安値</TableCell>
            <TableCell>終値</TableCell>
            <TableCell>出来高</TableCell>
            <TableCell>終値調整</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{loading ? null : rendarData}</TableBody>
      </Table>
      {loading ? <CircularProgress className={classes.progress} /> : null}
    </React.Fragment>
  );
};

export default StockTable;
