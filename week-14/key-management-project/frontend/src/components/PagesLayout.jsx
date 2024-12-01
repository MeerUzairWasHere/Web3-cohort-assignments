import {
  Outlet,
  useLoaderData,
  useNavigation,
  ScrollRestoration,
  redirect,
  Form,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    redirect("/transaction");
    return data;
  } catch (error) {
    return error;
  }
};

const myContext = createContext();

const PagesLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const { user, wallet } = useLoaderData();

  return (
    <myContext.Provider value={{ user, wallet }}>
      <header className="navbar">
        <h1>My App</h1>
        <nav>
          <ul>
            {!user ? (
              <li>
                <a href="/signin">Sign In</a>
              </li>
            ) : (
              <li>
                <Form method="post" action={`/logout`}>
                  <button type="submit">Logout</button>
                </Form>
              </li>
            )}

            {!user && (
              <li>
                <a href="/signup">Sign Up</a>
              </li>
            )}

            {user && (
              <li>
                <a href="/transaction">Transaction</a>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        {isPageLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="welcome-message">
              <h2>Welcome, {user?.name || "Guest"}!</h2>
              <p>Explore the app using the navigation bar above.</p>
            </div>
            <Outlet context={user} />
          </>
        )}
      </main>
      <ScrollRestoration />
    </myContext.Provider>
  );
};

export default PagesLayout;

export const useMyContext = () => useContext(myContext);
