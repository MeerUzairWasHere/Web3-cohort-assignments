import React from "react";
import { Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    return redirect("/transaction");
  } catch (error) {
    console.log(error);
  }
};

const SignIn = () => (
  <div className="form-container">
    <h2>Sign In</h2>
    <Form method="post" action="/signin">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </Form>
  </div>
);

export default SignIn;
