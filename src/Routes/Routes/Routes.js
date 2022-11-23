import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import Home from '../../Pages/Home/Home'
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h1 className="text-5xl">This is error page</h1>,
        children: [
            {
                path: '/',
                element: <Home></Home>
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
        ]

    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "/dashboard",
                element: <MyOrders></MyOrders>
            }
        ]
    }
])

export default router