import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
    const [products, setProducts] = useState<ProductType[]>([]);

    // Load products from the API
    async function loadProducts() {
        try {
            const response = await axios.get("http://localhost:8081/Item");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        loadProducts();
    }, [])

    const [orderedProducts, setOrderedProducts] = useState<ProductType[]>([]);
    const [total, setTotal] = useState<number>(0);

    // Add selected product to the order
    function addProductToOrder(product: ProductType) {
        const updatedOrder = [...orderedProducts, product];
        setOrderedProducts(updatedOrder);
    }

    // Update total price whenever products are added to the order
    useEffect(function () {
        const newTotal = orderedProducts.reduce((acc, product) => acc + product.price, 0);
        setTotal(newTotal);
    }, [orderedProducts]);

    const navigate = useNavigate();

    // Save the order to the backend
    async function saveOrder() {
        var productIds: any = [];

        orderedProducts.forEach(function (product) {
            productIds.push(product.id);
        });

        try {
            await axios.post("http://localhost:8081/orders", { productIds });
            navigate("/order");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-wrap gap-8 p-6">
            {/* Product List Section */}
            <div className="w-full sm:w-96 border-r border-slate-200 p-4">
                <span className="text-2xl font-semibold text-slate-800 block mb-4">Products</span>

                <div className="space-y-4">
                    {products.map(function (product) {
                        return (
                            <div
                                key={product.id}
                                onClick={() => addProductToOrder(product)}
                                className="cursor-pointer p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <div className="text-lg font-semibold text-slate-800">{product.name}</div>
                                <div className="text-sm text-slate-500">{product.category?.name}</div>
                                <div className="text-sm text-green-600 text-right">Rs. {product.price}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* New Order Section */}
            <div className="flex-1 p-4">
                <span className="text-2xl font-semibold text-slate-800 mb-6">New Order</span>

                <div className="overflow-x-auto shadow-lg border border-slate-200 rounded-lg">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="py-3 px-4 font-medium text-sm text-slate-700">ID</th>
                                <th className="py-3 px-4 font-medium text-sm text-slate-700">Description</th>
                                <th className="py-3 px-4 font-medium text-sm text-slate-700 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedProducts.map(function (product) {
                                return (
                                    <tr key={product.id} className="border-b hover:bg-slate-50">
                                        <td className="py-3 px-4">{product.id}</td>
                                        <td className="py-3 px-4">{product.name}</td>
                                        <td className="py-3 px-4 text-right">Rs. {product.price}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan={2} className="py-3 px-4 font-semibold">Total</td>
                                <td className="py-3 px-4 text-right font-semibold">Rs. {total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        className="w-full sm:w-auto py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-950 transition-colors focus:outline-none"
                        onClick={saveOrder}
                    >
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateOrder;
