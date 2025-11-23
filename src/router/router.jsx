import { createBrowserRouter } from "react-router-dom";
import App from "../App"; 
import ProtectedRoute from "../components/ProtectedRoute"; 


import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BrowsePublicHabits from "../pages/BrowsePublicHabits";
import NotFound from "../pages/NotFound";
import AddHabit from "../pages/AddHabit";
import MyHabits from "../pages/MyHabits";
import HabitDetails from "../pages/HabitDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement: <NotFound />, 
    children: [
      
      { index: true, element: <Home /> }, 
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "browse", element: <BrowsePublicHabits /> },

      
      {
        path: "add-habit",
        element: <ProtectedRoute><AddHabit /></ProtectedRoute>,
      },
      {
        path: "my-habits",
        element: <ProtectedRoute><MyHabits /></ProtectedRoute>,
      },
      {
        path: "habit/:id",
        element: <ProtectedRoute><HabitDetails /></ProtectedRoute>,
      },
      
      
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> }, 
    ],
  },
]);

export default router;