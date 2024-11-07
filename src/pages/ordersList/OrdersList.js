import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SideBar from "../../components/SideBar";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";
import OrdersListItem from "../../components/OrderListItem";
import { useGetOrderswithFilerQuery } from "../../api/Api";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import formatedDate from "../../utils/formatedDate.js";
import DateInput from "../../components/DateInput.js";
import changeStatusOrder from "../../utils/changeStatusOrder.js";
import InputSelect from "../../components/InputSelect.js";

function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1); // выбранная страница
  const [totalPages, setTotalPages] = useState(0); // всего страниц
  const [url, setUrl] = useState("");

  // параметры для фильтрации
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    marketplace: "",
    startDate: "",
    endDate: "",
    searchWord: "",
    orderNum: "",
    size: 6,
  });

  const { data, error, isLoading } = useGetOrderswithFilerQuery(url);

  const navigate = useNavigate();

  // при загрузке страницы устанавливаем флаг для запроса списка заказов с сервера
  useEffect(() => {
    setTotalPages(null);
    setUrl(`filter?size=${filter.size}`);
  }, [filter]);

  // считаем количество страниц при получении списка заказов
  useEffect(() => {
    setTotalPages(data ? data.page.totalPages : null);
    setCurrentPage(data?.page.number);
  }, [data]);

  // обработчик полей фильтра
  const onFilterChange = (e) => {
    let name;
    let value;
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = e.name;
      value = e.value;
    }
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter, [name]: value };
      return updatedFilter;
    });
  };

  // обработчик клика кнопки Выполнить -- формирование url для запроса
  const onSubmit = () => {
    let newUrl = `filter?`
      // .concat(currentPage ? `page=${currentPage}` : "")
      .concat(filter.size ? `&size=${filter.size}` : "")
      .concat(filter.minPrice ? `&minPrice=${filter.minPrice}` : "")
      .concat(filter.maxPrice ? `&maxPrice=${filter.maxPrice}` : "")
      .concat(filter.startDate ? `&startDate=${filter.startDate}` : "")
      .concat(filter.searchWord ? `&searchWord=${filter.searchWord}` : "")
      .concat(filter.orderNum ? `&orderName=${filter.orderNum}` : "")
      .concat(filter.endDate ? `&endDate=${filter.endDate}` : "");
    setUrl(newUrl);
  };

  // обработчик клика на строку товара
  const handleClickItem = (id) => {
    navigate(`/order/${id}`);
  };

  // переключение между страницами
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // очищаем все фильтры
  const handleClear = () => {
    setFilter({
      minPrice: "",
      maxPrice: "",
      marketplace: "",
      startDate: "",
      endDate: null,
      searchString: "",
      size: 6,
    });
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
        <SideBar sx={{ flex: "0 0 23%" }}></SideBar>
        <Box maxWidth="77%" sx={{ flexGrow: 1, flex: "1 1 77%", boxSizing: "border-box" }}>
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
                marginBottom: "32px",
                border: "1px solid rgba(255, 255, 255, 1)",
                borderRadius: "16px",
              }}
            >
              <Box
                sx={{
                  padding: "24px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "700",
                    lineHeight: "32px",
                    marginBottom: "24px",
                  }}
                >
                  Заказы
                </Typography>
                <Input
                  size="100%"
                  title="Название поставщика/номер заказа"
                  position="start"
                  icon={<MyIconSearch />}
                  handleChange={onFilterChange}
                  backgroundColor="#F6F8F9"
                  type="text"
                  name="searchWord"
                  value={filter.searchWord || ""}
                ></Input>
              </Box>
              <Box
                sx={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(246, 248, 249, 1)",
                  padding: "17px 17px 17px 30px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "40%",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="main">Стоимость</Typography>
                  </Box>
                  <Box sx={{ marginLeft: "5px" }}>
                    <Input
                      size="152px"
                      position="start"
                      icon="От:"
                      handleChange={onFilterChange}
                      type="number"
                      name="minPrice"
                      value={filter.minPrice || ""}
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
                      value={filter.maxPrice || ""}
                    ></Input>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "41%",
                    alignItems: "center",
                    marginLeft: "50px",
                  }}
                >
                  <Box sx={{ marginLeft: "3px" }}>
                    <Typography variant="main">Маркетплейсы</Typography>
                  </Box>
                  <Box sx={{ marginLeft: "8px" }}>
                    <InputSelect
                      size="152px"
                      position="start"
                      icon="Все:"
                      handleChange={onFilterChange}
                      menuItems={[1, 2, 3]}
                      name="marketplace"
                      value={filter.marketplace || ""}
                    ></InputSelect>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                   
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography variant="main">Дата</Typography>
                  </Box>
                  <Box sx={{ marginLeft: "15px" }}>
                    <DateInput
                      size="152px"
                      onChange={onFilterChange}
                      name="endDate"
                      value={filter.endDate || ""}
                    ></DateInput>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "18px",
                  paddingRight: "22px",
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
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                marginBottom: "32px",
                padding: "0 36px 0 24px",
                border: "1px solid rgba(255, 255, 255, 1)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              <OrdersListItem
                number="№ заказа"
                supplierName="Название поставщика"
                orderDate="Дата заказа"
                price="Стоимость"
                marketplace="Маркетплейс"
                status="Статус"
                fontSize="maintexttytle"
              ></OrdersListItem>
              {error && (
                <Typography sx={{ marginTop: "20px" }}>
                  Ошибка загрузки
                </Typography>
              )}
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                data?.content.map((el) => (
                  <OrdersListItem
                    key={el.id}
                    id={el.id}
                    number={el.orderNum}
                    supplierName={el.supplierName}
                    orderDate={formatedDate(el.orderDate)}
                    price={el.cost}
                    marketplace={el.marketplace}
                    status={changeStatusOrder(el.status)} // рисуем разноцветные иконки в зависимости от статуса
                    onClick={() => handleClickItem(el.id)}
                  />
                ))
              )}
            </Box>
            <Box>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              ></Pagination>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default OrdersList;
