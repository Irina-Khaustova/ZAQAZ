import React, { useEffect, useState } from "react";
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
  categoryType
} from "@mui/material";
import { ReactComponent as MyIconCamera } from "../../../image/icon-camera.svg";
import { ReactComponent as MyIconExit } from "../../../image/icon-exit.svg";
import { useSelector } from "react-redux";
import { useDeleteCategoryImageMutation, usePostCategoryImageMutation, usePutCategoryMutation, useLazyGetPictureQuery } from "../../../api/Api";
import CustomTextField from "../../../components/CustomTextField";
import { putcategoryImage } from "../categorySlice";
import { CalculateSharp } from "@mui/icons-material";
// import RequestProgressModal from "../../../components/RequestProgressModal";

const ModalEdit = ({ open, close, value, refetch, deleteCategory, categoryType }) => {
  // eslint-disable-next-line
  // const [isDisabledDelete, setIsDisabledDelete] = useState(true);
  const [inputValue, setInputValue] = useState({
    name: "",
    nameEn: ""
  });
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(false);
  const [imageSelect, setImageSelect] = useState(null);
  // const [isOpenRequestProgressModal, setisOpenRequestProgressModal] = useState(false);
  const { category } = useSelector((state) => state.category);
  const {subcategory} = useSelector((state) => state.subcategory);
  const {storeHouse} = useSelector(store => store.sideBar);
  const {categoryImage, categoryImageId} = useSelector((store) => store.category);
  const [initialImage, setInitialImage] = useState(null);
  const [imageToSend, setImageToSend] = useState(null);
  const storeId = storeHouse === null ? parseInt(process.env.REACT_APP_STORE_ID) : storeHouse;
  const [getPicture, { data, isLoading, errorPicture }] = useLazyGetPictureQuery();

  const maxSizeMb = 60 * 1024 * 1024;
  const maxWidth = 2000;
  const maxHeight = 2000;

  useEffect(() => {
    setImageSelect(null)
    const fetchPicture = async () => {
      try {
        const result = await getPicture(categoryImage).unwrap();
        console.log("Данные изображения:", result);
        setImageSelect(result)
      } catch (error) {
        console.error("Ошибка получения изображения:", error);
      }
    };
  }, [open, categoryImage])

  useEffect(() => {
    setInitialImage(categoryImage); 
    if (categoryType === "Category" && category) {
      setInputValue({ name: category?.name || "", nameEn: category?.nameEn || "" });
    } else if (categoryType === "SubCategory" && subcategory) {
      setInputValue({ name: subcategory?.name || "", nameEn: subcategory?.nameEn || "" });
    }
  }, [category, subcategory, categoryType]);

  useEffect(() => {

    getPicture(categoryImage)
    console.log(2222, categoryImage)
  }, [categoryImage])

  useEffect(()=> {
   setImageSelect(data)
   console.log(data)
  }, [data])

 
  const [putCategory] = usePutCategoryMutation();
  const [postCategoryImage] = usePostCategoryImageMutation();
  const [deleteCategoryImage] = useDeleteCategoryImageMutation();
 

  //  старая работающая функция отправки без картинок
//   const onSigninSubmit = async () => {
//     if(categoryType === "Category") {
//     try {
//       await putCategory({
//         id: category.id,
//         name: inputValue.name,
//         nameEn: inputValue.nameEn,
//         store: {
//           id: storeId
//         },
//         extId: category.extId,
//         color: "b9f6ca",
//       }).unwrap();
//       refetch();
//       close();
//     } catch (err) {
//       alert(err.data);
//     }
//   } else if(categoryType === "SubCategory") {
//     try {
//       await putCategory({
//         parentId: category.id,
//         id: subcategory.id,
//         name: inputValue.name,
//         nameEn: inputValue.nameEn,
//         store: {
//           id: storeId
//         },
//         extId: category.extId,
//         color: "b9f6ca",
//       }).unwrap();
//       refetch();
//       close();
//     } catch (err) {
//       alert(err.data);
//     }
//   }
// }

const onSigninSubmit = async () => {
  const id = category.id;
  try {
   
    console.log( imageSelect, initialImage)
    if(imageToSend) {
    const fileBase64 = await convertToBase64(imageToSend);
    }
    // console.log(data, data.id)
    // console.log(imageSelect, initialImage, isImageChanged)
    // const uploadImagePromise = isImageChanged ? postCategoryImage({image: imageSelect, id: category.id}) : Promise.resolve();
    // const deleteImagePromise = isImageChanged && initialImage ? deleteCategoryImage(category?.id) : Promise.resolve();
    // const updateCategoryPromise = putCategory({
    //   id: category.id,
    //   name: inputValue.name,
    //   nameEn: inputValue.nameEn,
    //   store: { id: storeId },
    //   extId: category.extId,
    //   color: "b9f6ca",
    // }).unwrap();

    // await Promise.all([uploadImagePromise, deleteImagePromise, updateCategoryPromise]);

    try {
      await putCategory({
        id: category.id,
        name: inputValue.name,
        nameEn: inputValue.nameEn,
        store: { id: storeId },
        extId: category.extId,
        color: "b9f6ca",
      }).unwrap();
    } catch (error) {
      console.error("Ошибка при  редактировании категории:", error);
    }

    try {
      const fileBase64 = await convertToBase64(imageToSend);
      console.log("id", id)
      const imagePayload = [{fileBase64: fileBase64}]
      await postCategoryImage({ image: imagePayload, id: id }).unwrap();
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    }
    
    try {
      await deleteCategoryImage(categoryImageId).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении изображения:", error);
    }

    refetch();
    close();
    alert("Категория обновлена и изображение загружено успешно!");

  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при сохранении данных. Попробуйте снова.");
  }
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]); // Убираем `data:image/*;base64,`
    reader.onerror = (error) => reject(error);
  });
};

  const onhandleClick = (e) => {
    e.preventDefault();
    setError(false);
    setErrorText("");
    if (inputValue.name === "" || inputValue.nameEn === "") {
      setErrorText("Введите название!");
      setError(true);
    } else {
      onSigninSubmit();
    }
  };

  const onHandleClickChange = () => {
    setImageSelect(null);
  }

  const onhandleClickDelete = () => {
    deleteCategory(category.id);
    refetch();
    close()
  }

  const handleInputChange = (e) => {
    setError(false);
    setErrorText("");
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const onHandleAddPhoto = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        console.log(image.src)
        image.onload = () => {
            if (image.size > maxSizeMb) {
                setErrorText("Размер изображения должен быть 2х2");
                setImageSelect(null);
                console.log(" yes")
            } else {
                setErrorText("");
                setImageSelect(image.src);
                setImageToSend(file)
                console.log(2222, imageSelect)
                // Если вам нужно отправить изображение на сервер, используйте FormData
                const formData = new FormData();
                formData.append('image', file);

                // Отправка изображения на сервер
                // dispatch(uploadImage(formData)); // Пример действия для загрузки изображения
            }
        };
    }
};

  return ( 
    <>
    { true && <Dialog
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
        variant="outlined"
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
        <Typography variant="text24Medium">{categoryType === "Category"? "Редактировать категорию" : "Редактировать подкатегорию"}</Typography>
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
           <Box
                component="label"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {!imageSelect && <MyIconCamera sx={{ width: "96px", height: "96px" }} />}
                {imageSelect && (
                <div>
                    <img src={imageSelect} alt="Uploaded" style={{ width: '96px', height: '96px' }} />
                </div>
            )}
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
              Не должно превышать <strong>60 мб</strong>,{" "}
              <strong>размер 2х2</strong>
            </Typography>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disableElevation
              onClick={onHandleClickChange}
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
          fullWidth
          error={error}
          helperText={errorText}
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
        onClick={onhandleClickDelete}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          boxshadow="none"
          // disabled={isDisabledDelete}
         
          sx={{
            height: "56px",
            border: "1px solid rgba(246, 248, 249, 1)",
            borderRadius: "16px",
            marginBottom: "5px",
            textTransform: "none",
            boxShadow: "none",
            // "&.Mui-disabled": {
            //   backgroundColor: "#F6F8F9",
            //   color: "gray",
            // },
           
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
          <Typography variant="text16Bold">Удалить</Typography>
        </Button>

        <Button
        onClick={onhandleClick}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          
          boxshadow="none"
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
    {/* <RequestProgressModal
    handleClickButton={handleClickButtonRepeat}
    open={isOpenRequestProgressModal}
    close={handleExitModalRequest}
    error={postCategoryError? postCategoryError: false}
    isLoading={isLoadingError}
    isSuccess={isSuccessPostCategory && !isLoadingError}
  ></RequestProgressModal> */}
  </>
  );
};

export default ModalEdit;
