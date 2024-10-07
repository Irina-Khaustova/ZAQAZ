import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { useLogInMutation, logIn } from "../../api/Api";
import AuthorizationForm from "./components/authorizationForm/AuthorizationForm";
import img from "../../image/Variant15.png";
import { ReactComponent as MyIcon } from "../../image/zaqaz.svg"; // Импорт SV
import AuthPIN from "./components/authPIN/AuthPIN";
import AuthError from "./components/authError/AuthError";

function Authorization() {
  const [phoneValue, setPhoneValue] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isAuthPin, setIsAuthPin] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isShowPin, setIsShowPin] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedItem, setSelectedItem] = useState("Русский");
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]); // Состояние для 4 инпутов
  const [errorText, setErrorText] = useState("");

  // const open = Boolean(anchorEl);

  const [logIn, result] = useLogInMutation();

  useEffect(() => {
    setIsAuthPin(isValidPhone);
  }, [isValidPhone]);

  const onSigninSubmit = async (e) => {
    console.log("отправка запроса");
    try {
      const userData = await logIn({
        pin: code.join(""),
        cellphone: phoneValue,
      }).unwrap();

      // Можно здесь сохранить токен или выполнить перенаправление
    } catch (err) {
      
      setErrorText(err.data.errorDesc);
      setIsErrorAuth(true);
    }
  };

  const handlePhoneChange = (event) => {
    setPhoneValue(event.target.value);
    validatePhone(event.target.value);
  };

  const validatePhone = (value) => {
    const phoneRegex = /^([0-9]{11})?$/;
    if (!phoneRegex.test(value)) {
      console.log("not valid");
      setPhoneError(true);
      setHelperText("Пожалуйста введите корректный номер");
      setIsValidPhone(false);
    } else {
      console.log("valid");
      setPhoneError(false);
      setHelperText("");
      setIsValidPhone(true);
      console.log(isValidPhone);
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
          sx={{ width: "0.7", margin: "0", paddingLeft: "0" }}
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
                style={{ width: "102px", height: "28px", marginLeft: "108px" }}
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
              <Box sx={{ marginRight: "0" }}>
                {/* Кнопка для открытия меню
                <Button
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  variant="contained"
                >
                  {selectedItem}
                </Button> */}

                {/* Выпадающее меню */}
                {/* <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => handleClose()}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleClose("Русский")}>
                    Русский
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("Английский")}>
                    Английский
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("Казахский")}>
                    Казахский
                  </MenuItem>
                </Menu> */}
              </Box>
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
            width: "0.3",
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
