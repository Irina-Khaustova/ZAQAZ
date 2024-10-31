import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { ReactComponent as MyIconArrawLeft } from "../image/arraw-left.svg";

const ButtonBack = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <IconButton
      variant="text"
      onClick={handleBack}
      sx={{ marginBottom: "16px", marginLeft: "-10px" }}
    >
      <MyIconArrawLeft width={"8px"} />
      <Typography variant="text16Light" sx={{ marginLeft: "10px" }}>
        Назад
      </Typography>
    </IconButton>
  );
};

export default ButtonBack;
