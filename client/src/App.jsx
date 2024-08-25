import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
import ErrorElement from "./components/ErrorElement";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 5000 * 60
    }
  }
})

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
        action: loginAction(queryClient)
      },
      {
        path:'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children:[
          {
            index:true,
            element:<AllClasses />,
            loader: allClassesLoader(queryClient),
            errorElement: <ErrorElement />
          },
          {
            path:'stats',
            element:<Stats />,
            loader: statsLoader(queryClient),
            errorElement:<ErrorElement />
          },
          {
            path:'add-class',
            element:<AddClass />,
            action:addClassAction(queryClient)
          },
          {
            path:'profile',
            element:<Profile />,
            action: updateProfileAction(queryClient)
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
            action:editClassAction(queryClient)
          },
          {
            path:'delete-class/:id',
            action:deleteClassAction(queryClient)
          }
        ]
      },
    ]
  },

])

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
 