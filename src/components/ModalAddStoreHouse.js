import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ReactComponent as MyIconExit } from "../image/icon-exit.svg";
import {
  useGetStoreHouseQuery,
  usePostStoreHouseMutation,
  usePutStoreHouseMutation,
  useDeleteStoreHouseMutation,
} from "../api/Api";
import RequestProgressModal from "../components/RequestProgressModal";
import CustomTextField from "./CustomTextField";
import { DatasetRounded } from "@mui/icons-material";
import ModalDelete from "./ModalDelete";
import { useLazyGetStoreHouseQuery } from "../api/Api";

const ModalAddStoreHouse = ({
  open,
  close,
  modalCategory,
  refetch,
  type,
  id,
  dataDrawItem,
}) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    baseUrl: "",
    city: "",
  });
  const [itemId, setItemId] = useState('');
  const [storeId, setStoreId] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [
    postStoreHouse,
    {
      error: postError,
      isLoading: isLoadingPostError,
      isSuccess: isSuccessPost,
    },
  ] = usePostStoreHouseMutation();

  const [
    putStoreHouse,
    { error: putError, isLoading: isLoadingPutError, isSuccess: isSuccessPut },
  ] = usePutStoreHouseMutation();

  const [
    deleteStoreHouse,
    { error: errorDelete, isLoading: isLoadingDeleteError, isSuccess: isSuccessDelete },
  ] = useDeleteStoreHouseMutation(); 

  const [error, setError] = useState(false);
  const [isOpenRequestProgressModal1, setisOpenRequestProgressModal1] =
    useState(false);
    const [isOpenRequestProgressModal, setisOpenRequestProgressModal] =
    useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
 
  const [flag, setFlag] = useState(false);

  const handleFetch = () => {
    if (storeId) {
      triggerGetStoreHouse(storeId);
    }
  }

  const [triggerGetStoreHouse, { data, isLoadingGet, errorGet }] = useLazyGetStoreHouseQuery();

  

  useEffect(() => {
    if (open && id && type === "edit") {
      triggerGetStoreHouse(id); // Используйте переданный ID напрямую
    }
  }, [open, id, type]);

  useEffect(() => {
    setStoreId(data?.id)
    console.log(888, data);
    if (open && type === "edit") {
      setError(false);
      setItemId(data?.id)
      setErrorText("");
      setInputValue((prev) => ({
        name: data?.title || "",
        description: data?.description || "",
        baseUrl: data?.baseUrl || "",
        city: data?.city || "",
      }));
    } else if (open && type === "add") {
      setInputValue((prev) => ({
        name: "",
        description: "",
        baseUrl: "",
        city: "",
      }));
    }
    console.log("Значения инпутов", inputValue);
  }, [open, data, type]);

  const onPostStoreHouse = async () => {
    setisOpenRequestProgressModal(true);
    close();
    try {
      await postStoreHouse({
        title: inputValue.name,
        description: inputValue.description,
        color: "",
        baseUrl: inputValue.baseUrl,
        city: inputValue.city,
      }).unwrap();
      refetch();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  const onPutStoreHouse = async () => {
    setisOpenRequestProgressModal(true);
    close();
    try {
      await putStoreHouse({
        id: Number(data.id),
        title: inputValue.name,
        description: inputValue.description,
        color: "",
        baseUrl: inputValue.baseUrl,
        city: inputValue.city,
      }).unwrap();
      refetch();
      setInputValue({
        name: "",
        description: "",
        baseUrl: "",
        city: "",
      });
      close();
    } catch (err) {
      console.log(err);
    }
  };

  const onhandleClickAdd = (e) => {
    e.preventDefault();
    setError(false);
    setErrorText("");
    if (inputValue === "") {
      setErrorText("Введите название!");
      setError(true);
    } else {
      onPostStoreHouse();
    }
  };

  const onhandleClickEdit = (e) => {
    e.preventDefault();
    setError(false);
    setErrorText("");
    if (inputValue === "") {
      setErrorText("Введите название!");
      setError(true);
    } else {
      onPutStoreHouse();
    }
  };

  const handleInputChange = (e) => {
    setError(false);
    setErrorText("");
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExitModalRequest = () => {
    setisOpenRequestProgressModal(false);
    close();
  };

  const onHandleClickDelete = () => {
    setIsOpenModalDelete(true);
    console.log(123456789)
  };

  const handleClickButtonRepeat = () => {};

  const closeModalDelete = () => {
    setIsOpenModalDelete(false)
  }

  const onHandleDelete = async () => {
    console.log('удаление')
    try {
      await deleteStoreHouse(storeId).unwrap(); // Вызываем мутацию удаления
      console.log('success')
      setIsOpenModalDelete(false); // Закрываем модальное окно подтверждения
      close();
      refetch(); // Обновляем данные после удаления
      setIsOpenModalDelete(false); // Закрываем модальное окно подтверждения
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      // Здесь можно добавить обработку ошибки, например, уведомление пользователя
    }
  };

  return (
    <>
      {!isOpenRequestProgressModal && (
         <Dialog
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
              minHeight: "650px",
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
            <Typography variant="text24Medium">Склад</Typography>
          </DialogTitle>

          <DialogContent
            sx={{
              width: "440px",
              // minHeight: "250px",
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
            ></Box>
            <Typography sx={{ marginTop: "15px" }}>Название</Typography>
            <CustomTextField
              margin="dense"
              name="name"
              type="text"
              error={error.parentCategory}
              helperText={errorText.parentCategory}
              value={inputValue.name || ""}
              onChange={handleInputChange}
            />
            <Typography sx={{ marginTop: "15px" }}>Описание</Typography>
            <CustomTextField
              margin="dense"
              name="description"
              type="text"
              value={inputValue.description || ""}
              multiline={true}
              minRows={4}
              onChange={handleInputChange}
              sx={{
                minHeight: "128px",
                "& .MuiOutlinedInput-root": {
                  minHeight: "128px",
                },
              }}
            />
            <Typography sx={{ marginTop: "15px" }}>baseUrl</Typography>
            <CustomTextField
              margin="dense"
              name="baseUrl"
              type="text"
              error={error.parentCategory}
              helperText={errorText.parentCategory}
              value={inputValue.baseUrl || ""}
              onChange={handleInputChange}
            />
            <Typography sx={{ marginTop: "15px" }}>Город</Typography>
            <CustomTextField
              margin="dense"
              name="city"
              type="text"
              error={error.parentCategory}
              helperText={errorText.parentCategory}
              value={inputValue.city || ""}
              onChange={handleInputChange}
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
              onClick={type === "add" ? onhandleClickAdd : onhandleClickEdit}
              sx={{
                height: "56px",
                border: "1px solid rgba(246, 248, 249, 1)",
                borderRadius: "16px",
                marginLeft: "0 !important",
                margingTop: "0 !important",
                textTransform: "none",
                boxShadow: "none",
                marginTop: "37px",
                marginBottom: type === "edit" ? "10px" : "40px",
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
              <Typography variant="text16Bold">
                {type === "add" ? "Сохранить" : "Редактировать"}
              </Typography>
            </Button>
            {type === "edit" && (
              <Button
                type="button"
                fullWidth
                variant="contained"
                boxshadow="none"
                onClick={onHandleClickDelete}
                sx={{
                  height: "56px",
                  borderRadius: "16px",
                  marginLeft: "0 !important",
                  margingTop: "0 !important",
                  textTransform: "none",
                  boxShadow: "none",
                  color: "black",
                  backgroundColor: "rgba(246, 248, 249, 1)",
                  border: "1px solid rgba(33, 33, 33, 0.2)",
                  "&.Mui-disabled": {
                    backgroundColor: "#F6F8F9",
                    color: "gray",
                  },

                  "&.hover": {
                    backgroundColor: "gray",
                    color: "gray",
                  },
                }}
              >
                <Typography variant="text16Bold">Удалить</Typography>
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    
      <RequestProgressModal
        handleClickButton={handleClickButtonRepeat}
        open={isOpenRequestProgressModal}
        close={handleExitModalRequest}
        error={postError ? postError : putError ? putError : null}
        isLoading={isLoadingPostError ? isLoadingPostError : isLoadingPutError}
        isSuccess={
          (isSuccessPost && !isLoadingPostError) ||
          (isSuccessPut && !isLoadingPutError)
        }
      ></RequestProgressModal>
      
        {isOpenModalDelete && <ModalDelete
              open={isOpenModalDelete}
              close={closeModalDelete}
              onhandleClickDelete={onHandleDelete}
              name="склад"
            ></ModalDelete>}
    </>
  );
};

export default ModalAddStoreHouse;
