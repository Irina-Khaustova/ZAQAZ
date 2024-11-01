import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { useLogInMutation } from "../../api/Api";
import AuthorizationForm from "./components/authorizationForm/AuthorizationForm";
import img from "../../image/Variant15.png";
import { ReactComponent as MyIcon } from "../../image/zaqaz.svg";
import AuthPIN from "./components/authPIN/AuthPIN";
import AuthError from "./components/authError/AuthError";
import { useDispatch } from "react-redux";
import { putAuth } from "./AuthSlice";
import { useNavigate } from "react-router-dom";

function Authorization() {
  const [phoneValue, setPhoneValue] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isAuthPin, setIsAuthPin] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isShowPin, setIsShowPin] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]); // Состояние для 4 инпутов
  const [errorText, setErrorText] = useState("");

  const [logIn] = useLogInMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthPin(isValidPhone);
  }, [isValidPhone]);

  const dispatch = useDispatch();

  const onSigninSubmit = async (e) => {
    try {
      const userData = await logIn({
        pin: code.join(""),
        cellphone: phoneValue.replace(/[^0-9]/g, ''),
      }).unwrap();
      dispatch(putAuth(userData.key));
      navigate("/category");
    } catch (err) {
      // setErrorText(err.data);
      setIsErrorAuth(true);
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value; // Получаем текущее значение
    const numericValue = inputValue.replace(/\D/g, ''); // Убираем все нецифровые символы

    if (numericValue.length > 11) {
      return; // Ограничиваем ввод до 11 цифр
    }

    // Обновляем состояние телефона с отформатированным значением
    const formattedPhone = formatPhoneNumber(numericValue);
    setPhoneValue(formattedPhone);
    validatePhone(formattedPhone);
  };

  const formatPhoneNumber = (value) => {
    if (value.length === 0) return '';

    let formatted = '+7 ';
    if (value.length >= 1) {
      formatted += `(${value.slice(1, 4)}`; 
    }
    if (value.length >= 4) {
      formatted += `) ${value.slice(4, 7)}`; 
    }
    if (value.length >= 7) {
      formatted += ` ${value.slice(7, 9)}`; 
    }
    if (value.length >= 9) {
      formatted += ` ${value.slice(9, 11)}`; 
    }

    return formatted.trim(); 
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError(true);
      setHelperText("Пожалуйста, введите корректный номер");
      setIsValidPhone(false);
    } else {
      setPhoneError(false);
      setHelperText("");
      setIsValidPhone(true);
    }
  };

  const handleSubmit = () => {
    if (isAuthPin) {
      setIsShowPin(true);
    }
  };

  // Функция для обновления кода
  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmitTryAgane = () => {
    setIsShowPin(false);
    setIsErrorAuth(false);
    setPhoneValue("");
  };

  return (
    <>
      <Container
        disableGutters
        maxWidth="false"
        sx={{
          margin: "0",
          padding: "0",
          display: "flex",
          flexDirection: "row",
          paddingLeft: "0",
        }}
      >
        <Box
          maxWidth="false"
          sx={{ width: "72%", margin: "0", paddingLeft: "0" }}
        >
          <Box
            sx={{
              width: "1",
              height: "200px",
              margin: "0",
              paddingLeft: "0",
              border: "none",
              marginBottom: "100px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box>
              <MyIcon
                style={{
                  width: "102px",
                  height: "28px",
                  marginLeft: "108px",
                  marginBottom: "32px",
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginRight: "108px",
              }}
            >
              <Box sx={{ marginRight: "0" }}></Box>
            </Box>
          </Box>
          {!isShowPin ? (
            <AuthorizationForm
              onPhoneChange={handlePhoneChange}
              errorText={helperText}
              value={phoneValue}
              error={phoneError}
              onSubmit={handleSubmit}
              onValid={isValidPhone}
            ></AuthorizationForm>
          ) : !isErrorAuth ? (
            <AuthPIN
              handleSubmit={onSigninSubmit}
              phoneNumber={phoneValue}
              code={code}
              handleCodeChange={handleCodeChange}
            ></AuthPIN>
          ) : null}
          {isErrorAuth ? (
            <AuthError
              error={errorText}
              onSubmit={handleSubmitTryAgane}
            ></AuthError>
          ) : null}
        </Box>

        <Box
          sx={{
            height: "100vh",
            width: "30%",
            margin: "0",
            paddingLeft: "0",
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>
      </Container>
    </>
  );
}

export default Authorization;
