import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { useGetStoreHouseQuery, usePostProductMutation } from "../api/Api";
import ModalAddStoreHouse from "./ModalAddStoreHouse";
import { useGetStoreHousesQuery, uaseGetStoreHouseQuery } from "../api/Api";
import { ReactComponent as MyIconArrawRight } from "../image/icon-arraw-right-gray.svg";
import { ReactComponent as MyIconChecked } from "../image/icon-checked.svg";
import { ReactComponent as MyIconUnchecked } from "../image/icon-unchecked.svg";
import  { putStoreHouse} from "../components/SideBarSlice.js";
import { dateCalendarClasses } from "@mui/x-date-pickers";

const ModalChoiceStoreHouse = ({ open, close }) => {
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenAddStoreHouseModal, setisOpenAddStoreHouseModal] =
    useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [storeHouse, setStoreHouse] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [choiceId, setChoiceId] = useState(null);
  const [dataDrawItem, setdataDrawItem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [idEdit, setIdEdit] = useState(null);
  const [dataDrawStoreHouses, setDataDrawStoreHouses] = useState()

  
  // const data = [
  //   { value: "Казпочта", description: "г. Алматы - Описание склада" },
  //   { value: "Казпочта", description: "г. Алматы - Описание склада" },
  //   { value: "Казпочта", description: "г. Алматы - Описание склада" },
  // ];

  const {data, refetch: refetchStoreHouses } = useGetStoreHousesQuery();
  // const {data: data1, refetch} = useGetStoreHouseQuery(choiceId, {
  //   slip: !choiceId 
  // })
  const dispatch = useDispatch();

  
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
      setErrorText(err.data || "Произошла ошибка");
      setdataDrawItem(null); // Сброс состояния при ошибке
    } finally {
      setIsSubmitting(false);
      // refetch();
      close();
    }
  };

  const onhandleClickAdd = (e) => {
    e.preventDefault();
    const choice = data.content.find((el) => Number(el.id) === Number(selectedValue));
    console.log(data, choice)
    dispatch(putStoreHouse(choice));
    close()
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSelected(event.target);
    console.log("Выбрано значение:", event.target);
  };

  const onhandleClickChoice = () => {};

  const handleExitModalRequest = () => {
    setisOpenAddStoreHouseModal(false);
    refetchStoreHouses();
    close();
  };

  
// рабочий код, но состояние окна не меняется если ошибка запроса данных
  // const onGoToStoreHouse = (id) => {
  //   setChoiceId(id);
  //   refetch(id)
  //   setisOpenAddStoreHouseModal(true);
  //   setTypeModal('edit');
  //   setChoiceId(id);
  //   console.log(choiceId, typeModal)

  // };

  const onGoToStoreHouse = async (id) => {
    // Сначала очищаем данные
    console.log("id", id)
    setdataDrawItem(null);
    setIdEdit(id)
    // Затем устанавливаем ID и тип модального окна
    setChoiceId(id);
    setTypeModal('edit');
  
    // try {
      // Выполняем запрос
      // const response = await refetch(id);
      
      // // Проверяем наличие ошибок в ответе
      // if (response.error) {
      //   throw new Error(response.error);
      // }
  
      // // Устанавливаем данные после успешного запроса
      // setdataDrawItem(response.data); // Предполагаем, что данные находятся в response.data
      // console.log("успех");
      
      // // Открываем модальное окно
      setisOpenAddStoreHouseModal(true);
    // } catch (error) {
    //   console.error("Ошибка при получении данных:", error);
    //   alert("Не удалось получить данные. Пожалуйста, попробуйте снова.");
    // }
  };

  const onhandleClickGoToAdd = () => {
    setisOpenAddStoreHouseModal(true);
    setTypeModal("add");
  };

  // useEffect(() => {
  //   if (data1) {
  //     setdataDrawItem(data1)
  //   }
  // }, [data1, refetch]);

  useEffect(() => {
    if (data) {
      setDataDrawStoreHouses(data)
    }
  }, [data, refetchStoreHouses]);

  useEffect(() => {
    console.log(idEdit)
  }, [idEdit]);

  useEffect(() => {
  refetchStoreHouses();
  setDataDrawStoreHouses(data)
  },[refetchStoreHouses, data])

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
            sx={{
              padding: "24px", 
              marginBottom: "11px",
            }}
          >
            <Typography variant="text24Medium">Склады</Typography>
          </DialogTitle>

          <DialogContent
            sx={{
              width: "445px",
              maxWidth: "445px",
              padding: "0",
              // paddingLeft: "15px",
              boxSizing: "border-box",
            }}
          >
            <FormControl
              sx={{
                width: "100%",
                minHeight: "42px",
                marginBottom: "48px",
                boxSizing: "border-box",
                maxWidth: "100%",
                overflowX: "hidden",
              }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={selectedValue} // Привязываем к состоянию
                onChange={handleChange} // Обрабатываем изменение
              >
                {dataDrawStoreHouses
                  ? dataDrawStoreHouses.content.map((el, index) => (
                      <Box
                        key={`${el.value}-${index}`}
                        sx={{
                          boxSizing: "border-box",
                          borderBottom: "1px solid rgba(236, 236, 236, 1)",
                          // width: "100%",
                          padding: "8px",
                          position: "relative",
                        }}
                      >
                        <FormControlLabel
                          // key={`${el.value}-${index}`}
                          value={el.id}
                          id={el.id}
                          label={el.title}
                          sx={{

                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            // width: "100%",
                            marginLeft: "0px",
                            marginRight: "0px",
                            boxSizing: "border-box",
                          }}
                          control={
                            <Radio
                              icon={
                                <MyIconUnchecked
                                  style={{ width: 16, height: 16 }}
                                />
                              } // Иконка для "не выбранного" состояния
                              checkedIcon={
                                <MyIconChecked
                                  style={{ width: 16, height: 16 }}
                                />
                              }
                              sx={{
                                lineHeight: "22.5px",
                                padding: "0",
                                marginRight: "10px",
                                marginLeft: "0",
                                marginTop: "13px",
                                boxSizing: "border-box",
                                color:
                                  selectedValue === el.value
                                    ? "rgba(255, 165, 0, 1)"
                                    : "rgba(0, 0, 0, 0.54)", // Оранжевый для невыбранного
                                // "&.Mui-checked": {
                                //   border: "2 px solid orange",
                                //   color: "white", // Белый для выбранного
                                //   backgroundColor: "orange", // Оранжевый фон для выбранного состояния
                                //   backgroundImage: "../image/icon-arraw-right-gray.svg",
                                //   "&:hover": {
                                //     backgroundColor: "orange", // Оранжевый фон при наведении
                                //   },
                                // },
                                // "&.MuiFormControlLabel-root": {
                                //   marginLeft: "0px",
                                // },
                              }}
                            />
                          }
                        />
                        <Box
                          sx={{
                            color: "rgba(189, 189, 189, 1)",
                            width: "200px",
                            fontSize: "14px",
                            fontWeight: "400",
                            fontFamily: "Nunito Sans, Sans Serif",
                            marginLeft: "25px",
                            boxSizing: "border-box",
                          }}
                        >{`${el.city} - Описание склада`}</Box>
                        <Box
                          sx={{
                            position: "absolute",
                            right: "5px",
                            bottom: "16px",
                          }}
                        >
                          <MyIconArrawRight
                            onClick={() => onGoToStoreHouse(el.id)}
                            sx={{
                              position: "absolute",
                              cursor: "pointer",
                              "& svg": {
                                position: "absolute",
                              },
                            }}
                          ></MyIconArrawRight>
                        </Box>
                      </Box>
                    ))
                  : null}
                {}
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
              boxshadow="none"
              onClick={onhandleClickGoToAdd}
              sx={{
                height: "56px",
                border: "1px solid rgba(246, 248, 249, 1)",
                backgroundColor: "rgba(246, 248, 249, 1)",
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
              onClick={onhandleClickAdd}
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
        id={idEdit}
        type={typeModal}
        refetch={refetchStoreHouses}
        // dataDrawItem={dataDrawItem}
      ></ModalAddStoreHouse>
    </>
  );
};

export default ModalChoiceStoreHouse;
