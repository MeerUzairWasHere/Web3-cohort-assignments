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
import { action as logoutAction } from "./components/SignOut";
import { action as signInAction } from "./components/SignIn";
import { action as signUpAction } from "./components/SignUp";
// import { action as transactionAction } from "./components/Transaction";

// Loader and action for Sign In

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
        // action: transactionAction,
      },
      { path: "/logout", action: logoutAction },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
