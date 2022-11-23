import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import Home from '../../Pages/Home/Home'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h1 className="text-5xl">This is error page</h1>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
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