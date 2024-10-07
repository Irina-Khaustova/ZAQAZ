import Authorization from '../pages/authorization/Authorization';
import Main from '../pages/main';
import OrdersList from '../pages/ordersList/OrdersList';

const routes = [
  {
    path: '/', // Главная страница
    component: Main,
    exact: true,
  },
  {
    path: '/ordersList', // Страница заказов
    component: OrdersList,
    exact: true,
  },
  {
    path: '/authorization', // Страница деталей заказа
    component: Authorization,
  },
  
];

export default routes;