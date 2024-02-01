import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getuser, login } from "../services/userServisces";

//validation rules using zod
const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email adress." })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Pasword shoul be at least 8 characters." }),
});

const Loginpage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  console.log("location", location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [FormError, setFormError] = useState("");

  const onSubmit = async (formData) => {
    try {
      await login(formData);

      const { state } = location;
      window.location = state ? state.from : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  if (getuser()) {
    return <Navigate tp="/" />;
  }

  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
        </div>
        {FormError && <em className="from_error">{FormError}</em>}
        <button className="search_button form_submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Loginpage;
