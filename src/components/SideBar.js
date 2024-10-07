import React from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { ReactComponent as MyIconZaqaz } from "../image/zaqaz.svg"; 
import { ReactComponent as MyIconGoods } from "../image/goods.svg";
import { ReactComponent as MyIconOrders } from "../image/orders.svg";
import { ReactComponent as MyIconCategory } from "../image/category.svg";
import  {useLocation, NavLink}  from "react-router-dom";

function SideBar() {

  const location = useLocation(); // Получаем текущий URL

  const menuItems = [
    { text: 'Home', icon: <MyIconCategory />, link: '/category' },
    { text: 'Orders', icon: <MyIconOrders />, link: '/ordersList' },
    { text: 'Products', icon: <MyIconGoods />, link: '/goods' },
  ];


  return (
    <>
      <Container
        disableGutters
        maxWidth="false"
        sx={{
          width: "23%",
          margin: "0",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "25px",
          display: "flex",
          
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <MyIconZaqaz
            style={{ width: "102px", height: "28px", marginBottom: "52px" }}
          />
        
    <List sx={{marginLeft: "0", marginRight: "0", width: "100%"}}>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          component={NavLink}
          to={item.link}
          sx={{
            paddingLeft: "10px",
            marginBottom: "8px",
            borderRadius: "16px",
            flexGrow: "1",
            backgroundColor: location.pathname === item.link ? 'rgba(246, 248, 249, 1)' : 'inherit',
            border: location.pathname === item.link ? '1px solid rgba(246, 248, 249, 1)' : 'none',
            '&:hover': {
              backgroundColor: 'lightgray',
              border: "1px solid rgba(246, 248, 249, 1)",
              borderRadius: "16px",
            },
            
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              sx: { fontWeight: location.pathname === item.link ? 'bold' : 'normal', width: "100%", display: "block" },
              style: { fontWeight: "600", fontSize: "16px", color: "rgba(33, 33, 33, 1)" },
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
      </Container>
    </>
  );
}

export default SideBar;
