import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../errorHandle/utils";

export function Signup() {

    useEffect(() => {
        document.title = "Signup"
    },[])

    const [signinInfo, setSignInfo] = useState({
        name: "",
        email: "",
        passkey: "",
        password: "",
        confirmpassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const signInInfoData = { ...signinInfo }
        signInInfoData[name] = value;
        setSignInfo(signInInfoData)
    }

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, passkey, password, confirmpassword } = signinInfo;
        if (!name || !email || !passkey || !password || !confirmpassword) {
            return handleError("all fields are required!")
        }
        try {
            const url = "http://localhost:8000/api/test/signin"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinInfo)
            });

            const result = await response.json();
            console.log(result)
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details)
            }
            else if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h1 className="text-2xl text-center font-semibold mb-6 underline text-indigo-600">Signin!</h1>

                    <form className="space-y-4" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name..."
                                value={signinInfo.name}
                                className="mt-1 block w-full h-8 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email..."
                                value={signinInfo.email}
                                className="mt-1 block w-full h-8 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="passkey" className="block text-sm font-medium text-gray-700">Passkey</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="passkey"
                                id="passkey"
                                placeholder="Enter your passkey..."
                                value={signinInfo.passkey}
                                className="mt-1 block w-full h-8 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password..."
                                value={signinInfo.password}
                                className="mt-1 block w-full h-8 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                placeholder="Enter your confirm password..."
                                value={signinInfo.confirmpassword}
                                className="mt-1 block w-full h-8 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                    </p>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}
