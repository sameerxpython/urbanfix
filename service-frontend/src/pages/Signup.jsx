import React from "react";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";

export default function Signup() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <SignupForm />
            </div>
        </div>
    );
}
