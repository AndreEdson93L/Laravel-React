import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import NewsList from "./views/NewsList.jsx";
import GuardiansNewsList from "./views/GuardiansNewsList.jsx";
import TechnologyNewsList from "./views/TechnologyNewList.jsx";
import ScienceNewsList from "./views/ScienceNewsList.jsx";
import SportNewsList from "./views/SportNewsList.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/news",
        element: <NewsList />,
      },
      {
        path: "/guardian-news",
        element: <GuardiansNewsList />,
      },
      {
        path: "/technology-news",
        element: <TechnologyNewsList />,
      },
      {
        path: "/science-news",
        element: <ScienceNewsList />,
      },
      {
        path: "/sport-news",
        element: <SportNewsList/>
      }      
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
