import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

function DateInput({ name, onChange, value }) {
  const handleDateChange = (newValue) => {
    const formattedDate = newValue
      ? newValue.format("YYYY-MM-DD") + "T00:00:00"
      : null;
    onChange({ name: name, value: formattedDate });
  };

  const dateValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD-MM-YYYY"
        name={name}
        sx={{
          width: "160px",
          "& .MuiInputLabel-root.Mui-focused": {
            color: "orange",
            backgroundColor: "#EBEBEB",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover > fieldset": { borderColor: "rgba(200, 200, 200, 1)" },
            "&.Mui-focused fieldset": { borderColor: "orange" },
            "&.Mui-focused": {
              borderColor: "orange",
            },
            "& fieldset": {
              border: "1px solid #EBEBEB",
            },
            height: "40px",
            borderRadius: "16px",
          },
        }}
        slotProps={{
          tabs: {
            hidden: false,
          },

          day: {
            sx: {
              "&.MuiPickersDay-root.Mui-selected": {
                backgroundColor: "orange",
              },
            },
          },
          desktopPaper: {
            sx: {
              ".MuiPickersYear-yearButton.Mui-selected": {
                backgroundColor: "orange",
              },
            },
          },
        }}
        value={dateValue}
        onChange={handleDateChange}
        disableOpenPicker={false}
        desktopModeMediaQuery="@media (min-width: 0px)"
        TextFieldComponent={TextField}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
