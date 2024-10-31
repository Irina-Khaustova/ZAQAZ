import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SideBar from "../../components/SideBar.js";
import { useGetProductQuery, useDeletePostMutation } from "../../api/Api.js";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack.js";
import { useDispatch } from "react-redux";
import { ReactComponent as MyIconEdit } from "../../image/edit-black.svg";
import { ReactComponent as MyIconTrash } from "../../image/icon-trash.svg";
import { putIsOpenModalEdit } from "../products/ProductsSlice.js";

function Product() {
  const [product, setProduct] = useState(0);
  const [images, setImages] = useState([]);

  const { id } = useParams();

  // параметры для фильтрации
  const { data, error, isLoading } = useGetProductQuery(id);
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // при загрузке страницы устанавливаем флаг для запроса списка категорий с сервера
  useEffect(() => {
    setProduct(data);
    setImages(data ? data.images : []);
  }, [data]);

  const onhandleClickEdit = () => {
    dispatch(putIsOpenModalEdit(true));
  };

  const onhandleClickDelete = () => {
 deletePost(id).then(() => navigate('/products'))}

  return (
    <>
      <Container
        disableGutters
        maxWidth="1920"
        sx={{
          margin: "0",
          paddingLeft: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingRight: "0",
          height: "100vh",
        }}
      >
        <SideBar></SideBar>
        <Box sx={{ flexGrow: "1" }}>
          <Box
            sx={{
              backgroundColor: "rgba(246, 248, 249, 1)",
              padding: "37px",
              height: "100%",
              marginTop: "64px",
            }}
          >
            <ButtonBack></ButtonBack>
            {product && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  // minHeight: "100vh",
                  maxWidth: "1200px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    width: "60%",
                    // border: "1px solid rgba(255, 255, 255, 1)",
                    borderRadius: "16px 16px 0 0",
                    padding: "24px",
                  }}
                >
                  <Box
                    sx={{
                      minHeight: "138px",
                      borderBottom: "1px solid #EBEBEB",
                    }}
                  >
                    <Typography variant="text32Bold">
                      {product?.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "24px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "156px",
                          borderRight: "1px solid #EBEBEB",
                        }}
                      >
                        <Typography
                          display="block"
                          variant="text16Bold"
                          marginBottom="8px"
                        >
                          Количество
                        </Typography>
                        <Typography display="block" variant="text16Light">
                          {product.quantity} шт
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "33px" }}>
                        <Typography
                          display="block"
                          variant="text16Bold"
                          marginBottom="8px"
                        >
                          Стоимость
                        </Typography>
                        <Typography display="block" variant="text16Light">
                          {product.price} тг
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ padding: "24px 0 24px 0" }}>
                    <Typography variant="text16Bold">
                      Информация о товаре
                    </Typography>
                    <Box sx={{ marginTop: "13px" }}>
                      <Typography
                        variant="text16Light"
                        sx={{ color: "#424242" }}
                      >
                        {product.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ padding: "24px 0 24px 0" }}>
                    <Typography variant="text16Bold">
                      Технические характеристики
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                    flex: "1 1 37%",
                    boxSizing: "border-box",
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: "375px",
                        height: "367px",
                        backgroundColor: "#EAEAE8",
                        border: "1px solid #EAEAE8",
                        borderRadius: "16px",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "18px",
                        flexWrap: "wrap",
                        marginTop: "17px",
                      }}
                    >
                      {images &&
                        images.map((image) => (
                          <Box
                            sx={{
                              width: "80px",
                              height: "80px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "cenetr",
                              alignItems: "center",
                              backgroundColor: "#EAEAE8",
                              border: "1px solid #EAEAE8",
                              borderRadius: "16px",
                            }}
                          >
                            {image.imagePath ? (
                              <img
                                src={image.imagePath}
                                alt={image.id}
                                style={{
                                  Width: "80px",
                                  Height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <Box sx={{ width: "80px", height: "80px" }}>
                                No Image
                              </Box>
                            )}
                          </Box>
                        ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "375px",
                      padding: "24px",
                      marginTop: "24px",
                      boxSizing: "border-box",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #FFFFFF",
                      borderRadius: "16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={onhandleClickEdit}
                        sx={{
                          width: "280px",
                          height: "42px",
                          border: "1px solid #21212133",
                          borderRadius: "16px",
                          textTransform: "none",
                          boxShadow: "none",
                          backgroundColor: "#F6F8F9",
                          "&:hover": {
                            boxShadow: "none",
                          },
                          "&:active": {
                            boxShadow: "none",
                          },
                          "&:focus": {
                            boxShadow: "none",
                          },

                          "&.hover": {
                            backgroundColor: "#21212133",
                            color: "gray",
                          },
                        }}
                      >
                        <MyIconEdit />
                        <Typography
                          sx={{ marginLeft: "12px" }}
                          variant="main"
                          color="#212121"
                        >
                          Редактировать товар
                        </Typography>
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={onhandleClickDelete}
                        sx={{
                          width: "280px",
                          height: "42px",
                          border: "1px solid #21212133",
                          borderRadius: "16px",
                          textTransform: "none",
                          boxShadow: "none",
                          backgroundColor: "#F6F8F9",
                          "&.Mui-disabled": {
                            backgroundColor: "#F6F8F9",
                            color: "gray",
                          },

                          "&.hover": {
                            backgroundColor: "rgba(246, 248, 249, 1)",
                            color: "gray",
                          },
                        }}
                      >
                        <MyIconTrash />
                        <Typography
                          sx={{ marginLeft: "12px" }}
                          variant="main"
                          color="#212121"
                        >
                          Удалить товар
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Product;
