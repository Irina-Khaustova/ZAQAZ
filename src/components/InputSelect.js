import React from "react";
import { Box, TextField, InputAdornment, MenuItem } from "@mui/material";

function InputSelect({
  title,
  position,
  endPosition,
  icon,
  endIcon,
  size,
  menuItems,
  handleChange,
  value,
  name,
  color,
  height,
}) {
  console.log(size);

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ width: size || "100%" }}
      >
        <TextField
          select
          id="outlined-select-currency"
          value={value}
          onChange={handleChange}
          name={name}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position={position}>{icon}</InputAdornment>
            ) : null,
          }}
          variant="outlined"
          sx={{
            boxSizing: "border-box",
            width: "100%",
            borderRadius: "16px",
            backgroundColor: color ? color : "none",
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              height: "38px",
              "& fieldset": {
                border: "1px solid rgba(235, 235, 235, 1)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(200, 200, 200, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 149, 0, 1)",
              },
              "& .MuiSelect-select span::before": {
                content: `"${title ? title : ""}"`,
              },
            },
          }}
        >
          {menuItems.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
}

export default InputSelect;
