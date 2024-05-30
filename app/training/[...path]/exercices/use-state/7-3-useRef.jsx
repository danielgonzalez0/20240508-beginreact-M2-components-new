/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Mail, User2 } from "lucide-react";
import { useRef, useState } from "react";

// eslint-disable-next-line no-unused-vars
// @ts-ignore
export const LoginForm = ({ onSubmit }) => {

 const emailRef = useRef(null);
  const userNameRef = useRef(null);



  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef?.current.value;
    const username = userNameRef?.current.value;
    const newUser = { email, name: username };
    onSubmit(newUser);

  }
  return (
    // Ajoute la props `onSubmit`
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
        <
          // @ts-ignore
          Mail size={16} />
        {/* 🦁 Contrôle cette input */}
        <input type="email" className="grow" placeholder="email" name="mail" ref={emailRef} />
      </label>
      <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
        <
          // @ts-ignore
          User2 size={16} />
        {/* 🦁 Contrôle cette input */}
        <input type="text" minLength={3} className="grow" placeholder="user" name="username" ref={userNameRef} />
      </label>
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
      <LoginForm onSubmit = {(values)=>{
        setUser(values);
      }}/>
    </div>
  );
}
