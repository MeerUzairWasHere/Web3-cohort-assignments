import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Transaction from "./components/Transaction";
import PagesLayout from "./components/PagesLayout";

import { loader as PagesLayoutLoader } from "./components/PagesLayout";
import customFetch from "./utils/customFetch";

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    console.log("User registered");
    return redirect("/signin");
  } catch (error) {
    console.log(error);
    return redirect("/signin");
  }
};

// Loader and action for Sign In
const signInAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    console.log("User logged in");
    return redirect("/transaction");
  } catch (error) {
    console.log(error);
    return redirect("/signin");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PagesLayout />,
    loader: PagesLayoutLoader,
    children: [
      { path: "/signup", element: <SignUp />, action: signUpAction },
      { path: "/signin", element: <SignIn />, action: signInAction },
      {
        path: "/transaction",
        element: <Transaction />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
