import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../errorHandle/utils';
import { ToastContainer } from "react-toastify"

export const Logout = () => {

    const [loggedInUser, setLoggedInUser] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        document.title = 'HomePage';
    }, []);

    const navigate  = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem('loggedInUser');
        const email = localStorage.getItem('loggedInUserEmail');
        setLoggedInUser({
            name,
            email
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserEmail');
        handleSuccess("Logout successfull")
        setLoggedInUser({
            name: '',
            email: ''
        });
        setTimeout( () => {
            navigate('/')
        }, 1000)
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-black h-screen flex flex-col items-center justify-center px-4 text-white">
            <div className="text-center bg-opacity-75 p-6 rounded-md shadow-lg">
            {loggedInUser.email && (<h1 className="text-2xl font-extrabold text-white mb-4">
                    Welcome, <span className="capitalize text-4xl text-yellow-300">{loggedInUser.name}</span>
                </h1>)}
                {loggedInUser.email && (<p className="text-lg text-gray-300">
                    You are logged in with the email:
                    <span className="font-semibold text-yellow-300"> {loggedInUser.email}</span>
                </p>)}
            </div>
            <button
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 mt-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-200 ease-in-out"
                onClick={handleLogout}
            >
                Logout
            </button>
            <ToastContainer />
        </div>
    );
};
