import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDate } from "../utils/DateFormatter";
const ALPHAVENTAGE_API_KEY = "PNI4XAML7ZWO4JVK";
import useSWR from "swr";

interface CustomTableProps {
  code: string;
  range: string[];
}

interface DateResponseProps {
  "Meta Data": {
    "1. Information": string;
    "2. Digital Currency Code": string;
    "3. Digital Currency Name": string;
    "4. Market Code": string;
    "5. Market Name": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
  };
  "Time Series (Digital Currency Daily)": {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

function filterTimeSeries(data: DateResponseProps, start: string, end: string) {
  const timeSeries = data["Time Series (Digital Currency Daily)"];
  const filteredData: {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  } = {};

  Object.keys(timeSeries).forEach((date) => {
    if (date >= start && date <= end) {
      filteredData[date] = timeSeries[date];
    }
  });

  return filteredData;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CustomTable(props: CustomTableProps) {
  const { data: currencyData } = useSWR(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${props.code}&to_currency=USD&apikey=${ALPHAVENTAGE_API_KEY}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 86400 }
  );

  const { data: dateCurrencyData } = useSWR(
    `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${ALPHAVENTAGE_API_KEY}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 86400 }
  );

  React.useEffect(() => {
    console.log(currencyData);
  }, [currencyData]);

  if (!currencyData || !dateCurrencyData)
    return <div className="text-black">Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Exchange Rate</TableCell>
            <TableCell>Last Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyData && props.code !== "" && (
            <TableRow>
              <TableCell>
                {
                  currencyData["Realtime Currency Exchange Rate"][
                    "1. From_Currency Code"
                  ]
                }
              </TableCell>
              <TableCell>
                {
                  currencyData["Realtime Currency Exchange Rate"][
                    "3. To_Currency Code"
                  ]
                }
              </TableCell>
              <TableCell>
                {
                  currencyData["Realtime Currency Exchange Rate"][
                    "5. Exchange Rate"
                  ]
                }
              </TableCell>
              <TableCell>
                {formatDate(
                  currencyData["Realtime Currency Exchange Rate"][
                    "6. Last Refreshed"
                  ]
                )}
              </TableCell>
            </TableRow>
          )}
          {dateCurrencyData &&
            props.range[0] !== "" &&
            Object.entries(
              filterTimeSeries(dateCurrencyData, props.range[0], props.range[1])
            ).map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  {dateCurrencyData["Meta Data"]["3. Digital Currency Name"]}
                </TableCell>
                <TableCell>USD</TableCell>
                <TableCell>{entry[1]["4. close"]}</TableCell>
                <TableCell>{entry[0].toString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
