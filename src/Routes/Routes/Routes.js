import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from '../../Pages/Home/Home'
import Login from "../../Pages/Login/Login";
import Products from "../../Pages/Products/Products";
import Registration from "../../Pages/Registration/Registration";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => axios.get('https://easy-buy-server.vercel.app/advertisedProduct')
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/products/:id',
                element: <PrivateRoute>  <Products></Products>   </PrivateRoute>,
                loader: ({ params }) => fetch(`https://easy-buy-server.vercel.app/categories/${params.id}`)
            },
        ]

    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/dashboard",
                element: <PrivateRoute> <MyOrders></MyOrders> </PrivateRoute>
            },
            {
                path: "/dashboard/addproduct",
                element: <SellerRoute> <AddProduct></AddProduct> </SellerRoute>
            },
            {
                path: "/dashboard/myproducts",
                element: <SellerRoute> <MyProducts></MyProducts> </SellerRoute>
            },
            {
                path: "/dashboard/allseller",
                element: <AdminRoute> <AllSellers></AllSellers>  </AdminRoute>,

            },
            {
                path: "/dashboard/allbuyer",
                element: <AdminRoute> <AllBuyers></AllBuyers> </AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://easy-buy-server.vercel.app/singleBookingProduct/${params.id}`)
            }
        ]
    }
])

export default router