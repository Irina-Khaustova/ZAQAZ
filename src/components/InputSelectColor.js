import React, { useState } from "react";
import { FormControl, Select, MenuItem, styled } from "@mui/material";

const ColorfulSelect = styled(Select)(({ value }) => {
  const backgroundColor =
    value === "WAITING"
      ? "#FFE8D2"
      : value === "REQUESTED"
      ? "#E6D4ED"
      : value === "IN_STOCK"
      ? "#F7D1D7"
      : value === "READY_FOR_DELIVERY"
      ? "#D4E6F9"
      : "transparent";

  const textColor =
    value === "WAITING"
      ? "#D17A5D"
      : value === "REQUESTED"
      ? "#A76EB2"
      : value === "IN_STOCK"
      ? "#D25D83"
      : value === "READY_FOR_DELIVERY"
      ? "#2D9CDB"
      : "black";

  return {
    height: "36px",
    borderRadius: "54px",
    fontSize: "12px",
    backgroundColor,
    color: textColor,
    "& .MuiSelect-select": {
      height: "40px",
      padding: "0 8px",
      lineHeight: "36px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: backgroundColor,
      borderRadius: "16px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: backgroundColor,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: backgroundColor,
    },
  };
});

const InputSelectColor = ({ inputValue, statusChange }) => {
  const [color, setColor] = useState("");

  console.log(inputValue);

  const handleChange = (event) => {
    setColor(event.target.value);
    statusChange(event.target.value);
  };

  useState(() => {
    setColor(inputValue);
  }, [inputValue]);

  return (
    <FormControl variant="outlined">
      <ColorfulSelect
        labelId="custom-select-label"
        value={color}
        onChange={handleChange}
        noValidate
        sx={{ paddingLeft: "5px", lineHeight: "36px" }}
      >
        <MenuItem value="WAITING">В ожидании</MenuItem>
        <MenuItem value="REQUESTED">Запрошен у поставщика</MenuItem>
        <MenuItem value="IN_STOCK">На складе</MenuItem>
        <MenuItem value="READY_FOR_DELIVERY">Упакован</MenuItem>
        <MenuItem value="IN_TRANSIT">В пути</MenuItem>
        <MenuItem value="CANCELED">Отменен</MenuItem>
        <MenuItem value="SENT">Отправлен</MenuItem>
      </ColorfulSelect>
    </FormControl>
  );
};

export default InputSelectColor;
