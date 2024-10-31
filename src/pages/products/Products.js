import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar.js";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";
import Input from "../../components/Input.js";
import CustomCheckbox from "./components/CustomCheckbox.js";
import CustomButton from "../../components/CustomButton.js";
import { useGetProductsswithFilerQuery } from "../../api/Api.js";
import Pagination from "../../components/Pagination.js";
import ModalAdd from "./components/ModalAdd.js";
import {putIsOpenModalEdit} from "../products/ProductsSlice.js";
import ModalEditProduct from "../../components/ModalEditProduct.js";
import InputSelect from "../../components/InputSelect.js";
import ProductItem from "./components/ProductItem.js";
import { useDispatch, useSelector } from "react-redux";

function Products() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCheckSortDate, setIsCheckSortDate] = useState(false);
  const [isCheckSortName, setIsCheckSortName] = useState(false);
  const [url, setUrl] = useState("");
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [trigger, setTrigger] = useState(false)
  const [dataDraw, setDataDraw] = useState('')
 

  //   const dispatch = useDispatch();

  const { data, error, isLoading, refetch } = useGetProductsswithFilerQuery({ request: url, trigger });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {modalEdit} = useSelector((state) => state.products)
  // параметры для фильтрации
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    marketplace: "",
    sortDateAdd: "По дате добавления",
    sortName: "",
    search: "",
  });

  // при загрузке страницы устанавливаем флаг для запроса списка категорий с сервера
  useEffect(() => {
    setDataDraw(data)
    setUrl("filter?")
  }, []);

  useEffect(() => {
    if(!modalEdit.isOpenModalEdit) {
      refetch()
    }
    console.log(88888, url)
  }, [modalEdit]);

 
 
  useEffect(() => {
    setTotalPages(data? data.page.totalPages : null);
    setCurrentPage(data?.page.number)
    setDataDraw(data)
    console.log(data?.page.totalPages)
    }, [data, trigger]);
    
const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "sortbydate") {
        setIsCheckSortDate(checked);
        setIsCheckSortName(false);
    } else if (name === "sortbyname") {
        setIsCheckSortName(checked);
        setIsCheckSortDate(false);
    }
  };

  // const handleCloseModalSave = () => {
  //   dispatch(putIsOpenModalEdit({isOpen: false, id: null}))
  //   setTrigger(true)
  // }

  // обработчик полей фильтра
  const onFilterChange = (e) => {
    console.log(e);
    let name;
    let value;
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = e.name;
      value = e.value;
    }
    console.log(name);
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter, [name]: value };
      console.log(updatedFilter);
      return updatedFilter;
    });
  };

  const onSubmit = () => {
    setTrigger(true)
    onGetProduct();
  }

  const handleRefetch = () => {
    // window.location.reload();

    refetch()
    console.log('reload')

  };

  // обработчик клика кнопки Выполнить -- формирование url для запроса
  const onGetProduct = () => {
    console.log(22, filter)
    let newUrl = `filter?`
      // .concat(currentPage ? `page=${currentPage}` : "")
      .concat(filter.size ? `&size=${filter.size}` : "")
      .concat(filter.minPrice ? `&minPrice=${filter.minPrice}` : "")
      .concat(filter.maxPrice ? `&maxPrice=${filter.maxPrice}` : "")
      .concat(filter.minQuantity ? `&minQuantity=${filter.minQuantity}` : "")
      .concat(filter.minQuantity ? `&maxQuantity=${filter.maxQuantity}` : "")
      .concat(filter.search ? `&search=${filter.search}` : "");
    setUrl(newUrl);
    setTrigger(false)
    console.log(111, newUrl)
  };

  // очищаем все фильтры
  const handleClear = () => {
    setFilter({
        minPrice: "",
        maxPrice: "",
        minQuantity: "",
        maxQuantity: "",
        marketplace: "",
        sortDateAdd: "По дате добавления",
        sortName: "",
        search: "",
        size: 6,
    });
  };

  // переключение между страницами
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    // обработчик клика на строку товара
    const handleClickItem = (id) => {
      navigate(`/product/${id}`);
    };

  const handleToggleModalAdd = useCallback((e) => {
    console.log(256)
    // handlePutCategory(e.target.parentNode.id)
    setIsModalAdd((prev) => !prev);
  }, []);
  const handleToggleModalEdit = (e) => {
    console.log(256)
    // handlePutCategory(e.target.parentNode.id)
    dispatch(putIsOpenModalEdit({isOpen: false, id: null}))
  };

  const isOpenModalEdit = (id) => {
    console.log('hi')
    dispatch(putIsOpenModalEdit({isOpen: true, id: id}))
  }
  
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
        <SideBar sx={{ flex: "0 0 23%" }}></SideBar>
        <Box sx={{ flexGrow: 1, flex: "1 1 77%", boxSizing: "border-box" }}>
          <Box
            sx={{
              backgroundColor: "rgba(246, 248, 249, 1)",
              padding: "37px",
              height: "100%",
              marginTop: "64px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                marginBottom: "22px",
                border: "1px solid rgba(255, 255, 255, 1)",
                borderRadius: "16px 16px 0 0", 
              }}
            >
              <Box
                sx={
                  {
                    //   padding: "24px",
                  }
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    marginBottom: "18px",
                    padding: "24px",
                    paddingBottom: "10px"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      height: "40px",
                      marginBottom: "19px",
                      
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: "700",
                          lineHeight: "32px",
                          marginBottom: "24px",
                        }}
                      >
                        Товары
                      </Typography>
                    </Box>
                    <Button
                        onClick={handleToggleModalAdd}
                      sx={{
                        width: "240px",
                        height: "40px",
                        border: "1px solid #21212133",
                        borderRadius: "16px",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#212121",
                        name: "add",
                        textTransform: "capitalize",
                        backgroundColor: "#F6F8F9",
                      }}
                    >
                      + Добавить товар
                    </Button>
                    <ModalAdd
                    close={handleToggleModalAdd}
                    open={isModalAdd}
                    modalCategory="Создание товара"
                  ></ModalAdd>
                  </Box>
                  <Input
                    size="100%"
                    title="Поиск"
                    position="start"
                    icon={<MyIconSearch />}
                    handleChange={onFilterChange}
                    backgroundColor="#F6F8F9"
                    type="text"
                    name="search"
                    value={filter.search}
                    height="36px"
                  ></Input>
                </Box>

                <Box
                  sx={{
                    
                    borderBottom: "1px solid #EBEBEB",
                    borderTop: "1px solid #EBEBEB",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 24px 0 24px"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "8px",
                      height: "55px",
                    }}
                  >
                    <Typography variant="main">Стоимость</Typography>
                    <Box sx={{ marginLeft: "8px" }}>
                      <Input
                        size="152px"
                        position="start"
                        icon="От:"
                        handleChange={onFilterChange}
                        type="number"
                        name="minPrice"
                        value={filter.minPrice}
                        height="36px"
                      ></Input>
                    </Box>
                    <Box sx={{ marginLeft: "8px" }}>
                      <Input
                        size="152px"
                        position="start"
                        icon="До:"
                        handleChange={onFilterChange}
                        type="number"
                        name="maxQuantity"
                        value={filter.maxQuantity}
                        height="36px"
                      ></Input>
                    </Box>
                    <Box sx={{ marginLeft: "2.5rem" }}>
                      <Typography variant="main">Количество товаров</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "8px" }}>
                      <Input
                        size="152px"
                        position="start"
                        icon="От:"
                        handleChange={onFilterChange}
                        type="number"
                        name="minQuantity"
                        value={filter.minQuantity}
                        height="36px"
                      ></Input>
                    </Box>
                    <Box sx={{ marginLeft: "8px" }}>
                      <Input
                        size="152px"
                        position="start"
                        icon="До:"
                        handleChange={onFilterChange}
                        type="number"
                        name="maxPrice"
                        value={filter.maxPrice}
                        height="36px"
                      ></Input>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "4px",
                        height: "59px"
                      }}
                    >
                      <Box>
                        <Typography variant="main">Маркетплейсы</Typography>
                      </Box>
                      <Box sx={{ marginLeft: "8px" }}>
                        <InputSelect
                          size="155px"
                          position="start"
                          icon="Все:"
                          handleChange={onFilterChange}
                          menuItems={[1, 2, 3]}
                          name="marketplace"
                          value={filter.marketplace}
                          height="36px"
                        ></InputSelect>
                      </Box>
                      <Box sx={{ marginLeft: "2.8rem" }}>
                        <Typography variant="main">
                          Сортировка товаров
                        </Typography>
                      </Box>
                      <CustomCheckbox
                        name="sortbydate"
                        text="По дате добавления"
                        isCheckSortDate={isCheckSortDate}
                        handleCheckboxChange={handleCheckboxChange}
                      ></CustomCheckbox>
                      <CustomCheckbox
                        name="sortbyname"
                        text="По названию"
                        isCheckSortName={isCheckSortName}
                        handleCheckboxChange={handleCheckboxChange}
                      ></CustomCheckbox>
                    </Box>
                  </Box>

                  <Box></Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "24px",
                    paddingTop: "15px",
                    marginBottom: "10px"
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleClear}
                    sx={{
                      backgroundColor: "transparent", // Отмена фона
                      color: "inherit", // Установка цвета текста по умолчанию
                      fontSize: "16px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      boxShadow: "none", // Убираем тень
                      "&:hover": {
                        backgroundColor: "transparent", // Убираем фон при наведении
                        color: "inherit", // Установка цвета текста по умолчанию
                        boxShadow: "none", // Убираем тень
                      },
                      border: "none", // Убираем рамку
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                  <CustomButton
                    size="125px"
                    height="40px"
                    text="Применить"
                    disabled={{ disabled: false }}
                    onSubmit={onSubmit}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                marginBottom: "20px",
                backgroundColor: "rgba(246, 248, 249, 1)",
                border: "1px solid rgba(255, 255, 255, 1)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            
            >{error && (
                <Typography sx={{ marginTop: "20px" }}>
                  Ошибка загрузки
                </Typography>
              )}
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : dataDraw? (
                dataDraw?.content.map((el) => (
                  <ProductItem
                  key={el.id}
                  id={el.id}
                  images={el.images}р
                  categoryName={el.category.name}
                  quantity={el.quantity}
                  title={el.title}
                  onClick={() => handleClickItem(el.id)}
                  isOpenModal={() => isOpenModalEdit(el.id)}
                  
                  />
                ))
              ): null}</Box>
          </Box>
          <Box>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              ></Pagination>
            </Box>
             <ModalEditProduct
          open={modalEdit.isOpenModalEdit}
          close={handleToggleModalEdit}
          sendRequest={onSubmit}
          refetch={handleRefetch}
          name="edit"
          id="id"
        ></ModalEditProduct>
        </Box>
      </Container>
    </>
  );
}

export default Products;
