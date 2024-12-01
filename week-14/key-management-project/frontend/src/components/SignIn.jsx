import React from "react";
import { Form } from "react-router-dom";

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
