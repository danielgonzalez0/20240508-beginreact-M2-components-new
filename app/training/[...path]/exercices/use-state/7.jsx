"use client";

import { Mail, User2 } from "lucide-react";

// eslint-disable-next-line no-unused-vars
export const LoginForm = ({ onSubmit }) => {
  return (
    <form className="flex flex-col gap-2">
      <label className="input input-bordered flex items-center gap-2">
        <Mail size={16} />
        <input type="text" className="grow" placeholder="email" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <User2 size={16} />
        <input type="text" className="grow" placeholder="user" />
      </label>
      <button type="button" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default function App() {
  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={(values) => {
          alert(`User logged with :
Email: ${values.email}
User: ${values.user}`);
        }}
      />
    </div>
  );
}
