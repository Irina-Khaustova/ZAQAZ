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
      // Вводим только цифру
      handleCodeChange(index, value); // Обновляем состояние в родителе

      // Переводим фокус на следующий инпут, если текущий заполнен
      if (index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Обработчик для удаления цифры и перемещения назад
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      // Если инпут уже пуст, перемещаем фокус на предыдущий инпут
      if (code[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      } else {
        // Если инпут не пуст, очищаем текущее значение
        handleCodeChange(index, ""); // Очищаем текущее поле
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
                marginBottom: "40px",
              }}
            >
              {`Чтобы подтвердить учетную запись, введите 4-значный код, отправленный на номер ${phoneNumber}`}
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
                    }} // Ограничение в 1 символ
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    inputRef={(el) => (inputsRef.current[index] = el)} // Ссылка на инпут
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                        "& fieldset": {
                          borderColor: "rgba(235, 235, 235, 1)", // Цвет границы по умолчанию
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "blue", // Цвет границы при фокусе
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
                disabled={!isFormComplete} // Кнопка активна только если все поля заполнены
                sx={{
                  height: "56px",
                  border: "1px solid rgba(246, 248, 249, 1)",
                  borderRadius: "16px",
                  marginBottom: "12px",
                }}
              >
                Подтвердить
              </Button>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "rgba(66, 66, 66, 1)",
                }}
              >
                Не получили код? Отправить снова
              </Typography>
              <Box mt={5}></Box>
            </form>
          </Container>
        </Grid>
      </Container>
    </>
  );
}

export default AuthPIN;
