import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ReactComponent as MyIconArrowOrange } from "../../../image/arrow-right-orange.svg";
import { ReactComponent as MyIconButtonEdit } from "../../../image/edit.svg";


function ProductItem({
  id,
  images,
  categoryName,
  isOpenModal,
  quantity,
  title,
  onClick,
}) {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: "414px",
        backgroundColor: "white",
        flex: "0 0 calc(25% - 15px)", 
        marginBottom: "20px",
        marginRight: "20px",
        // Убираем правый отступ у каждого 4-го элемента
        "&:nth-of-type(4n)": {
          marginRight: 0,
        },
        padding: "24px 22px 18px 22px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          height: "123px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",

          position: "relative",
          marginBottom: "25px",
        }}
      >
        <Box sx={{ height: "99px", width: "40px" }}>картинка</Box>
        <Button
          id={id}
          variant="outlined"
          onClick={() => {
            console.log("Button clicked");
            if (isOpenModal) isOpenModal();
          }}
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

        {/* <ModalEdit
          open={isModalEdit}
          close={onModalToggle}
          name="edit"
          value={categoryName}
        ></ModalEdit> */}
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
            flexGrow: "1",
            width: "100%",
            marginBottom: "10px",
            borderBottom: "1px solid #0000001A",
            paddingBottom: "10px",
          }}
        >
          <Typography
            variant="text18Bold"
            sx={{
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="text16Light"
            color="#646261"
            sx={{ marginBottom: "7px", display: "block" }}
          >
            Категория {categoryName}
          </Typography>
          <Typography
            sx={{ display: "block" }}
            variant="text16Light"
            color="#646261"
          >
            {quantity} шт
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "0" }}>
        <Button
          id={id}
          onClick={onClick}
          sx={{
            backgroundColor: "transparent",
            textTransform: "none",
            color: "#F2994A",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "inherit",
              boxShadow: "none",
            },
            border: "none",
            padding: "0",
            marginTop: "10px",
          }}
        >
          <Typography sx={{ marginRight: "15px" }}>Перейти </Typography>
          <MyIconArrowOrange />
        </Button>
      </Box>
    </Box>
  );
}

export default ProductItem;
