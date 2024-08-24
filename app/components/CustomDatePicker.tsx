"use client";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { formatDate } from "../utils/DateFormatter";

interface CustomDatePickerProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          onChange={(value) => {
            const fStartDate = formatDate(
              value[0]?.toString() ?? new Date().toString()
            );
            const fEndDate = formatDate(
              value[1]?.toString() ?? new Date().toString()
            );
            console.log([fStartDate.slice(0, 10), fEndDate.slice(0, 10)]);

            props.onChange([fStartDate, fEndDate]);
          }}
          localeText={{ start: "Start-Date", end: "End-Date" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
