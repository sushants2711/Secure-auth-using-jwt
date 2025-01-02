import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../errorHandle/utils";
handleSuccess
export function Login() {

    useEffect(() => {
        document.title = "Login"
    },[])

    
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const loginInfoData = { ...loginInfo };
        loginInfoData[name] = value;
        setLoginInfo(loginInfoData)
    }

    const navigate = useNavigate();

    const handleLoginSumbission = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("all fields are required")
        }

        try {
            const url = "http://localhost:8000/api/test/login"
            const resposnse = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await resposnse.json();
            console.log(result)

            const { success, message, jwtToken, name, email, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)
                localStorage.setItem('loggedInUserEmail', email)

                setTimeout(() => {
                    navigate('/products')
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

        }
    }


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="bg-slate-400 shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h1 className="text-2xl text-center font-semibold mb-6 underline text-indigo-600">Login!</h1>
                    <form className="space-y-4" onSubmit={handleLoginSumbission}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                value={loginInfo.email}
                                placeholder="Enter your email..."
                                className="mt-1 block w-full h-8 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                value={loginInfo.password}
                                placeholder="Enter your password..."
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
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 hover:underline">signup</Link>
                    </p>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}