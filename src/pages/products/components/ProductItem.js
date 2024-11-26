import React, {useEffect, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import { ReactComponent as MyIconArrowOrange } from "../../../image/arrow-right-orange.svg";
import { ReactComponent as MyIconButtonEdit } from "../../../image/edit.svg";
import  IconNoPhoto  from "../../../image/no-camera.jpg"

function ProductItem({
  id,
  images,
  categoryName,
  isOpenModal,
  quantity,
  title,
  onClick,
}) {

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [DrawImages, setDrawImages] = useState([]);
  

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("key")
      const loadedImages = [];
      for (const id of images) {
        try {
          const response = await fetch(`api/v1/store/image?imageName=${id.imagePath}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,  
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch image for ${id}`);
          }
          
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          loadedImages.push({ id, imageUrl });
        } catch (error) {
          loadedImages.push({ id, error: true });
        }
        
      }
      setDrawImages(loadedImages); 
    };

    fetchImages();
  }, [images]);

  const handleNext = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };
  const handlePrev = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <Box
      sx={{
        height: "414px",
        backgroundColor: "white",
        flex: "0 0 calc(25% - 15px)", 
        marginBottom: "20px",
        marginRight: "20px",
        // Убираем правый отступ у каждого 4-го элемента
        "&:nth-of-type(4n)": {
          marginRight: 0,
        },
        padding: "24px 22px 18px 22px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          height: "123px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          marginBottom: "25px",
        }}
      ><Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2, // Расстояние между элементами
        position: "relative",
        width: "100%",
        height: "35rem",
      }}
    >
      <Box >
      {/* Кнопка для переключения назад */}
      {DrawImages.length > 1 && <Button
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: "10px",
          zIndex: 1,
          bottom: "-10px",
          color: "rgba(255, 149, 0, 1)",
        }}
      >
        ◀
      </Button>}

      {/* Отображение текущего изображения */}
      <Box
  sx={{
    width: "160px",
    height: "160px",
    position: "relative", // Для правильного наложения изображений
    overflow: "hidden", // Скрыть невидимые части
  }}
>
<div>
      {DrawImages.length > 0? DrawImages.map((image, index) => {
        if (image.error) {
          return <p key={`${index}-${image.id}`}>Error loading image for product {image.id}</p>;
        }

        // Определяем стиль для видимости изображения в зависимости от currentPage
        const imageStyle = {
          display: currentIndex === index ? 'block' : 'none', // Показываем только текущее изображение
          width: '100%',
          maxWidth: "160px",
          height: 'auto',
          maxHeight: "160px",
          objectFit: 'contain', // Для корректного отображения изображения
        };

        return (
          <img 
            key={`${index}-${image.id}`} 
            src={image.imageUrl} 
            alt={`Product ${image.id}`} 
            style={imageStyle}
            
          />
        );
      }): <Box sx={{width: "150px",
        height: "150px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><img style={{width: "100px", height: "100px", margin: "auto"}} src={IconNoPhoto}></img></Box>}
    </div>
  {/* {images.map((el, index) => (
    <ProductImage
      key={el.id || index}
      sx={{
        position: "absolute", // Все изображения в одном месте
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: currentIndex === index ? "block" : "none", // Только одно изображение видно
      }}
      imagePath={el.imagePath}
    />
  ))} */}
</Box>

      {/* Кнопка для переключения вперед */}
      {DrawImages.length > 1 && <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: "2px",
          zIndex: 1,
          bottom: "-10px",
          color: "rgba(255, 149, 0, 1)",
          
        }}
      >
        ▶
      </Button>}
    </Box>
    </Box>
        <Button
          id={id}
          variant="outlined"
          onClick={() => {
            console.log("Button clicked");
            if (isOpenModal) isOpenModal();
          }}
          sx={{
            position: "absolute",
            minWidth: "0",
            right: "0",
            width: "16px",
            height: "16px",
            boxSizing: "border-box",
            padding: "0",
          }}
        >
          <MyIconButtonEdit width={"16px"} />
        </Button>

        {/* <ModalEdit
          open={isModalEdit}
          close={onModalToggle}
          name="edit"
          value={categoryName}
        ></ModalEdit> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            flexGrow: "1",
            width: "100%",
            marginBottom: "10px",
            borderBottom: "1px solid #0000001A",
            paddingBottom: "10px",
          }}
        >
          <Typography
            variant="text18Bold"
            sx={{
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="text16Light"
            color="#646261"
            sx={{ marginBottom: "7px", display: "block" }}
          >
            Категория {categoryName}
          </Typography>
          <Typography
            sx={{ display: "block" }}
            variant="text16Light"
            color="#646261"
          >
            {quantity} шт
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "0" }}>
        <Button
          id={id}
          onClick={onClick}
          sx={{
            backgroundColor: "transparent",
            textTransform: "none",
            color: "#F2994A",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
             
              boxShadow: "none",
            },
            border: "none",
            padding: "0",
            marginTop: "10px",
          }}
        >
          <Typography sx={{ marginRight: "15px" }}>Перейти </Typography>
          <MyIconArrowOrange />
        </Button>
      </Box>
    </Box>
  );
}

export default ProductItem;
