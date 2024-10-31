import Authorization from '../pages/authorization/Authorization';
import Order from '../pages/order/Order';
import OrdersList from '../pages/ordersList/OrdersList';
import Category from '../pages/category/Category';
import SubCategory from "../pages/subcategory/Subcategory";
import Products from '../pages/products/Products';
import Product from "../pages/product/Product"

const routes = [
  {
    path: '/', // Стартовая страница
    component: Authorization,
    exact: true,
  },
  {
    path: '/ordersList', // Страница заказов
    component: OrdersList,
    exact: true,
  },
  // {
  //   path: '/authorization', // Страница деталей заказа
  //   component: Authorization,
  // },
  {
    path: '/order/:id', // Страница деталей заказа
    component: Order,
  },
  {
    path: '/category', // Страница деталей заказа
    component: Category,
  },
  {
    path: '/subcategory/:id', // Страница деталей заказа
    component: SubCategory,
  },
  {
    path: '/products', // Страница деталей заказа
    component: Products,
  },
  {
    path: '/product/:id', // Страница деталей заказа
    component: Product,
  },
];

export default routes;