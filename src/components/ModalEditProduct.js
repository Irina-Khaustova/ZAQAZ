import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  styled,
} from "@mui/material";
import { ReactComponent as MyIconExit } from "../image/icon-exit.svg";
import { usePutProductMutation } from "../api/Api";
import { ReactComponent as MyIconFile } from "../image/file.svg";
import { useGetProductQuery } from "../api/Api";

const CustomTextField = styled(
  ({
    autoFocus = true,
    fullWidth = true,
    autoComplete = "off",
    noBorder = false,
    ...props
  }) => (
    <TextField
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      {...props}
    />
  )
)(({ noBorder }) => ({
  borderRadius: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      border: noBorder ? "none" : "1px solid #EBEBEB", 
      backgroundColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: noBorder ? "none" : "rgba(200, 200, 200, 1)", 
    },
    "&.Mui-focused fieldset": {
      borderColor: noBorder ? "none" : "rgba(255, 149, 0, 1)", 
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
}));

const ModalEditProduct = ({ open, close, modalCategory, sendRequest, refetch }) => {
  const [errorText, setErrorText] = useState({
      category: '',
      parentCategory: '',
      productName: '',
      productCode: '',
      price: '',
      quantity: '',
  }
  );
  const [error, setError] = useState({
      category: false,
      parentCategory: false,
      productName: false,
      productCode: false,
      price: false,
      quantity: false,
  });
  const [putProduct] = usePutProductMutation();
  const { modalEdit } = useSelector((state) => state.products);
  const [id, setId] = useState(null);
  const { data, dataError, isLoading } = useGetProductQuery(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  const [inputValues, setInputValues] = useState({
    category: {
      name: "",
    },
    parentCategory: { name: "" },
    productName: "",
    productCode: "",
    price: "",
    quantity: "",
    productType: "",
    images: [],
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
  });

  // useEffect(() => {
  //   if (open) {
  //     setInputValue("");
  //   }
  // }, [open]);

  useLayoutEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [open]);

  useEffect(() => {
    setId(modalEdit.productIsEditId);
  }, [modalEdit]);

  useEffect(() => {
   
    if (data) {

      const img = data.images || [];
      const images = [...img, ...Array(8 - img.length)].fill(null);

      setInputValues({
      category: { name: data.category.name },
      parentCategory: { name: data.category.parentCategory.name },
      productName: data.title,
      productCode: data.extId,
      price: data.price,
      quantity: data.quantity,
      productType: data.type.name,
      images: images,
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
        voltage: data.technicalSpecifications.additionalInfo1,
      },
    })
  };
  }, [data]);

  const onSigninSubmitProduct = async () => {
    if (isSubmitting) return; 
  setIsSubmitting(true); 

    const productPayload = {
      "id": id,
      "title": inputValues.productName,
      "description": inputValues.productDescription,
      "category": {
        "id": data.category.id,
        // "name": inputValues.category,
        // "isHidden": data.category.isHidden,
        // "store": data.category.store,
        // "extId": data.category.extId,
        // "color": data.category.color,
        // "parentCategory": inputValues.parentCategory,
        // "images": data.category.images
      },
      "price": inputValues.price,
      "active": data.active,
      "extId": inputValues.productCode,
      // "measureUnit": data.measureUnit,
      // "tags": data.tags,
      // "sku": data.sku,
      // "images": inputValues.images,
      "technicalSpecifications": inputValues.technicalSpecifications,
      "type": {
        "id": data.type.id,
        "name": inputValues.productType,
      },
      "quantity": inputValues.quantity
  }
    try {
      putProduct(productPayload).unwrap();
      refetch();
      close();

      alert("Успешно");
      close();
     
    } catch (err) {
      console.log(err);
      alert(err.data);
    } finally {
      setIsSubmitting(false)
      sendRequest()
    }
  };

  const onhandleClick = (e) => {
    e.preventDefault();
    if(!Object.values(error).some((value) => value !== false)) {
      onSigninSubmitProduct();
    }
  };

  const handleAddPhoto = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result.split(",")[1];
        setInputValues((prev) => {
          const newImages = [...prev.images];
          newImages[index] = { id: {}, fileBase64: base64String, imagePath: "" };
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
    setError(false)
    if(e.target.value === '') {
      setErrorText((prevErrorText) => ({
        ...prevErrorText,
        [e.target.name]: 'Поле не может быть пустым',
      }));
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: true,
      }));
    }
    setInputValues((prev) => {
    let newProduct = {...prev}
    if (e.target.name === "technicalSpecifications") {
      newProduct.technicalSpecifications[e.target.id] = e.target.value;
    } else if (e.target.name === "category" || e.target.name === "parentCategory"){
      console.log(newProduct[e.target.name], e.target.name)
      newProduct[e.target.name].name = e.target.value;
    } else {
      newProduct[e.target.name] = e.target.value;
    }
    return newProduct;
  }
  )
  };

  return (
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
          width: "732px", 
          borderRadius: "16px", 
          backgroundColor: "#FFFFFF", 
          boxShadow: "none", 
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
        <Typography variant="text24Medium">Редактирование товара</Typography>
      </DialogTitle>
       {isLoading? <Typography>Загрузка...</Typography> : null}
       {dataError? <Typography>Ошибка загрузки</Typography> : null}
       {data && <DialogContent
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
          value={inputValues.parentCategory.name}
          onChange={handleInputChange}
        />
        <Typography sx={{ marginTop: "15px" }}>Подкатегория</Typography>
        <CustomTextField
          margin="dense"
          name="category"
          type="text"
          error={error.category}
          helperText={errorText.category}
          value={inputValues.category.name}
          onChange={handleInputChange}
        />
        <Typography sx={{ marginTop: "15px" }}>Название товара</Typography>
        <CustomTextField
          margin="dense"
          name="productName"
          type="text"
          error={error.productName}
          helperText={errorText.productName}
          value={inputValues.productName}
          onChange={handleInputChange}
        />
        <Typography sx={{ marginTop: "15px" }}>Код товара</Typography>
        <CustomTextField
          margin="dense"
          name="productCode"
          type="number"
          value={inputValues.productCode}
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
        <Typography sx={{ marginTop: "15px" }}>Количество товара</Typography>
        <CustomTextField
          margin="dense"
          name="quantity"
          type="number"
          error={error.quantity}
          helperText={errorText.quantity}
          value={inputValues.quantity}
          onChange={handleInputChange}
        />
        <Typography sx={{ marginTop: "15px" }}>Вид товара</Typography>
        <CustomTextField
          margin="dense"
          name="productType"
          type="text"
          value={inputValues.productType}
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
            sx={{ marginTop: "5px", lineHeight: "22px", marginBottom: "7px" }}
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
            {inputValues.images.map((el, index) => (
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
                  "& .css-w11bco-MuiInputBase-root-MuiOutlinedInput-root": {
                    padding: "0",
                  },
                }}
                InputProps={{
                  startAdornment: !el || ! el.fileBase64 ? (
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
          <Typography sx={{ marginTop: "15px" }}>Описание товара</Typography>
          <CustomTextField
            margin="dense"
            name="productDescription"
            type="text"
            value={inputValues.productDescription}
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
            value={inputValues.technicalSpecifications.grossWeight}
            onChange={handleInputChange}
          />
          <Typography sx={{ marginTop: "15px" }}>Вес нетто</Typography>
          <CustomTextField
            margin="dense"
            name="technicalSpecifications"
            id="netWeight"
            type="number"
            value={inputValues.technicalSpecifications.netWeight}
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
            value={inputValues.technicalSpecifications.dimensions}
            onChange={handleInputChange}
          />
          <Typography sx={{ marginTop: "15px" }}>Напряжение, Вт</Typography>
          <CustomTextField
            margin="dense"
            name="technicalSpecifications"
            id="voltage"
            type="number"
            value={inputValues.technicalSpecifications.voltage}
            onChange={handleInputChange}
          />
          <Typography sx={{ marginTop: "15px" }}>Мощность, Ватт</Typography>
          <CustomTextField
            margin="dense"
            name="technicalSpecifications"
            id="power"
            type="number"
            value={inputValues.technicalSpecifications.power}
            onChange={handleInputChange}
          />
          <Typography sx={{ marginTop: "15px" }}>Сила тока, Ампер</Typography>
          <CustomTextField
            margin="dense"
            name="technicalSpecifications"
            id="current"
            type="number"
            value={inputValues.technicalSpecifications.current}
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
            value={inputValues.technicalSpecifications.additionalInfo1}
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
            value={inputValues.technicalSpecifications.additionalInfo2}
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
            value={inputValues.technicalSpecifications.additionalInfo3}
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
      </DialogContent>}

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
          onClick={onhandleClick}
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
  );
};

export default ModalEditProduct;
