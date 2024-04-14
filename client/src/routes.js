import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    SHOES_ROUTE,
    LOGIN_ROUTE,
    ORDER_PAGE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import ShoesPage from "./pages/ShoesPage";
import OrderPage from "./pages/OrderPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDER_PAGE_ROUTE,
        Component: OrderPage
    }
]

export const publicRoutes = [
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