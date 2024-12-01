import React from "react";
import { Form } from "react-router-dom";

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
