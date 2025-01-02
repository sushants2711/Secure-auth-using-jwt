import React, { useEffect, useState } from "react";
import { handleError } from "../errorHandle/utils";

export const Product = () => {
    const [productIs, setProductIs] = useState([]);
    useEffect(() => {
        document.title = "Products";
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const url = "http://localhost:8000/api/home/product";
            const headers = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const response = await fetch(url, headers);
            if (!response.ok) {
                handleError("You are not authorized please login ")
            }
            const result = await response.json();
            setProductIs(result);
        } catch (error) {
            handleError(error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Page</h1>
            {productIs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                    {productIs.map((currEle, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                        >
                            <p className="text-lg font-semibold text-gray-700">
                                <span className="text-gray-600">Name:</span> {currEle.name}
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                <span className="text-gray-600">Price:</span> {currEle.price}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-500 mt-8">Loading products or no products available.</p>
            )}
        </div>
    );
};
