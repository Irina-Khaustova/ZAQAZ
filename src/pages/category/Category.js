import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SideBar from "../../components/SideBar.js";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";
import Input from "../../components/Input.js";
import CategoryItem from "./components/CategoryItem.js";
import ModalEdit from "./components/ModalEdit.js";
import { useGetCategoryWithSubcategoryQuery } from "../../api/Api.js";
import ModalAdd from "./components/ModalAdd.js";
import { useDispatch } from "react-redux";
import { putcategory } from "./categorySlice.js";
import { useDeleteCategoryMutation } from "../../api/Api.js";
import RequestProgressModal from "../../components/RequestProgressModal.js";

function Category() {
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [url, setUrl] = useState("");
  const [isOpenRequestProgressModal, setisOpenRequestProgressModal] =
    useState(false);

  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  // const { data, error, isLoading } = useGetCategoryQuery(url);
  const { data, error, isLoading, refetch } =
    useGetCategoryWithSubcategoryQuery({ id: 26, url: url });
  const [
    deleteCategory,
    { isLoading: isDeleting, error: deleteError, isSuccess: isSuccessDelete },
  ] = useDeleteCategoryMutation();

  // при загрузке страницы устанавливаем флаг для запроса списка категорий с сервера
  useEffect(() => {
    dispatch(putcategory(null));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      if (searchValue === "") {
        setDataCategory(data.content);
      } else
        setDataCategory(
          data.content.filter(
            (el) =>
              el.name &&
              el.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
    }
  }, [data, searchValue]);

  useState(() => { 
    setUrl("page=0&size=500");
  }, []);

  // обработчик полей фильтра
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // const newUrl = `search?=${value}&orderNum=${id}`;
      // setUrl(newUrl);
    }, 300);
  };
  const handleToggleModalAdd = (e) => {
    setIsModalAdd((prev) => !prev);
  };

  const handlePutCategory = (category) => {
    // let newId = +id;
    // let filter = dataCategory?.filter((el) => el.id === newId);
    // console.log(filter)
    dispatch(putcategory(category));
  };

  const handleToggleModalEdit = useCallback((e) => {
    setIsModalEdit((prev) => !prev);
  }, []);

  const handleRefetch = () => {
    refetch();
  };

  const handleExitModalRequest = () => {
    setisOpenRequestProgressModal(false)
  }

  const handleClickButtonRepeat = () => {

  }

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
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
                marginBottom: "13px",
                border: "1px solid rgba(255, 255, 255, 1)",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <Box
                sx={{
                  padding: "24px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "40px",
                    marginBottom: "18px",
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
                      Категории
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
                    + Создать категорию
                  </Button>
                  <ModalAdd
                    close={handleToggleModalAdd}
                    open={isModalAdd}
                    modalCategory="Создание категории"
                    refetch={handleRefetch}
                  ></ModalAdd>
                </Box>
                <Input
                  size="100%"
                  title="Поиск"
                  position="start"
                  icon={<MyIconSearch />}
                  handleChange={onSearchChange}
                  backgroundColor="#F6F8F9"
                  type="text"
                  name="searchValue"
                  value={searchValue}
                ></Input>
              </Box>
            </Box>

            <Box
              sx={{
                marginBottom: "32px",
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
              ) : dataCategory ? (
                dataCategory.map((el) => (
                  <CategoryItem
                    key={el.id}
                    id={el.id}
                    images={el.images}
                    categoryName={el.name}
                    subcategory={el.subcategories}
                    onModalToggle={handleToggleModalEdit}
                    putCategory={() => handlePutCategory(el)}
                    deleteCategory={() => handleDeleteCategory(el.id)}
                    image={el.images[0]}
                    categoryType={"Category"}
                    // isModalEdit={isModalEdit}
                  />
                ))
              ) : null}
              {isModalEdit && (
                <ModalEdit
                  close={handleToggleModalEdit}
                  open={isModalEdit}
                  name="edit"
                  refetch={handleRefetch}
                  categoryType={"Category"}
                  // value={categoryName}
                />
              )}
            </Box>
          </Box>
        </Box>
        <RequestProgressModal
          handleClickButton={handleClickButtonRepeat}
          open={isOpenRequestProgressModal}
          close={handleExitModalRequest}
          error={deleteError ? deleteError : false}
          isLoading={isDeleting}
          isSuccess={isSuccessDelete && !deleteError}
        ></RequestProgressModal>
      </Container>
    </>
  );
}

export default Category;
