import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddClass,
  Stats,
  AllClasses,
  Profile,
  Admin,
  SingleClass,
  EditClass,
} from './pages'

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { action as addClassAction } from "./pages/AddClass";
import { loader as allClassesLoader } from './pages/AllClasses'
import { loader as singleClassLoader } from './pages/SingleClass'
import { loader as editClassLoader } from './pages/EditClass'
import { action as editClassAction } from './pages/EditClass'
import { action as deleteClassAction } from './pages/DeleteClass'
import { loader as adminLoader } from './pages/Admin'
import { action as updateProfileAction } from './pages/Profile'
import { loader as statsLoader } from './pages/Stats'

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index:true,
        element: <Landing />
      },
      {
        path:'register',
        element: <Register />,
        action: registerAction
      },
      {
        path:'login',
        element: <Login />,
        action: loginAction
      },
      {
        path:'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children:[
          {
            index:true,
            element:<AllClasses />,
            loader: allClassesLoader
          },
          {
            path:'stats',
            element:<Stats />,
            loader: statsLoader
          },
          {
            path:'add-class',
            element:<AddClass />,
            action:addClassAction
          },
          {
            path:'profile',
            element:<Profile />,
            action: updateProfileAction
          },
          {
            path:'admin',
            element:<Admin />,
            loader: adminLoader
          },
          {
            path:'single-class/:id',
            element:<SingleClass />,
            loader: singleClassLoader
          },
          {
            path:'edit-class/:id',
            element:<EditClass />,
            loader:editClassLoader,
            action:editClassAction
          },
          {
            path:'delete-class/:id',
            action:deleteClassAction
          }
        ]
      },
    ]
  },

])

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
 