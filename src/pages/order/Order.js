import React, { useEffect, useState, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import SideBar from "../../components/SideBar";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";
import Input from "../../components/Input";
import {
  useGetOrderQuery,
  useGetOrderswithFilerQuery,
  usePutStatusProductMutation,
} from "../../api/Api";
import Pagination from "../../components/Pagination";
import { useParams } from "react-router-dom";
import OrderItem from "./components/OrderItem";
import formatedDate from "../../utils/formatedDate";
import { ReactComponent as MyIconCoolicon } from "../../image/coolicon.svg";
import InputSelect from "../../components/InputSelect";
import ButtonBack from "../../components/ButtonBack";

function Order() {
  const [currentPage, setCurrentPage] = useState(1); // выбранная страница
  const [totalPages, setTotalPages] = useState(null); // всего страниц
  const [inputSearchValue, setInputSearchValue] = useState(""); // Состояние для хранения значения
  const [inputSelectValue, setInputSelectValue] = useState(""); // Состояние для хранения значения
  const [url, setUrl] = useState(""); //  url для запроса с фильтром
  const [statusProduct, setStatusProduct] = useState(""); // Состояние для хранения статуса для отправки на сервер
  const [isUpdateStatus, setIsUpdateStatus] = useState(false); // Флаг для отправки статуса продукта
  const [dataDraw, setDataDraw] = useState(null); // данные для отображения 

  const titleOrderItems = [
    "Название товара",
    "Поставщик",
    "Количество, шт",
    "Цена, тг",
    "Статус",
  ];
  const titleOrder = [
    "Название поставщика",
    "Стоимость, ТГ",
    "Дата заказа",
    "Маркетплейс",
    "Статус",
  ];

  const { id } = useParams();
  const timeoutRef = useRef(null);
  

  const { data, error, isLoading } = useGetOrderQuery(id);
  const { dataFilter, errorFilter, isLoadingFilter } =
    useGetOrderswithFilerQuery(url);
  const [putStatusProduct] = usePutStatusProductMutation(statusProduct);

  useEffect(() => {
    if (isUpdateStatus) {
      onStatusChange();
    }
    setIsUpdateStatus(false);
  }, [statusProduct, isUpdateStatus]);

  const onStatusChange = async () => {
    try {
     await putStatusProduct({
        statusProduct: statusProduct,
        id: id,
      }).unwrap();
      alert("Успешно");
    } catch (err) {
      console.log(err);
      alert(err.data);
    }
  };

  useEffect(() => {
    setTotalPages(null);
  }, []);

  useEffect(() => {
    setDataDraw(data? data : dataFilter? dataFilter: null);
    setTotalPages(Math.ceil(data?.orderItems.length / 6));
    setCurrentPage(1);
    console.log(555, data)
  }, [data, dataFilter]);

  useEffect(() => {
    setTotalPages(Math.ceil(dataFilter?.orderItems.length / 6));
    setCurrentPage(1);
  }, [dataFilter]);

  const handleInputSearchChange = (e) => {
    setInputSearchValue(e.target.value);
    const value = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const newUrl = `search?sort=${value}&orderNum=${id}`;
      setUrl(newUrl);
    }, 300);
  };

  // обработчик полей фильтра
  const handleInputSelectChange = (e) => {
    setInputSelectValue(e.target.value);
    const value = e.target.value;
    setInputSelectValue(value);
  };

  const handleStatusChange = (status) => {
    setIsUpdateStatus(true);
    setStatusProduct(status);
  };

  // считаем количество страниц при получении списка заказов
  useEffect(() => {
    const total = data ? Math.ceil(data.orderItems.length / 6) : null;
    setTotalPages(total);
  }, [data]);

  // переключение между страницами
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Container
        disableGutters
        maxWidth="1920"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <SideBar sx={{ flex: "0 0 23%" }}></SideBar>
        <Box sx={{ flexGrow: 1, flex: "1 1 77%", boxSizing: "border-box" }}>
          <Box
            sx={{
              backgroundColor: "rgba(246, 248, 249, 1)",
              padding: "39px",
              height: "100%",
              marginTop: "64px",
              paddingTop: "25px",
            }}
          >
            <ButtonBack></ButtonBack>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                marginBottom: "24px",
                height: "172px",
                border: "1px solid rgba(255, 255, 255, 1)",
                borderRadius: "16px",
                paddingRight: "24px",
              }}
            >
              <Box
                sx={{
                  padding: "23px",
                  boxSizing: "border-box",
                  width: "100%",
                  paddingTop: "34px",
                  paddingBottom: "0",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "700",
                    lineHeight: "32px",
                    marginBottom: "21px",
                  }}
                >
                  Заказ {id}
                </Typography>
              </Box>
              <Box sx={{ boxSizing: "border-box" }}>
                <OrderItem
                  columnOne={titleOrder[0]}
                  columnTwo={titleOrder[1]}
                  columnThree={titleOrder[2]}
                  columnFour={titleOrder[3]}
                  columnFive={titleOrder[4]}
                  columnOneText={data ? data.supplierName : "--"}
                  columnTwoText={data ? data.cost : "--"}
                  columnThreeText={data ? formatedDate(data.orderDate) : "--"}
                  columnFourText={data ? data.marketplace : "--"}
                  columnFiveText={data ? data.status : "--"}
                  title16
                  border
                ></OrderItem>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                marginBottom: "32px",
                border: "1px solid rgba(255, 255, 255, 1)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              <Box
                sx={{
                  marginTop: "25px",
                  marginLeft: "23px",
                }}
              >
                <Typography variant="text24Bold">
                  Список товаров заказа
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  padding: "26px 21px 22px 24px",
                }}
              >
                <Input
                  size="70%"
                  title="Название поставщика/номер заказа"
                  position="start"
                  value={inputSearchValue}
                  icon={<MyIconSearch />}
                  handleChange={handleInputSearchChange}
                  backgroundColor="#F6F8F9"
                ></Input>
                <InputSelect
                  size="27%"
                  title="Sort by:"
                  position="start"
                  value={inputSelectValue}
                  icon={<MyIconCoolicon />}
                  menuItems={["Поставщик 1", "Поставщик 2", "Поставщик 3"]}
                  handleChange={handleInputSelectChange}
                  sort
                  color="#F6F8F9"
                ></InputSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #EBEBEB",
                  height: "48px",
                  marginTop: "5px",
                  paddingTop: "20px",
                  boxSizing: "border-box",
                }}
              >
                <OrderItem
                  columnOne={titleOrderItems[0]}
                  columnTwo={titleOrderItems[1]}
                  columnThree={titleOrderItems[2]}
                  columnFour={titleOrderItems[3]}
                  columnFive={titleOrderItems[4]}
                  title18
                ></OrderItem>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  marginTop: "20px",
                  "& > *": {
                    borderTop: "1px solid #EBEBEB",
                    height: "64px",
                  },
                }}
              >
                {error && <Typography>Ошибка загрузки данных</Typography>}
                {errorFilter && <Typography>Ошибка загрузки данных</Typography>}
                {isLoading || isLoadingFilter? (
                  <p>Loading...</p>
                ) : dataDraw?.orderItems?.length ? (
                  dataDraw.orderItems.map((el) => (
                    <OrderItem
                      key={el.item.id}
                      columnOne={el.item.title}
                      columnTwo={el.item.category.store.title}
                      columnThree={el.quantity}
                      columnFour={el.item.price}
                      columnFive={el.status}
                      statusChange={handleStatusChange}
                    />
                  ))
                ) : null}
              </Box>
            </Box>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></Pagination>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Order;
