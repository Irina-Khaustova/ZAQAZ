import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SideBar from "../../components/SideBar";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";

function OrdersList({
  onPhoneChange,
  value,
  error,
  onSubmit,
  errorText,
  onValid,
}) {
  const handleChange = () => {};

  return (
    <>
      <Container
        disableGutters
        maxWidth="1920"
        sx={{
          margin: "0",
          paddingLeft: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingRight: "0",
          height: "100vh",
        }}
      >
        <SideBar></SideBar>
        <Box sx={{ flexGrow: "1" }}>
          <Box
            sx={{
              backgroundColor: "rgba(246, 248, 249, 1)",
              padding: "40px",
              height: "100%",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                padding: "24px",
                borderBottom: "1 px solid rgba(246, 248, 249, 1)",
              }}
            >
              <Typography
                sx={{ fontSize: "24px", fontWeight: "700", lineHeight: "32px" }}
              >
                Заказы
              </Typography>
              <Box sx={{}}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MyIconSearch />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="searchOrder"
                name="searchOrder"
                autoFocus
                value={value}
                type="text"
                placeholder="Название поставщика/номер заказа"
                onChange={handleChange}
                sx={{
                  borderRadius: "16px",
                  backgroundColor: "rgba(246, 248, 249, 1)",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    height: "40px",
                    "& fieldset": {
                      border: "1px solid rgba(246, 248, 249, 1)", // Установка цвета границы через fieldset
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(200, 200, 200, 1)", // Цвет границы при наведении
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255, 149, 0, 1)", // Цвет границы при фокусе
                    },
                  },
                }}
              ></TextField>
              </Box>
              <Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "700",
                      lineHeight: "32px",
                    }}
                  >
                    Стоимость
                  </Typography>
                </Box>
                <Box></Box>
                <Box></Box>
              </Box>
            </Box>

            <Box></Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default OrdersList;
