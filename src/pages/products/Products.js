import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar.js";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";
import Input from "../../components/Input.js";
import CustomCheckbox from "./components/CustomCheckbox.js";
import CustomButton from "../../components/CustomButton.js";
import { useGetProductsswithFilerQuery } from "../../api/Api.js";
import Pagination from "../../components/Pagination.js";
import ModalAdd from "./components/ModalAdd.js";
import { putIsOpenModalEdit } from "../products/ProductsSlice.js";
import ModalEditProduct from "../../components/ModalEditProduct.js";
import InputSelect from "../../components/InputSelect.js";
import { useDispatch, useSelector } from "react-redux";
const LazyProductItem = lazy(() => import("./components/ProductItem.js"));

function Products() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCheckSortDate, setIsCheckSortDate] = useState(false);
  const [isCheckSortName, setIsCheckSortName] = useState(false);
  const [url, setUrl] = useState("filter?size=8");
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [dataDraw, setDataDraw] = useState("");
  
  //   const dispatch = useDispatch();

  const { data, error, isLoading, refetch } = useGetProductsswithFilerQuery({
    request: url,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modalEdit } = useSelector((state) => state.products);
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

  useEffect(() => {
    setTotalPages(data ? data.page.totalPages : null);
    setCurrentPage(data?.page.number);
    setDataDraw(data);
    console.log(data?.page.totalPages);
  }, [data]);

  useEffect(() => {
    onSubmit()
  },[currentPage])

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
      console.log(4848, updatedFilter);
      return updatedFilter;
    });
  };

  const onSubmit = () => {
    console.log(4545, filter.search);
    let nUrl = `filter?size=8`
      .concat(currentPage ? `&page=${currentPage}` : "")
      .concat(filter.size ? `&size=${filter.size}` : "")
      .concat(filter.minPrice ? `&minPrice=${filter.minPrice}` : "")
      .concat(filter.maxPrice ? `&maxPrice=${filter.maxPrice}` : "")
      .concat(filter.minQuantity ? `&minQuantity=${filter.minQuantity}` : "")
      .concat(filter.maxQuantity ? `&maxQuantity=${filter.maxQuantity}` : "")
      .concat(isCheckSortDate ? "&sortBy=date" : "")
      .concat(isCheckSortName ? "&sortBy=name" : "")
      .concat(filter.search ? `&search=${filter.search}` : "");
    setUrl(nUrl);
  };

  const onhandleClickDelete = () => {};

  const handleRefetch = () => {
    // window.location.reload();
    refetch();

    console.log("reload");
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
    setCurrentPage(0);
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
    console.log(256);
    // handlePutCategory(e.target.parentNode.id)
    setIsModalAdd((prev) => !prev);
  }, []);
  const handleToggleModalEdit = (e) => {
    console.log(256);
    // handlePutCategory(e.target.parentNode.id)
    dispatch(putIsOpenModalEdit({ isOpen: false, id: null }));
  };

  const isOpenModalEdit = (id) => {
    console.log("hi");
    dispatch(putIsOpenModalEdit({ isOpen: true, id: id }));
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
          height: "100%",
        }}
      >
        <SideBar sx={{ flex: "0 0 23%" }}></SideBar>
        <Box sx={{ flexGrow: 1, flex: "1 1 77%", boxSizing: "border-box" }}>
          <Box
            sx={{
              backgroundColor: "rgba(246, 248, 249, 1)",
              padding: "37px",
              // height: "100%",
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
                    paddingBottom: "10px",
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
                      refetch={handleRefetch}
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
                    padding: "0 24px 0 24px",
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
                        height: "59px",
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
                    marginBottom: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleClear}
                    sx={{
                      backgroundColor: "transparent",
                      color: "inherit",
                      fontSize: "16px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "inherit",
                        boxShadow: "none",
                      },
                      border: "none",
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
            >
              {error && (
                <Typography sx={{ marginTop: "20px" }}>
                  Ошибка загрузки
                </Typography>
              )}
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : dataDraw ? (
                dataDraw?.content.map((el, index) => (
                  <Suspense key={index} fallback={<div>Загрузка...</div>}>
                  <LazyProductItem
                    key={`${el.id}-${index}`}
                    id={el.id}
                    images={el.images}
                    categoryName={el.category?.name}
                    quantity={el.quantity}
                    title={el.title}
                    onClick={() => handleClickItem(el.id)}
                    isOpenModal={() => isOpenModalEdit(el.id)}
                  />
                  </Suspense>
                ))
              ) : null}
            </Box>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></Pagination>
          </Box>
          <Box>
          </Box>
          <ModalEditProduct
            open={modalEdit.isOpenModalEdit}
            close={handleToggleModalEdit}
            sendRequest={onSubmit}
            refetch={handleRefetch}
            onhandleClickDelete={onhandleClickDelete}
            name="edit"
            id="id"
          ></ModalEditProduct>
        </Box>
      </Container>
    </>
  );
}

export default Products;
