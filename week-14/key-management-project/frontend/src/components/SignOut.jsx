import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const action = async () => {
  try {
    await customFetch.delete("/auth/logout");
  } catch (error) {
    console.log(error);
  }
  return redirect("/signin");
};
