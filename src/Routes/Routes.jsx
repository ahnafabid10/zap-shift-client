import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register.jsx/Register";
import PrivateRoutes from "../Routes/PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/DashBoard/PaymentCancelled/PaymentCancelled";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            path:'/',
            Component: Home
        },
        {
          path:'/rider',
          element: <PrivateRoutes><Rider></Rider></PrivateRoutes>
        },
        {
          path: '/sendParcel',
          element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
          loader: () => fetch('/warehouses.json').then(res=>res.json())
        },
        {
          path:'/coverage',
          element: <Coverage></Coverage>,
          loader: () => fetch('/warehouses.json').then(res=>res.json())
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        index: true,
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      }
    ]
  },
  
]);