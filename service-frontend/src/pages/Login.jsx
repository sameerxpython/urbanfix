import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}
