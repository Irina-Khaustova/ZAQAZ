import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
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
import { usePutProductMutation } from "../api/Api";
import { ReactComponent as MyIconFile } from "../image/file.svg";
import { useGetProductQuery } from "../api/Api";
import CustomTextField from "./CustomTextField";
import RequestProgressModal from "./RequestProgressModal";

const ModalEditProduct = ({ open, close, onhandleClickDelete, refetch }) => {
  const [errorText, setErrorText] = useState({
    category: "",
    parentCategory: "",
    productName: "",
    productCode: "",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState({
    category: false,
    parentCategory: false,
    productName: false,
    productCode: false,
    price: false,
    quantity: false,
  });

  const initialValue = useMemo(
    () => ({
      category: {
        name: "",
      },
      parentCategory: { name: "" },
      images: [],
      productName: "",
      productCode: "",
      price: "",
      quantity: "",
      productType: "",
      productDescription: "",
      technicalSpecifications: {
        additionalInfo1: "",
        additionalInfo2: "",
        additionalInfo3: "",
        current: "",
        dimensions: "",
        grossWeight: "",
        netWeight: "",
        power: "",
        voltage: "",
      },
    }),
    []
  );
  const [
    putProduct,
    {
      error: putProductError,
      isLoading: isLoadingError,
      isSuccess: isSuccessPutProduct,
    },
  ] = usePutProductMutation();
  const { modalEdit } = useSelector((state) => state.products);
  const [id, setId] = useState(null);
  const { data, dataError, isLoading } = useGetProductQuery(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenRequestProgressModal, setisOpenRequestProgressModal] =
    useState(false);
  const modalRef = useRef(null);
  const [inputValues, setInputValues] = useState(initialValue);

  // useEffect(() => {
  //   if (open) {
  //     setInputValue("");
  //   }
  // }, [open]);

  useEffect(() => {
    if (Object.keys(inputValues).length === 0) {
      setInputValues(initialValue);
    }
  }, [inputValues, initialValue]);

  useEffect(() => {
    setInputValues(initialValue);
  }, [open, initialValue]);

  useEffect(() => {
    setId(modalEdit.productIsEditId);
  }, [modalEdit]);

  useEffect(() => {
    setInputValues(initialValue);
  }, [initialValue]);

  useEffect(() => {
    console.log(data);
    if (data) {
      const img = data.images || [];
      const images = [...img, ...Array(8 - img.length)].fill(null);
      const images1 = [...img, ];
      const images2 = images1.concat(Array(8 - img.length).fill(null))
      console.log(images, img, images1, images2);
      setInputValues({
        category: { name: data.category.name },
        parentCategory: { name: data.category.parentCategory?.name || "" },
        productName: data.title,
        productCode: data.sku,
        price: data.price,
        quantity: data.quantity,
        productType: data.type?.name,
        images: images2,
        productDescription: data.description,
        technicalSpecifications: {
          additionalInfo1: data.technicalSpecifications.additionalInfo1,
          additionalInfo2: data.technicalSpecifications.additionalInfo2,
          additionalInfo3: data.technicalSpecifications.additionalInfo3,
          current: data.technicalSpecifications.current,
          dimensions: data.technicalSpecifications.dimensions,
          grossWeight: data.technicalSpecifications.grossWeight,
          id: data.technicalSpecifications.id,
          netWeight: data.technicalSpecifications.netWeight,
          power: data.technicalSpecifications.power,
          voltage: data.technicalSpecifications.voltage,
        },
      });
    }
  }, [data]);

  const onSigninSubmitProduct = async () => {
    setisOpenRequestProgressModal(true);
    close();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const productPayload = {
      id: Number(id),
      title: inputValues.productName,
      description: inputValues.productDescription,
      category: {
        id: data.category.id,
      },
      price: inputValues.price,
      active: data.active,
      technicalSpecifications: inputValues.technicalSpecifications,
      type: {
        id: data.type?.id,
        name: inputValues.productType,
      },
      quantity: inputValues.quantity,
    };

    try {
      await putProduct(productPayload).unwrap();
      close();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
      refetch();
      setInputValues(initialValue);
    }
  };

  const onhandleClick = (e) => {
    e.preventDefault();
    if (!Object.values(error).some((value) => value !== false)) {
      onSigninSubmitProduct();
    }
    setInputValues(initialValue);
  };

  const handleAddPhoto = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result.split(",")[1];
        setInputValues((prev) => {
          const newImages = [...prev.images];
          newImages[index] = {
            id: {},
            fileBase64: base64String,
            imagePath: "",
          };
          return {
            ...prev,
            images: newImages,
          };
        });
      };
      reader.readAsDataURL(file); // Прочитать файл и создать строку base64
    }
  };

  const handleInputChange = (e) => {
    setError(false);
    if (e.target.value === "") {
      setErrorText((prevErrorText) => ({
        ...prevErrorText,
        [e.target.name]: "Поле не может быть пустым",
      }));
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: true,
      }));
    }
    setInputValues((prev) => {
      let newProduct = { ...prev };
      if (e.target.name === "technicalSpecifications") {
        newProduct.technicalSpecifications[e.target.id] = e.target.value;
      } else if (
        e.target.name === "category" ||
        e.target.name === "parentCategory"
      ) {
        console.log(newProduct[e.target.name], e.target.name);
        newProduct[e.target.name].name = e.target.value;
      } else {
        newProduct[e.target.name] = e.target.value;
      }
      return newProduct;
    });
  };

  // const handleClose = () => {
  //   setInputValues(initialValue);
  //     close()
  // }

  const handleExitModalRequest = () => {
    setisOpenRequestProgressModal(false);
    close();
  };

  const handleClickButtonRepeat = () => {};

  return (
    <>
      {!isOpenRequestProgressModal && (
        <Dialog
          open={open}
          onClose={() => {}}
          maxWidth={false}
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
            e.stopPropagation();
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
            <Typography variant="text24Medium">
              Редактирование товара
            </Typography>
          </DialogTitle>
          {isLoading ? <Typography>Загрузка...</Typography> : null}
          {dataError ? <Typography>Ошибка загрузки</Typography> : null}
          {data && (
            <DialogContent
              ref={modalRef}
              sx={{
                width: "440px",
                padding: "0",
                boxSizing: "border-box",
              }}
            >
              <Typography sx={{ marginTop: "15px" }}>Категория</Typography>
              <CustomTextField
                margin="dense"
                name="parentCategory"
                type="text"
                error={error.parentCategory}
                helperText={errorText.parentCategory}
                value={inputValues.parentCategory.name || ""}
                onChange={handleInputChange}
              />
              <Typography sx={{ marginTop: "15px" }}>Подкатегория</Typography>
              <CustomTextField
                margin="dense"
                name="category"
                type="text"
                error={error.category}
                helperText={errorText.category}
                value={inputValues.category.name || ""}
                onChange={handleInputChange}
              />
              <Typography sx={{ marginTop: "15px" }}>
                Название товара
              </Typography>
              <CustomTextField
                margin="dense"
                name="productName"
                type="text"
                error={error.productName}
                helperText={errorText.productName}
                value={inputValues.productName || ""}
                onChange={handleInputChange}
              />
              <Typography sx={{ marginTop: "15px" }}>Код товара</Typography>
              <CustomTextField
                margin="dense"
                name="sku"
                type="text"
                value={inputValues.productCode || ""}
                onChange={handleInputChange}
              />
              <Typography sx={{ marginTop: "15px" }}>Цена</Typography>
              <CustomTextField
                margin="dense"
                name="price"
                type="number"
                // value={inputValues.price}
                onChange={handleInputChange}
              />
              <Typography sx={{ marginTop: "15px" }}>
                Количество товара
              </Typography>
              <CustomTextField
                margin="dense"
                name="quantity"
                type="number"
                error={error.quantity}
                helperText={errorText.quantity}
                value={inputValues.quantity || ""}
                onChange={handleInputChange}
              />
              <Typography sx={{ marginTop: "15px" }}>Вид товара</Typography>
              <CustomTextField
                margin="dense"
                name="productType"
                type="text"
                value={inputValues.productType || ""}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "14px",
                }}
              >
                <Typography variant="text18Bold">Фото и описание</Typography>
                <Typography
                  variant="text16Light"
                  sx={{
                    marginTop: "5px",
                    lineHeight: "22px",
                    marginBottom: "7px",
                  }}
                >
                  Не должно превышать <strong>60 мб</strong>, размер
                  <strong> 2х2</strong>
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {inputValues.images?.map((el, index) => (
                    <CustomTextField
                      key={index}
                      margin="dense"
                      id={`file-upload-${index}`}
                      type="file"
                      noBorder
                      sx={{
                        width: "23%",
                        padding: "0",
                        "& fieldset": {
                          backgroundColor: "transparent",
                          padding: "0",
                        },
                        "& .css-w11bco-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            padding: "0",
                          },
                      }}
                      InputProps={{
                        startAdornment:
                          !el || !el.fileBase64 ? (
                            <MyIconFile style={{ cursor: "pointer" }} />
                          ) : (
                            <img
                              src={`data:image/png;base64,${el.fileBase64}`}
                              alt="preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                            />
                          ),
                      }}
                      inputProps={{
                        style: { display: "none" },
                      }}
                      value={""}
                      onChange={(e) => handleAddPhoto(e, index)}
                    ></CustomTextField>
                  ))}
                </Box>
                <Typography sx={{ marginTop: "15px" }}>
                  Описание товара
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="productDescription"
                  type="text"
                  value={inputValues.productDescription || ""}
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
                <Typography
                  variant="text24Bold"
                  sx={{ marginTop: "15px", textAlign: "center" }}
                >
                  Тех. характеристики
                </Typography>
                <Typography sx={{ marginTop: "15px" }}>Вес брутто</Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="grossWeight"
                  type="number"
                  value={inputValues.technicalSpecifications.grossWeight || ""}
                  onChange={handleInputChange}
                />
                <Typography sx={{ marginTop: "15px" }}>Вес нетто</Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="netWeight"
                  type="number"
                  value={inputValues.technicalSpecifications.netWeight || ""}
                  onChange={handleInputChange}
                />
                <Typography sx={{ marginTop: "15px" }}>
                  Длина-Ширина-Высота
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="dimensions"
                  type="text"
                  value={inputValues.technicalSpecifications.dimensions || ""}
                  onChange={handleInputChange}
                />
                <Typography sx={{ marginTop: "15px" }}>
                  Напряжение, Вт
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="voltage"
                  type="number"
                  value={inputValues.technicalSpecifications.voltage || ""}
                  onChange={handleInputChange}
                />
                <Typography sx={{ marginTop: "15px" }}>
                  Мощность, Ватт
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="power"
                  type="number"
                  value={inputValues.technicalSpecifications.power || ""}
                  onChange={handleInputChange}
                />
                <Typography sx={{ marginTop: "15px" }}>
                  Сила тока, Ампер
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="current"
                  type="number"
                  value={inputValues.technicalSpecifications.current || ""}
                  onChange={handleInputChange}
                />
                <Typography sx={{ marginTop: "15px" }}>
                  Дополнительная информация 1
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="additionalInfo1"
                  type="text"
                  value={
                    inputValues.technicalSpecifications.additionalInfo1 || ""
                  }
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
                <Typography sx={{ marginTop: "15px" }}>
                  Дополнительная информация 2
                </Typography>
                <CustomTextField
                  margin="dense"
                  name="technicalSpecifications"
                  id="additionalInfo2"
                  type="text"
                  value={
                    inputValues.technicalSpecifications.additionalInfo2 || ""
                  }
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
                <Typography sx={{ marginTop: "15px" }}>
                  Дополнительная информация 3
                </Typography>
                <CustomTextField
                  margin="dense"
                  id="additionalInfo3"
                  name="technicalSpecifications"
                  type="text"
                  value={
                    inputValues.technicalSpecifications.additionalInfo3 || ""
                  }
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
                <Typography
                  sx={{ marginTop: "15px", textAlign: "center" }}
                ></Typography>
              </Box>
            </DialogContent>
          )}

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
              // disabled={isDisabledDelete}
              onClick={onhandleClickDelete}
              sx={{
                height: "56px",
                border: "1px solid rgba(246, 248, 249, 1)",
                borderRadius: "16px",
                marginBottom: "5px",
                textTransform: "none",
                boxShadow: "none",
                "&.Mui-disabled": {
                  backgroundColor: "#F6F8F9",
                  color: "gray",
                },
                "&.hover": {
                  backgroundColor: "rgba(246, 248, 249, 1)",
                  color: "gray",
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
              <Typography variant="text16Bold">Удалить</Typography>
            </Button>
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
        </Dialog>
      )}
      <RequestProgressModal
        handleClickButton={handleClickButtonRepeat}
        open={isOpenRequestProgressModal}
        close={handleExitModalRequest}
        error={putProductError ? putProductError : false}
        isLoading={isLoadingError}
        isSuccess={isSuccessPutProduct && !isLoadingError}
      ></RequestProgressModal>
    </>
  );
};

export default ModalEditProduct;
