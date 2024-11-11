import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ReactComponent as MyIconArrowOrange } from "../../../image/arrow-right-orange.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MyIconButtonEdit } from "../../../image/edit.svg";

function CategoryItem({
  id,
  image,
  categoryName,
  subcategory,
  onModalToggle,
  isModalAdd,
  isModalEdit,
  putCategory,
  categoryType
}) {
  const navigate = useNavigate();

  const handleGoSubcategory = (e) => {
    if(categoryType === "Category") {
    putCategory();
    navigate(`/subcategory/${id}`);
    }
  };

  const handlePutCategory = () => {
    if(categoryType === "Category") {
    putCategory(id);
    }
    onModalToggle();
  };

  return (
    <Box
      sx={{
        height: "414px",
        backgroundColor: "white",
        flex: "0 0 calc(25% - 15px)",
        marginBottom: "20px",
        marginRight: "20px",
        "&:nth-of-type(4n)": {
          marginRight: 0,
        },
        padding: "24px 22px 24px 22px",
        boxSizing: "border-box",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          height: "116px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",

          position: "relative",
          marginBottom: "25px",
        }}
      >
        <Box sx={{ height: "99px", width: "40px" }}>Картинка</Box>
        <Button
          id={id}
          variant="outlined"
          onClick={handlePutCategory}
          sx={{
            position: "absolute",
            minWidth: "0",
            right: "0",
            width: "16px",
            height: "16px",
            boxSizing: "border-box",
            padding: "0",
          }}
        >
          <MyIconButtonEdit width={"16px"} />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          justifyContent: "space-between",

          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            height: "37px",
            width: "100%",
            marginBottom: "10px",
            borderBottom: "1px solid #0000001A",
            paddingBottom: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <Typography variant="text18Bold">{categoryName}</Typography>
        </Box>
        {subcategory &&
          subcategory.length > 0 &&
          subcategory.map((el, index) => (
            <Typography
              key={index}
              variant="text16Light"
              sx={{ lineHeight: "24px", color: "#646261" }}
            >
              {el.name}
            </Typography>
          ))}
      </Box>
      <Box>
        <Button
          id={id}
          onClick={handleGoSubcategory}
          sx={{
            backgroundColor: "transparent",
            textTransform: "none",
            color: "#F2994A",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
             
              boxShadow: "none",
            },
            border: "none",
            padding: "0",
            marginTop: "10px",
          }}
        >
          <Typography sx={{ marginRight: "10px" }}>Перейти </Typography>
          <MyIconArrowOrange />
        </Button>
      </Box>
    </Box>
  );
}

export default CategoryItem;
