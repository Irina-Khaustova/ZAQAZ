import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SideBar from "../../components/SideBar.js";
import { useGetProductQuery, useDeleteProductMutation } from "../../api/Api.js";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack.js";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as MyIconEdit } from "../../image/edit-black.svg";
import { ReactComponent as MyIconTrash } from "../../image/icon-trash.svg";
import { putIsOpenModalEdit } from "../products/ProductsSlice.js";
import ModalEditProduct from "../../components/ModalEditProduct.js";
import ModalDelete from "../../components/ModalDelete.js";

function Product() {
  const [product, setProduct] = useState(0);
  const [images, setImages] = useState([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const { modalEdit } = useSelector((state) => state.products);
  const [specifications, setSpecifications] = useState([]);

  const { id } = useParams();

  // параметры для фильтрации
  // eslint-disable-next-line
  const { data, error, isLoading, refetch } = useGetProductQuery(id);
  // eslint-disable-next-line
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // при загрузке страницы устанавливаем флаг для запроса списка категорий с сервера
  useEffect(() => {
    setProduct(data);
    setImages(data ? data.images : []);
  }, [data]);

  useEffect(() => {
    const technicalSpecifications = product?.technicalSpecifications;

    if (
      !technicalSpecifications ||
      typeof technicalSpecifications !== "object"
    ) {
      setSpecifications([]);
      return;
    }

    const russianSpecifications = {
      grossWeight: "Масса брутто",
      netWeight: "Масса нетто",
      dimensions: "Габариты",
      voltage: "Напряжение",
      power: "Мощность",
      current: "Ток",
      additionalInfo1: "Дополнительная информация 1",
      additionalInfo2: "Дополнительная информация 2",
      additionalInfo3: "Дополнительная информация 3",
    };

    // Фильтруем и маппим характеристики
    const filteredSpecifications = Object.entries(technicalSpecifications)
      .filter(([key, value]) => value !== "" && value !== null && value !== 0)
      .map(([key, value]) => ({
        name: russianSpecifications[key] || key,
        value,
      }));
    setSpecifications(filteredSpecifications);
  }, [product]);

  const onhandleClickEdit = () => {
    dispatch(putIsOpenModalEdit({ isOpen: true, id: id }));
  };

  const handleToggleModalEdit = () => {
    dispatch(putIsOpenModalEdit({ isOpen: false, id: null }));
  };

  const handleToggleModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  const onhandleClickDelete = () => {
    setIsOpenModalDelete(true);
  };

  const onhandleDelete = () => {
    deleteProduct(id).then(() => console.log("удалено"));
    refetch().then(() => navigate("/products"));
  };

  const handleRefetch = () => {
    refetch();
  };

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
                    <Box sx={{ padding: "10px" }}>
                      {specifications.map((spec) => (
                        <Typography key={spec.name}>
                          {spec.name}: {spec.value}
                        </Typography>
                      ))}
                    </Box>
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
                            key={image.id}
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

                      <ModalEditProduct
                        open={modalEdit.isOpenModalEdit}
                        close={handleToggleModalEdit}
                        refetch={handleRefetch}
                        onhandleClickDelete={onhandleClickDelete}
                        name="edit"
                        id="id"
                      ></ModalEditProduct>
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
                      <ModalDelete
                        open={isOpenModalDelete}
                        close={handleToggleModalDelete}
                        refetch={() => {}}
                        onhandleClickDelete={() => onhandleDelete(id)}
                        name="продукт"
                        id={id}
                      ></ModalDelete>
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
