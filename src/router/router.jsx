import { createBrowserRouter } from "react-router-dom";
import App from "../App"; 
import ProtectedRoute from "../components/ProtectedRoute"; 

// Page Imports (Using flat structure paths)
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
    element: <App />, // App.jsx provides the Header/Footer layout
    errorElement: <NotFound />, 
    children: [
      // Public Routes
      { index: true, element: <Home /> }, // index:true makes this the default child route for "/"
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "browse", element: <BrowsePublicHabits /> },

      // Private/Protected Routes
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
      
      // Error/404 handling within the layout
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> }, // Catch-all for undefined routes
    ],
  },
]);

export default router;