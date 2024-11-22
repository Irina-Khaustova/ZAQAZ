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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

import { ReactComponent as MyIconExit } from "../image/icon-exit.svg";
import { usePostProductMutation } from "../api/Api";
import ModalAddStoreHouse from "./ModalAddStoreHouse";
import { useGetStoreHousesQuery } from "../api/Api";

const ModalChoiceStoreHouse = ({ open, close, refetch }) => {
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenAddStoreHouseModal, setisOpenAddStoreHouseModal] =
    useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [storeHouse, setStoreHouse] = useState("");

  const [postStireHouse, { error, isLoading, isSuccess }] =
    usePostProductMutation();

  // const data = [
  //   { value: "Казпочта", description: "г. Алматы - Описание склада" },
  //   { value: "Казпочта", description: "г. Алматы - Описание склада" },
  //   { value: "Казпочта", description: "г. Алматы - Описание склада" },
  // ];

  const { data } = useGetStoreHousesQuery();

  const postStoreHouse = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      setisOpenAddStoreHouseModal(true);
      close();
      await postStoreHouse(storeHouse).unwrap();
      alert("Успешно");
    } catch (err) {
      console.log(err);
      alert(err.data);
    } finally {
      setIsSubmitting(false);
      refetch();
      close();
    }
  };

  const onhandleClickAdd = (e) => {
    e.preventDefault();
    if (!Object.values(error).some((value) => value !== false)) {
      postStoreHouse(e.target.value);
    }
  };

  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
    console.log("Выбрано значение:", event.target);
  };

  const onhandleClickChoice = () => {};

  const handleExitModalRequest = () => {
    setisOpenAddStoreHouseModal(false);
    close();
  };

  useEffect(() => {
    if (open) {
    }
  }, [open]);

  return (
    <>
      {!isOpenAddStoreHouseModal && (
        <Dialog
          open={open}
          onClose={() => {}}
          maxWidth={false}
          fullWidth={true}
          scroll="body"
          aria-labelledby="form-dialog-title"
          PaperProps={{
            sx: {
              width: "732px",
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              boxShadow: "none",
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              overflow: "hidden",
            },
          }}
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем всплытие события, чтобы предотвратить закрытие
          }}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            },
            onClick: (e) => e.stopPropagation(),
          }}
          sx={{
            "& .MuiDialog-paper": {
              width: "732px", // Ширина окна
              borderRadius: "16px", // Скругленные углы
              backgroundColor: "#FFFFFF", // Прозрачный белый фон
              boxShadow: "none", // Убрать тени
              display: "flex",
              flexDirection: "column",
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
              top: "-5px", // Сдвиг вверх за пределы окна
              right: "-50px", // Сдвиг вправо за пределы окна
              zIndex: 10, // Положительное значение, чтобы иконка была выше модального окна
              borderRadius: "50%",
            }}
          >
            <MyIconExit />
          </IconButton>
          <DialogTitle
            id="form-dialog-title"
            sx={{
              padding: "24px", // Отступы внутри заголовка
              marginBottom: "11px",
            }}
          >
            <Typography variant="text24Medium">Склады</Typography>
          </DialogTitle>

          <DialogContent
            sx={{
              width: "440px",
              padding: "0",
              boxSizing: "border-box",
            }}
          >
            <FormControl
              sx={{ width: "100%", minHeight: "42px", marginBottom: "48px" }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={selectedValue} // Привязываем к состоянию
                onChange={handleChange} // Обрабатываем изменение
              >
                {data
                  ? data.content.map((el, index) => (
                      <FormControlLabel
                        key={`${el.value}-${index}`}
                        value={el.value}
                        label={el.title}
                        control={
                          <Radio
                            sx={{
                              color:
                                selectedValue === el.value
                                  ? "orange"
                                  : "rgba(0, 0, 0, 0.54)",
                              "&.Mui-checked": {
                                color: "#1E90FF",
                              },
                            }}
                          />
                        }
                        sx={{
                          borderBottom: "1px solid rgba(246, 248, 249, 1)",
                          width: "100%",
                        }}
                      />
                    ))
                  : null}
                {
                  // <FormControl>
                  //   <FormLabel>Gender</FormLabel>
                  //   <RadioGroup
                  //     defaultValue="female"
                  //     name="controlled-radio-buttons-group"
                  //     value={selectedValue}
                  //     onChange={handleChange}
                  //     sx={{ my: 1 }}
                  //   >
                  //     {data? data.content?.map((el, index) => <Radio key={`${el.value}-${index}`} value="female" label={el.title} />
                  //     ) : null }
                  //   </RadioGroup>
                  // </FormControl>
                }
              </RadioGroup>
            </FormControl>
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
              backgroundColor="rgba(246, 248, 249, 1)"
              boxshadow="none"
              onClick={onhandleClickAdd}
              sx={{
                height: "56px",
                border: "1px solid rgba(246, 248, 249, 1)",
                borderRadius: "16px",
                marginLeft: "0 !important",
                marginTop: "0 !important",
                textTransform: "none",
                boxShadow: "none",
                marginBottom: "8px",
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
              <Typography variant="text16Bold">+ Новый склад</Typography>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              boxshadow="none"
              onClick={onhandleClickChoice}
              sx={{
                height: "56px",
                border: "1px solid rgba(246, 248, 249, 1)",
                borderRadius: "16px",
                marginLeft: "0 !important",
                marginTop: "0 !important",
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
        </Dialog>
      )}
      <ModalAddStoreHouse
        open={isOpenAddStoreHouseModal}
        close={handleExitModalRequest}
        error={error ? error : false}
        isLoading={isLoading}
        isSuccess={isSuccess && !error}
      ></ModalAddStoreHouse>
    </>
  );
};

export default ModalChoiceStoreHouse;
