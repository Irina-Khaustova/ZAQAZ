import * as React from "react";
import {
  Button,
  Typography,
  Box,
  Modal,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ReactComponent as MyIcon } from "../image/iconamoon_cloud-error-light.svg";
import { ReactComponent as MyIconExit } from "../image/icon-exit.svg";
import { ReactComponent as MyIconLoad } from "../image/loader.svg";

const RequestProgressModal = ({
  open,
  close,
  handleClickButton,
  error,
  isLoading,
  isSuccess,
}) => {
  // const onhandleClick = (e) => {
  //   e.preventDefault();
  //   close();
  // };

  console.log();

  return (
    <Modal open={open} onClose={close} >
      <Box
        sx={{
          position: "relative",
          width: "732px",
          height: "725px",
          backgroundColor: "white",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: "5%",
          outline: "none",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", width: "440px", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          
        </Box>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <React.Fragment>
              <svg width={0} height={0}>
                <defs>
                  <linearGradient
                    id="my_gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFB703" />
                    <stop offset="100%" stopColor="#D26D21" />
                  </linearGradient>
                </defs>
              </svg>
              <CircularProgress
                size="4rem"
                thickness={1}
                sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
              />
            </React.Fragment>
          </Box>
        ) : error ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <MyIcon style={{ width: "120px", height: "120px" }} />

            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "Nunito Sans",
                lineHeight: "36px",
                marginBottom: "10px",
              }}
            >
              Ошибка!
            </Typography>

            <Typography
              component="h1"
              variant="body1"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                fontFamily: "Nunito Sans",
                lineHeight: "20px",
                marginBottom: "40px",
              }}
            >
              {error
                ? "Сервевр временно не доступен, поробуйте отправить запрос позже."
                : null}
            </Typography>
            <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handleClickButton}
          sx={{
            height: "56px",
            border: "1px solid rgba(246, 248, 249, 1)",
            borderRadius: "16px",
            marginBottom: "12px",
          }}
        >
          Повторить попытку
        </Button>
          </Box>
        ) : isSuccess ? (
          <Typography variant="h6"><MyIconLoad></MyIconLoad></Typography>
        ) : (
          <Typography>Unknown State</Typography>
        )}
        <IconButton
          onClick={close}
          sx={{
            position: "absolute",
            top: "-5px",
            right: "-50px",
            zIndex: 10,
            borderRadius: "50%",
          }}
        >
          <MyIconExit />
        </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default RequestProgressModal;
