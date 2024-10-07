import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { ReactComponent as MyIcon } from "../../../../image/iconamoon_cloud-error-light.svg"; // Импорт SVG

function AuthError({ error, onSubmit }) {
  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          width: "100%",
          margin: "0",
          paddingLeft: "0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "442px" }}>
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
            variant="h5"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: "Nunito Sans",
              lineHeight: "20px",
              marginBottom: "40px",
            }}
          >
            {error}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disableElevation
            onClick={onSubmit}
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
      </Container>
    </>
  );
}

export default AuthError;
