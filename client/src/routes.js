import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    SHOES_ROUTE,
    LOGIN_ROUTE,
    ORDER_PAGE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE, ERROR_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import ShoesPage from "./pages/ShoesPage";
import OrderPage from "./pages/OrderPage";
import ErrorPage from "./pages/ErrorPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE + '/:id',
        Component: Admin
    },
    {
        path: ORDER_PAGE_ROUTE,
        Component: OrderPage
    },
    {
        path: ORDER_PAGE_ROUTE + '/:id',
        Component: OrderPage
    },
    {
        path: ORDER_PAGE_ROUTE + '/:id' + '/update',
        Component: OrderPage
    }

]

export const publicRoutes = [
    {
        path: ERROR_ROUTE,
        Component: ErrorPage
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SHOES_ROUTE + '/:id',
        Component: ShoesPage
    },

]