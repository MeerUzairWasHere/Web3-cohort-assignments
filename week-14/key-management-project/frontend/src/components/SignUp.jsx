import React from "react";
import { Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    console.log("User registered");
    redirect("/signin");
  } catch (error) {
    console.log(error);
  }
};

const SignUp = () => (
  <div className="form-container">
    <h2>Sign Up</h2>
    <Form method="post" action="/signup">
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </Form>
  </div>
);

export default SignUp;
