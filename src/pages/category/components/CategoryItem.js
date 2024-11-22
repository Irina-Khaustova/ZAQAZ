import React, { useEffect, useLayoutEffect, useState, useRef} from "react";
import { Box, Typography, Button } from "@mui/material";
import { ReactComponent as MyIconArrowOrange } from "../../../image/arrow-right-orange.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MyIconButtonEdit } from "../../../image/edit.svg";
import { useGetPictureQuery } from "../../../api/Api";

function CategoryItem({
  id,
  image,
  images,
  categoryName,
  subcategory,
  onModalToggle,
  isModalAdd,
  isModalEdit,
  putCategory,
  categoryType,
}) {
  const [imagePath, setImagePath] = useState("");
  const navigate = useNavigate();
  const [subCategoryDraw, setSubCategoryDraw] = useState([]);
  const [isShowEllipsis, setIsShowEllipsis] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (subcategory) {
      let str = subcategory.map((el) => el.name).join('\n')
      setSubCategoryDraw(str);
     console.log(str)
    }
  }, [subcategory]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    const contentHeight = container.scrollHeight;
    if (contentHeight > containerHeight) {
      setIsShowEllipsis(true);
    }
    console.log(contentHeight, containerHeight);
  },[subCategoryDraw])

  const handleGoSubcategory = (e) => {
    if (categoryType === "Category") {
      putCategory();
      navigate(`/subcategory/${id}`);
    }
  };

  const handlePutCategory = () => {
    if (categoryType === "Category") {
      putCategory(id);
    }
    onModalToggle();
  };

  const { data } = useGetPictureQuery(categoryType === 'Category' ? image.imagePath : images[0].imagePath);

  // useEffect(()=> {
  //   async function fetchAndSetImage() {
  //     const token = localStorage.getItem("key")
  //     try {
  //       // Выполняем запрос с заголовками
  //       const response = await fetch(`api/v1/store/image?imageName=156_1728311542103`, {
  //         method: 'GET',
  //         headers: {
  //           // 'Content-Type': 'image/jpeg',
  //           'Authorization': `Bearer ${token}`,

  //         },
  //       });

  //       // Проверяем успешность ответа
  //       if (!response.ok) {
  //         throw new Error(`Ошибка загрузки: ${response.statusText}`);
  //       }

  //       // Записываем URL изображения в переменную setImagePath
  //       const imageUrl = response.url;
  //       setImagePath(imageUrl);

  //       // Также устанавливаем изображение в элемент <img>, если требуется
  //       const imgElement = document.querySelector('#myImage');
  //       if (imgElement) {
  //         imgElement.src = imageUrl;
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при получении картинки:', error);
  //       setImagePath(null); // Сбрасываем значение переменной в случае ошибки
  //     }
  //   }

  //   // Вызываем функцию сразу при изменении зависимости `image`
  //   if (image.imagePath) {
  //     fetchAndSetImage(image.imagePath);
  //   }
  // },[image.imagePath])

  return (
    <Box
      sx={{
        height: "414px",
        backgroundColor: "white",
        flex: "0 0 calc(25% - 15px)",
        marginBottom: "20px",
        marginRight: "20px",
        "&:nth-of-type(4n)": {
          marginRight: 0,
        },
        padding: "24px 22px 24px 22px",
        boxSizing: "border-box",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Box
          sx={{
            height: "125px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            marginBottom: "0",
            paddingTop: "0",
          }}
        >
          <Button
            id={id}
            variant="outlined"
            onClick={handlePutCategory}
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
          <Box
            sx={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ objectFit: "cover", width: "70%", height: "120px" }}
              src={data}
              alt={id}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: "5px",
            alignItems: "flex-start",
            overflow: "hidden" /* Обрезает текст, выходящий за пределы */,
            textOverflow: "ellipsis" /* Добавляет многоточие */,
            height: "180px",
          }}
        >
          <Box
            sx={{
              minHeight: "37px",
              width: "100%",
              marginTop: "10px",
              borderBottom: "1px solid #0000001A",
              paddingBottom: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="text18Bold">{categoryName}</Typography>
          </Box>
          <Box ref={containerRef} id="text-box" sx={{display: "flex", flexDirection: "column",
   
    height: "150px",  }}>
      <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap',
    overflow: 'hidden', WebkitLineClamp: 5, textOverflow: "ellipsis",
    display: "-webkit-box", height: '150px'}}>
    {subCategoryDraw}
  </Typography>
          {/* {subCategoryDraw &&
            subCategoryDraw.length > 0 &&
            subCategoryDraw.map((el, index) => (
              <Typography
                key={index}
                variant="text16Light"
                sx={{ lineHeight: "24px", color: "#646261", flexShrink: 0,  }}
              >
                {el.name}
              </Typography>
            ))}
          {isShowEllipsis && <Typography>. . .</Typography>} */}
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          id={id}
          onClick={handleGoSubcategory}
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
          {
            <Typography
              sx={{
                marginRight: "10px",
                visibility:
                  categoryType === "SubCategory" ? "hidden" : "visible",
              }}
            >
              Перейти{" "}
            </Typography>
          }
          {categoryType === "Category" && <MyIconArrowOrange />}
        </Button>
      </Box>
    </Box>
  );
}

export default CategoryItem;
