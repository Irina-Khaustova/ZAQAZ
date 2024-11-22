import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";

function Input({
  handleChange,
  value,
  type,
  title,
  position,
  endPosition,
  icon,
  endIcon,
  size,
  onIconClick,
  backgroundColor,
  name,
  height,
}) {
  console.log(size);

  return (
    <>
      <Box sx={{ width: size || "100%", color: "black" }}>
        <TextField
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment
                position={position}
                sx={{
                  cursor: "pointer",
                  "&:MuiTypografy-Root": {
                    color: "#424242",
                  },
                }}
              >
                {icon}
              </InputAdornment>
            ) : null,
            endAdornment: endIcon ? (
              <InputAdornment position={endPosition}>
                <span
                  onClick={onIconClick}
                  style={{
                    cursor: "pointer",
                    "&: > p": {
                      color: "#424242",
                      fontSize: "16px",
                      fontWeight: "600",
                    },
                  }}
                >
                  {endIcon}
                </span>
              </InputAdornment>
            ) : null,
          }}
          variant="outlined"
          value={value}
          placeholder={title}
          type={type}
          name={name}
          onChange={handleChange}
          autoComplete="off"
          sx={{
            width: "100%",
            borderRadius: "16px",
            backgroundColor: backgroundColor || "transparent",
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              height: height ? height : "40px",

              "& fieldset": {
                border: backgroundColor ? "none" : "1px solid #EBEBEB",
              },
              "&:hover fieldset": {
                borderColor: "rgba(200, 200, 200, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 149, 0, 1)",
              },
              "& input": {
                color: "#000",
                backgroundColor: "transparent",
              },
              "& input::placeholder": {
                color: "#B7B7B7",
              },
              "& input:focus": {
                backgroundColor: "transparent",
              },
            },

            "& .Mui-focused.MuiAutocomplete-input": {
              color: "blue",
            },
          }}
        ></TextField>
      </Box>
    </>
  );
}

export default Input;
