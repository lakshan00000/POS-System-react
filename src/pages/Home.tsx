import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../icon/home.png";
import categoryIcon from "../icon/category.png";
import itemsIcon from "../icon/user icon.png"; 
import stockIcon from "../icon/category.png"; 
import createOrdersIcon from "../icon/orders.png";
import ordersIcon from "../icon/orders.png";

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-3xl font-bold text-gray-800">Super Market</h1>
                    <div className="flex items-center gap-6">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-500 hover:text-gray-800">
                                Location
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-800">
                                Help
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-800">
                                Setting
                            </a>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Welcome to Lakshan Market
                </h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <Link to="/">
                        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
                            <img src={homeIcon} alt="Home Icon" className="w-10 h-10" />
                            <h3 className="text-lg font-medium text-gray-700">Home</h3>
                        </div>
                    </Link>
                    <Link to="/Category">
                        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
                            <img
                                src={categoryIcon}
                                alt="Category Icon"
                                className="w-10 h-10"
                            />
                            <h3 className="text-lg font-medium text-gray-700">
                                Categories
                            </h3>
                        </div>
                    </Link>
                    <Link to="/Product">
                        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
                            <img
                                src={itemsIcon}
                                alt="Items Icon"
                                className="w-10 h-10"
                            />
                            <h3 className="text-lg font-medium text-gray-700">Items</h3>
                        </div>
                    </Link>
                    <Link to="/Stock">
                        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
                            <img src={stockIcon} alt="Stock Icon" className="w-10 h-10" />
                            <h3 className="text-lg font-medium text-gray-700">Stock</h3>
                        </div>
                    </Link>
                    <Link to="/Create">
                        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
                            <img
                                src={createOrdersIcon}
                                alt="Create Orders Icon"
                                className="w-10 h-10"
                            />
                            <h3 className="text-lg font-medium text-gray-700">
                                Create Orders
                            </h3>
                        </div>
                    </Link>
                    <Link to="/Orders">
                        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
                            <img src={ordersIcon} alt="Orders Icon" className="w-10 h-10" />
                            <h3 className="text-lg font-medium text-gray-700">Orders</h3>
                        </div>
                    </Link>
                </div>

                {/* Today Stock */}
                <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Today's Stock
                    </h3>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            Chart Placeholder
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 mt-6">
                <div className="text-center">
                    <p className="text-sm">Copyright © 2024 Lakshan Web Services</p>
                    <p className="text-sm">Contact: 011145506</p>
                </div>
            </footer>
        </div>
    );
}

export default Dashboard;
