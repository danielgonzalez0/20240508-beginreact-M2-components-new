// @ts-nocheck
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import clsx from "clsx";
import { Mail, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line no-unused-vars
// @ts-ignore
export const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();


 const  product = {
    name: "Melvyn",
    prices: [
      {
        type: "one-time",
        value: 10,
        currency: "EUR"
      },
      {
        type: "multiple-time",
        value: 5,
        currency: "EUR",
        times: 2
      }
    ],
    stock: 10,
  }


  // 🦁 Créer un schéma pour valider un "product"
  const productSchema = z.object({
    name: z.string(),
    prices: z.array(z.object({
      type: z.string(),
      value: z.number(),
      currency: z.string(),
      times: z.number().optional()
    }
    ))
  })

  console.log("test product", productSchema.parse(product));


  const handleFormSubmit = (data, e) => {
    e.preventDefault();
    const newUser = { email: data.email, name: data.userName };
    onSubmit(newUser);

  }
  return (
    // Ajoute la props `onSubmit`
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
      <label className={clsx("input input-bordered flex items-center gap-2 has-[:invalid]:input-error", { 'input-error': errors.email })}>
        <
          // @ts-ignore
          Mail size={16} />
        {/* 🦁 Contrôle cette input */}
        <input type="email" className="grow" placeholder="email" name="mail" {...register('email', {
          required: {
            value: true,
            message: "the email is required"
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "invalid email"
          }
        },

        )} />
      </label>
      {errors.email && <span className="text-red-500 font-semibold">{errors.email.message}</span>}
      <label className={clsx("input input-bordered flex items-center gap-2 has-[:invalid]:input-error", { 'input-error': errors.userName })}>
        <
          // @ts-ignore
          User2 size={16} />
        {/* 🦁 Contrôle cette input */}
        <input type="text" minLength={3} className="grow" placeholder="user" name="username" {...register("userName", { required: {
          value: true,
          message: "Username is required"
        }, 
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters"
        } })} />
      </label>
      {errors.userName && <span className="text-red-500 font-semibold">{errors.userName.message}</span>}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default function App() {
  const [user, setUser] = useState(null);


  if (user) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Logged in !</h2>
          <p>Email : {user.email}</p>
          <p>Name : {user.name}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <LoginForm onSubmit={(values) => {
        setUser(values);
      }} />
    </div>
  );
}
