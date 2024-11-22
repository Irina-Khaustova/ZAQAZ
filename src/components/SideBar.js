import React, {useState} from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton
} from "@mui/material";
import { ReactComponent as MyIconZaqaz } from "../image/zaqaz.svg";
import { ReactComponent as MyIconGoods } from "../image/goods.svg";
import { ReactComponent as MyIconOrders } from "../image/orders.svg";
import { ReactComponent as MyIconCategory } from "../image/category.svg";
import { useLocation, NavLink } from "react-router-dom";
import ModalChoiceStoreHouse from "./ModalChoiceStoreHouse";
import {ReactComponent as MyIconArrawRight} from "../image/icon-arraw-left-sidebar.svg"
import { useSelector } from "react-redux";

function SideBar() {
  const location = useLocation(); // Получаем текущий URL
  const [isOpenModalChoiceStoreHouse, setIsOpenModalChoiceStoreHouse] = useState(false);
  const {storeHouse} = useSelector(state => state.sideBar);

  const menuItems = [
    {
      text: "Категории/подкатегории",
      icon: <MyIconCategory />,
      link: "/category",
    },
    { text: "Заказы", icon: <MyIconOrders />, link: "/ordersList" },
    { text: "Товары", icon: <MyIconGoods />, link: "/products" },
  ];

  const onClose = () => {
    setIsOpenModalChoiceStoreHouse(false);
  }

  const handleClick = () => {
  setIsOpenModalChoiceStoreHouse(true)
  }

  return (
    <>
      <Container
        disableGutters
        maxWidth="false"
        sx={{
          flex: "0 0 23%",
          height: "auto",
          maxWidth: "none",
          paddingLeft: "28px",
          paddingRight: "20px",
          paddingTop: "26px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            justifyContent: "flex-start"
          }}
        >
          <Box>
            <MyIconZaqaz style={{ width: "102px", marginLeft: "10px" }} />
          </Box>

          <List sx={{ width: "100%", marginTop: "36px" }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={NavLink}
                to={item.link}
                sx={{
                  paddingLeft: "15px",
                  marginBottom: "3px",
                  borderRadius: "16px",
                  flexGrow: "1",
                  backgroundColor:
                  (location.pathname === item.link || 
                    (item.link === '/category' && location.pathname.startsWith('/subcategory')))
                     ? "rgba(246, 248, 249, 1)"
                     : "inherit",
           

                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: "lightgray",
                    border: "1px solid rgba(246, 248, 249, 1)",
                    borderRadius: "16px",
                  },
                  "&:active": {
                    backgroundColor: "lightgray",
                    border: "1px solid rgba(246, 248, 249, 1)",
                    borderRadius: "16px",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "inherit",
                    color: "rgba(33, 33, 33, 1)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight:
                        location.pathname === item.link ? "bold" : "normal",
                      width: "100%",
                      display: "block",
                    },
                    style: {
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "rgba(33, 33, 33, 1)",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
          {/* <List>
            <ListItem component={Link} to="/category">
              <ListItemIcon>
                <MyIconCategory />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "rgba(33, 33, 33, 1)" }}
                primaryTypographyProps={{
                  style: { fontWeight: "600", fontSize: "16px" },
                }}
                primary="Категории/подкатегории"
              />
            </ListItem>

            <ListItem component={Link} to="/ordersList">
              <ListItemIcon>
                <MyIconOrders />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "rgba(33, 33, 33, 1)" }}
                primaryTypographyProps={{
                  style: { fontWeight: "600", fontSize: "16px" },
                }}
                primary="Заказы"
              />
            </ListItem>

            <ListItem component={Link} to="/goods">
              <ListItemIcon>
                <MyIconGoods />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "rgba(33, 33, 33, 1)" }}
                primaryTypographyProps={{
                  style: { fontWeight: "600", fontSize: "16px" },
                }}
                primary="Товары"
              />
            </ListItem>
          </List> */}
          
        </Box>
        {/* <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px"}}>
        <Typography variant="text14Medium" >{storeHouse? storeHouse: null}</Typography>
          <Typography variant="text14Medium">Выберите склад</Typography>
          <IconButton
            variant="text"
            onClick={handleClick}
            sx={{ marginLeft: "10px" }}
          >
            <MyIconArrawRight width={"8px"} />
            
          </IconButton>
        </Box> */}
        <ModalChoiceStoreHouse open={isOpenModalChoiceStoreHouse} close={onClose}></ModalChoiceStoreHouse>
      </Container>
    </>
  );
}

export default SideBar;
