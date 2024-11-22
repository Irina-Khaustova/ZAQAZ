import React from "react";
import { useGetPictureQuery } from "../api/Api";

const ProductImage = ({ imagePath, onClick }) => {
  console.log(666, imagePath)
  const { data: imageSrc, error, isLoading} = useGetPictureQuery(imagePath);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.error("Ошибка при загрузке изображения:", error);
    return <div>Ошибка загрузки</div>;
  }

  return (
    <img
      key={imagePath}
      id={imagePath}
      src={imageSrc}
      alt="Изображение товара"
      onClick={onClick}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

export default ProductImage;