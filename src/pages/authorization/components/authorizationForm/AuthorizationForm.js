import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { ReactComponent as MyIconPhoneGray } from "../../../../image/phoneGray.svg";

function AuthorizationForm({
  onPhoneChange,
  value,
  error,
  onSubmit,
  errorText,
  onValid,
}) {
  useEffect(() => {}, [onValid]);
  const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

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
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Box}
          elevation={6}
          maxWidth="442px"
        >
          <Container
            disableGutters
            maxWidth="30.5%"
            sx={{ paddingLeft: "0", height: "60%" }}
          >
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
              Добавить номер
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "20px",
                marginBottom: "40px",
              }}
            >
              Мы должны подтвердить его, отправив сообщение
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: "16px", fontWeight: "600", lineHeight: "20px" }}
            >
              Номер телефона
            </Typography>
            <form
              onSubmit={(e) => e.preventDefault}
              noValidate
              sx={{ width: "30%" }}
            >
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MyIconPhoneGray />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="tel"
                error={error}
                name="phone"
                autoFocus
                helperText={errorText}
                value={value}
                type="tel"
                onChange={onPhoneChange}
                inputProps={{ style: inputStyle }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                    backgroundColor: "transparent",
                    "& fieldset": {
                      borderColor: error ? "red" : "rgba(235, 235, 235, 1)",
                      backgroundColor: "wite",
                    },
                    "&:hover fieldset": {
                      borderColor: error ? "red" : "rgba(255, 149, 0, 1)",
                      backgroundColor: "wite",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: error ? "red" : "rgba(255, 149, 0, 1)",
                      backgroundColor: "wite",
                    },
                    "&:-webkit-autofill": {
                      WebkitBoxShadow:
                        "0 0 0 1000px rgba(255, 255, 255, 0) inset",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  },
                  marginTop: "8px",
                  marginBottom: "32px",
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disableElevation
                onClick={onSubmit}
                disabled={!onValid || value === ""}
                sx={{
                  height: "56px",
                  border: "1px solid rgba(246, 248, 249, 1)",
                  borderRadius: "16px",
                  marginBottom: "40px",
                }}
              >
                Войти
              </Button>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "rgba(66, 66, 66, 1)",
                }}
              >
                *Продолжая, вы подтверждаете, что являетесь владельцем или
                основным пользователем этого номера мобильного телефона. Вы
                соглашаетесь получать автоматические текстовые сообщения для
                подтверждения вашего номера телефона.
              </Typography>
            </form>
          </Container>
        </Grid>
      </Container>
    </>
  );
}

export default AuthorizationForm;
