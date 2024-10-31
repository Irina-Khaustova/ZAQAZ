import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useRef } from "react";

function AuthPIN({ code, handleCodeChange, phoneNumber, handleSubmit }) {
  const inputsRef = useRef([]); // Ссылка на инпуты для управления фокусом

  // Обработчик изменения значения инпута
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      handleCodeChange(index, value);
      // Переводим фокус на следующий инпут, если текущий заполнен
      if (index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Обработчик для удаления цифры и перемещения назад
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      } else {
        handleCodeChange(index, "");
      }
    }
  };

  // Проверяем, все ли поля заполнены
  const isFormComplete = code.every((digit) => digit !== "");

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
              Подтверждение номера
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "20px",
                marginBottom: "33px",
              }}
            >
              {`Чтобы подтвердить учетную запись, введите 4-значный код, отправленный на номер + ${phoneNumber}`}
            </Typography>

            <form
              noValidate
              sx={{ width: "30%" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {code.map((digit, index) => (
                  <TextField
                    key={index}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                        "& fieldset": {
                          borderColor: "rgba(235, 235, 235, 1)",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 149, 0, 1)",
                        },
                      },
                      marginTop: "8px",
                      marginBottom: "32px",
                      width: "104px",
                    }}
                  />
                ))}
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handleSubmit}
                disabled={!isFormComplete}
                sx={{
                  height: "56px",
                  border: "1px solid rgba(246, 248, 249, 1)",
                  borderRadius: "16px",
                  marginBottom: "12px",
                }}
              >
                Подтвердить
              </Button>
              <Box
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "rgba(66, 66, 66, 1)",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="text15Bold"
                  sx={{ marginRight: "5px", color: "#B7B7B7" }}
                >
                  {" "}
                  Не получили код?{" "}
                </Typography>{" "}
                <Typography variant="text15Medium" sx={{ color: "#FF9500" }}>
                  Отправить снова
                </Typography>
              </Box>
              <Box mt={5}></Box>
            </form>
          </Container>
        </Grid>
      </Container>
    </>
  );
}

export default AuthPIN;
