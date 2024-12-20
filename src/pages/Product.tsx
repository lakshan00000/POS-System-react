import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import { Link } from "react-router-dom";

function Product() {
    const [products, setProducts] = useState<ProductType[]>([]);

    async function loadProducts() {
        try {
            const response = await axios.get("http://localhost:8081/Item");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to load products", error);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white">
                <div className="flex flex-col items-center py-6">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="User Avatar"
                        className="rounded-full mb-4"
                    />
                    <h1 className="text-xl font-semibold">Lakshan</h1>
                </div>
                <nav className="space-y-4 px-4">
                    <Link to="/">
                        <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            Home
                        </div>
                    </Link>
                    <Link to="/Category">
                        <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            Categories
                        </div>
                    </Link>
                    <Link to="/Product">
                        <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            Items
                        </div>
                    </Link>
                    <Link to="/Stock">
                        <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            Stock
                        </div>
                    </Link>
                    <Link to="/Create">
                        <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            Create Orders
                        </div>
                    </Link>
                    <Link to="/Orders">
                        <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            Orders
                        </div>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

                <div className="my-6">
                    <button
                        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        onClick={loadProducts}
                    >
                        Load Products
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3 p-4 border-b border-gray-200">
                        Product List
                    </h2>
                    <table className="table-auto min-w-full text-sm text-gray-700 border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Product ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product: ProductType) => (
                                    <tr key={String(product.id)} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{product.id.toString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">${product.price.toString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.qty.toString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="text-center text-gray-500 italic py-4"
                                        colSpan={5}
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Product;
