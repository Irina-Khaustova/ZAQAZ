import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { ReactComponent as MyIconCamera } from "../../../image/icon-camera.svg";
import { ReactComponent as MyIconExit } from "../../../image/icon-exit.svg";
import { usePostCategoryMutation } from "../../../api/Api";
import RequestProgressModal from "../../../components/RequestProgressModal";

const ModalAdd = ({ open, close, modalCategory, refetch }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    nameEn: ""
  });
  const [errorText, setErrorText] = useState("");
  const [postCategory,{ error: postCategoryError, isLoading: isLoadingError, isSuccess: isSuccessPostCategory }] = usePostCategoryMutation();
  const { category } = useSelector((state) => state.category);
  const [imageSelect, setImageSelect] = useState(null);
  const [error, setError] = useState(false);
  const [isOpenRequestProgressModal, setisOpenRequestProgressModal] = useState(false);

  const maxSizeMb = 60 * 1024 * 1024;
  const maxWidth = 2000;
  const maxHeight = 2000;

  useEffect(() => {
    if (open) {
      setError(false);
      setErrorText("");
      setInputValue("");
    }
  }, [open]);

  const onSigninSubmitCategory = async () => {
    setisOpenRequestProgressModal(true);
    close()
    try {
      await postCategory({
        parentCategory: null,
        name: inputValue.name,
        nameEn: inputValue.nameEn,
        store: {
          id: 26,
        },
        extId: "f9043c07-e394-4b50-a256-aadbf1ce6573",
        color: "b9f6ca",
      }).unwrap();
      refetch();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  const onSigninSubmitSubCategory = async () => {
    try {
      await postCategory({
        parentCategory: { id: category?.id },
        name: inputValue.name,
        nameEn: inputValue.nameEn,
        store: {
          id: 26,
        },
        extId: "f9043c07-e394-4b50-a256-aadbf1ce6573",
        color: "b9f6ca",
      }).unwrap();
      refetch();
      close();
    } catch (err) {
      console.log(err);
      alert(err.data);
    }
  };

  const onhandleClick = (e) => {
    e.preventDefault();
    setError(false);
    setErrorText("");
    if (inputValue === "") {
      setErrorText("Введите название!");
      setError(true);
    } else {
      if (modalCategory === "Создание категории") {
        onSigninSubmitCategory();
      } else {
        onSigninSubmitSubCategory();
      }
    }
  };

  const onHandleAddPhoto = (e) => {
    console.log(imageSelect);
    console.log(111, e.target.files[0], e.currentTarget, 111);
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSizeMb) {
      // setErrorText("Файл должен быть не больше 60 МБ");
      
      alert("Файл должен быть не больше 60 МБ");
      setImageSelect(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      if (image.width !== maxWidth || image.height !== maxHeight) {
        // setErrorText("Размер изображения должен быть 2х2");
        alert("Размер изображения должен быть 2х2");
        setImageSelect(null);
      } else {
        setErrorText("");
        setImageSelect(image.src);
        alert("good");
      }
    };
    console.log()
  }

  console.log(imageSelect);

  const handleInputChange = (e) => {
    setError(false);
    setErrorText("");
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleExitModalRequest = () => {
    setisOpenRequestProgressModal(false)
    close()
  }

  const handleClickButtonRepeat = () => {

  }


  return (
    <>
    { !isOpenRequestProgressModal && <Dialog
      open={open}
      onClose={close}
      maxWidth={false}
      fullWidth={true}
      aria-labelledby="form-dialog-title"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          width: "732px",
          height: "650px",
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          paddingTop: "13px",
          position: "relative",
          overflow: "visible",
        },
      }}
    >
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
      <DialogTitle
        id="form-dialog-title"
        position="relative"
        sx={{
          padding: "24px",
          marginBottom: "11px",
        }}
      >
        <Typography variant="text24Medium">{modalCategory}</Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          width: "440px",
          height: "250px",
          padding: "0",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "0px",
          }}
        >
          <Box sx={{ marginTop: "0px", position: "relative" }}>
            {imageSelect ? (
              <img
                src={imageSelect}
                alt="Uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                component="label"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <MyIconCamera sx={{ width: "96px", height: "96px" }} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onHandleAddPhoto}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    zIndex: -1,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              marginLeft: "35px",
              display: "flex",
              flexDirection: "column",
              marginTop: "14px",
            }}
          >
            <Typography variant="text18Bold">Фото и описание</Typography>
            <Typography
              variant="text16Light"
              sx={{ marginTop: "5px", lineHeight: "22px", marginBottom: "7px" }}
            >
              Не должно превышать <strong>60 мб</strong>, размер
              <strong> 2х2</strong>
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disableElevation
              onClick={onhandleClick}
              sx={{
                height: "40px",
                border: "1px solid rgba(246, 248, 249, 1)",
                borderRadius: "16px",
                width: "125px",
                textTransform: "none",
              }}
            >
              <Typography variant="text16Bold">Заменить</Typography>
            </Button>
          </Box>
        </Box>
        <Typography sx={{ marginTop: "15px" }}>Название на рус</Typography>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          type="text"
          error={error}
          helperText={errorText}
          fullWidth
          value={inputValue.name}
          onChange={handleInputChange}
          autoComplete="off"
          sx={{
            borderRadius: "16px",

            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",

              "& fieldset": {
                border: "1px solid #EBEBEB",
                backgroundColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "rgba(200, 200, 200, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 149, 0, 1)",
              },
              "& input": {
                color: "#424242",
                backgroundColor: "transparent",
              },
              "& input::placeholder": {
                color: "#B7B7B7",
              },
              "& input:focus": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
         <Typography sx={{ marginTop: "15px" }}>Название на анг</Typography>
        <TextField
          autoFocus
          margin="dense"
          name="nameEn"
          type="text"
          error={error}
          helperText={errorText}
          fullWidth
          value={inputValue.nameEn}
          onChange={handleInputChange}
          autoComplete="off"
          sx={{
            borderRadius: "16px",

            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",

              "& fieldset": {
                border: "1px solid #EBEBEB",
                backgroundColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "rgba(200, 200, 200, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 149, 0, 1)",
              },
              "& input": {
                color: "#424242",
                backgroundColor: "transparent",
              },
              "& input::placeholder": {
                color: "#B7B7B7",
              },
              "& input:focus": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          margin: "0",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          width: "440px",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          boxshadow="none"
          onClick={onhandleClick}
          sx={{
            height: "56px",
            border: "1px solid rgba(246, 248, 249, 1)",
            borderRadius: "16px",
            marginLeft: "0 !important",
            margingTop: "0 !important",
            textTransform: "none",
            boxShadow: "none",
            marginBottom: "37px",
            "&:hover": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&:focus": {
              boxShadow: "none",
            },
          }}
        >
          <Typography variant="text16Bold">Сохранить</Typography>
        </Button>
      </DialogActions>
    </Dialog>}
    <RequestProgressModal
    handleClickButton={handleClickButtonRepeat}
    open={isOpenRequestProgressModal}
    close={handleExitModalRequest}
    error={postCategoryError? postCategoryError: false}
    isLoading={isLoadingError}
    isSuccess={isSuccessPostCategory && !isLoadingError}
  ></RequestProgressModal>
  </>
  );
};

export default ModalAdd;
