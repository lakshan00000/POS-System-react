import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryType from "../types/CategoryType";
import itemsIcon from "../icon/user icon.png";

function Category() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    }

    function handleCategoryName(event: React.ChangeEvent<HTMLInputElement>) {
        setCategoryName(event.target.value);
    }

    async function handleSubmit() {
        
        const data = { name: categoryName };
        try {
            await axios.post("http://localhost:8081/categories", data);
            setCategoryName("");
            loadCategories();
        } catch (error) {
            console.error("Failed to create category", error);
        }
    }

    async function deleteCategory(categoryId: number) {
        try {
            await axios.delete(`http://localhost:8081/categories/${categoryId}`);
            loadCategories();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="min-h-screen bg-yellow-100 flex">
            
            <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
            <img
                                src={itemsIcon}
                                alt="Items Icon"
                                className="w-10 h-10"
                            />
                <h1 className="text-xl font-semibold mb-6">Lakshan</h1>
                <nav className="w-full">
                    <Link to="/" className="block p-4 hover:bg-gray-700">Home</Link>
                    <Link to="/Category" className="block p-4 hover:bg-gray-700">Categories</Link>
                    <Link to="/Product" className="block p-4 hover:bg-gray-700">Items</Link>
                    <Link to="/Stock" className="block p-4 hover:bg-gray-700">Stock</Link>
                    <Link to="/Create" className="block p-4 hover:bg-gray-700">Create Orders</Link>
                    <Link to="/Orders" className="block p-4 hover:bg-gray-700">Orders</Link>
                </nav>
            </aside>

           
            <div className="flex-1 bg-white shadow-md rounded-lg p-6 mx-8">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Category Management</h1>

               
                <div className="mb-6 flex justify-center">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={loadCategories}
                    >
                        Load Categories
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3 p-4 border-b border-gray-200">
                        Category List
                    </h2>
                    <table className="table-auto min-w-full text-sm text-gray-700 border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Category ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category: CategoryType) => (
                                    <tr key={String(category.id)} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{category.id.toString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                        
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button onClick={() => deleteCategory(category.id)}className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200">
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
                                        No category found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

               
                

                {/* Create Category Form */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Create Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium mb-1" htmlFor="categoryName">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                value={categoryName}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                onChange={handleCategoryName}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Category;
