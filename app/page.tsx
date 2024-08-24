"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ReusableTable from "./components/CustomTable";
import CustomDatePicker from "./components/CustomDatePicker";

const Page = () => {
  const [currencyCode, setCurrencyCode] = useState("SYP");
  const [dateRange, setDateRange] = useState(["", ""]);

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

  return (
    <>
      <nav className="border-b-2 border-solid border-gray-400 text-white py-8 px-10 mb-5 bg-slate-400">
        <div className="flex justify-between items-center">
          <h1 className="ml-0 text-2xl text-black ">
            Svea Soft Exchange Rates
          </h1>
          <SearchBar setCode={setCurrencyCode} />
        </div>
      </nav>

      <div className="flex items-center mb-4 ml-5">
        <label htmlFor="date-range" className="text-black mr-5">
          Select Date Range
        </label>
        <CustomDatePicker onChange={setDateRange} />
      </div>

      <ReusableTable code={currencyCode} range={dateRange} />
    </>
  );
};

export default Page;
