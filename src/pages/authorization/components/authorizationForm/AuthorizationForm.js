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
            maxWidth="30%"
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px", // Закругленные углы
                    "& fieldset": {
                      borderColor: error ? "red" : "rgba(235, 235, 235, 1)", // Цвет границы с учетом ошибки
                    },
                    "&:hover fieldset": {
                      borderColor: error ? "red" : "rgba(255, 149, 0, 1)", // Цвет при наведении
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: error ? "red" : "rgba(255, 149, 0, 1)", // Цвет при фокусе
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
                disabled={!onValid || value === ""} // Кнопка активна только если все поля заполнены
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
