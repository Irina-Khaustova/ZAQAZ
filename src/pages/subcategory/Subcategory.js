import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SideBar from "../../components/SideBar.js";
import { ReactComponent as MyIconSearch } from "../../image/search.svg";
import Input from "../../components/Input.js";
import { useGetSubCategoryByIdQuery } from "../../api/Api.js";
import { useParams } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack.js";
import { useSelector } from "react-redux";
import CategoryItem from "../category/components/CategoryItem.js";
import ModalAdd from "../category/components/ModalAdd.js";
import ModalEdit from "../category/components/ModalEdit.js";
import { putSubcategory } from "./subcategorySlice.js";
import { useDispatch } from "react-redux";

function SubCategory() {
  // eslint-disable-next-line
  const [idValue, setIdValue] = useState(0);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [subcategory, setSubcategory] = useState('');
  const [url, setUrl] = useState("");

  const {id} = useParams();
  const dispatch = useDispatch();
  
  // параметры для фильтрации
  const [searchValue, setSearchValue] = useState();

  const { data, error, isLoading, refetch} = useGetSubCategoryByIdQuery({id: id, url: url});
  const { category } = useSelector((state) => state.category);

  // const navigate = useNavigate();

  // при загрузке страницы устанавливаем флаг для запроса списка категорий с сервера
  useEffect(() => {
    console.log(category)
    setSubcategory(category? category.name: null);
  }, [category]);

  useEffect(() => {
    
  }, []);
 

  // обработчик полей фильтра
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

// переключение состояний модальных окон
const handleToggleModalAdd = (e) => {
  setIsModalAdd((prev) => !prev);
};

const handleRefetch = () => {
  refetch();
};

const handleToggleModalEdit = (e) => {
  setIsModalEdit((prev) => !prev);
};

const handlePutSubcategory = (subcategory) => {
  console.log('what?')
  dispatch(putSubcategory(subcategory));
};
  
  // обработчик клика кнопки Выполнить -- формирование url для запроса
  const handleAddCategory = () => {;
  setIsModalAdd((prev) => !prev);
  }
  // очищаем все фильтры
  // const handleClear = () => {};

console.log(data)

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
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                marginBottom: "32px",
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
                    marginBottom: "24px",
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
                       {`Подкатегории/${subcategory}`}
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleAddCategory}
                    sx={{
                      width: "240px",
                      height: "40px",
                      border: "1px solid #21212133",
                      borderRadius: "16px",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#212121",
                      textTransform: "capitalize",
                      backgroundColor: "#F6F8F9"
                    }}
                  >
                    + Создать  подкатегорию
                  </Button>
                  <ModalAdd
                    close={handleToggleModalAdd}
                    open={isModalAdd}
                    modalCategory="Создание подкатегории"
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
              ) : (
              data && data.content.map((el) => (
                <CategoryItem
                  key={el.id}
                  id={el.id}
                  images={el.images}
                  categoryName={el.name}
                  subcategory={el.subcategory}
                  onModalToggle={handleToggleModalEdit}
                  isModalAdd={isModalAdd}
                  isModalEdit={isModalEdit}
                  categoryType={"SubCategory"}
                  putSubcategory={() => handlePutSubcategory(el)}
                  />
                ))
              )}
            </Box>
            {isModalEdit && (
                <ModalEdit
                  close={handleToggleModalEdit}
                  open={isModalEdit}
                  name="edit"
                  refetch={handleRefetch}
                  categoryType={"SubCategory"}
                  // value={categoryName}
                />
              )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SubCategory;
