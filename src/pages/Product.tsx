import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoryType from "../types/CategoryType";
import itemsIcon from "../icon/user icon.png";

function Product() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [productname, setProductName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>(""); 
    const [categoryId, setCategoryID] = useState<number | "">("");
    const [productEditing, setProductEditing] = useState<ProductType | null>(null);

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    async function loadProducts() {
        try {
            const response = await axios.get("http://localhost:8081/Item");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to load products", error);
        }
    }

    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    }

    function handleProductName(event: React.ChangeEvent<HTMLInputElement>) {
        setProductName(event.target.value);
    }

    function handlePrice(event: React.ChangeEvent<HTMLInputElement>) {
        setPrice(event.target.value);
    }

    function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function handleCategoryID(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategoryID(event.target.value ? parseInt(event.target.value, 10) : "");
    }

    async function handleSubmit() {
        const data = {
            name: productname,
            price: parseFloat(price),
            description,
            categoryId,
        };
        console.log("Submitting data:", data);
    
        try {
            await axios.post("http://localhost:8081/Item", data);
            loadProducts();
            resetForm();
        } catch (error: any) {
            console.log("Error during product creation:", error);
        }
    }
    function editProduct(product: ProductType) {
        setProductEditing(product);
        setProductName(product.name);
        setPrice(product.price.toString());
        setDescription(product.description);
        setCategoryID(product.category?.id || "");
    }

    async function updateProduct() {
        if (!productname ||  !price ||!categoryId ||!description  ) {
            alert("All fields are required.");
            return;
        }

        const data = {
            name: productname,
            price: parseFloat(price),
            categoryId,
            description,
        };

        try {
            await axios.put(`http://localhost:8081/Item/${productEditing?.id}`, data);
            setProductEditing(null);
            loadProducts();
            resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId: number) {
        try {
            await axios.delete(`http://localhost:8081/Item/${productId}`);
            loadProducts();
        } catch (error) {
            console.log(error);
        }
    }

    function resetForm() {
        setProductName("");
        setPrice("");
        setDescription("");
        setCategoryID("");
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
                <img src={itemsIcon} alt="Items Icon" className="w-10 h-10 mb-4" />
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

            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

                <div className="overflow-x-auto bg-white shadow rounded-lg mb-6">
                    <table className="table-auto min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{product.id}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">Rs {product.price}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2">{product.category?.name || "N/A"}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button onClick={() => editProduct(product)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                                        <button onClick={() => deleteProduct(product.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white shadow rounded-lg p-6 max-w-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        {productEditing ? "Update Product" : "Create Product"}
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Product Name</label>
                            <input type="text" value={productname} onChange={handleProductName} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Price</label>
                            <input type="text" value={price} onChange={handlePrice} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Description</label>
                            <input type="text" value={description} onChange={handleDescription} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Category</label>
                            <select value={categoryId} onChange={handleCategoryID} className="w-full p-2 border rounded">
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={productEditing ? updateProduct : handleSubmit}
                            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {productEditing ? "Update Product" : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Product;
