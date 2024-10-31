import React from "react";
import { Button } from "@mui/material";

function CustomButton({ onSubmit, disabled, size, text, height }) {
  console.log(disabled.disabled);

  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disableElevation
        onClick={onSubmit}
        disabled={disabled.disabled}
        sx={{
          height: height || "56px",
          border: "1px solid rgba(246, 248, 249, 1)",
          borderRadius: "16px",
          width: size || "100%",
        }}
      >
        {text}
      </Button>
    </>
  );
}

export default CustomButton;
