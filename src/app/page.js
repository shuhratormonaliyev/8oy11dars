"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import products from '../app/data/products'; 
import posts from '../data/posts.json'; 

export default function Products() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Mahsulotlar</h1>
            <ul className="space-y-4">
                {products.map(product => (
                    <li key={product.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        <span className="text-lg">{product.name} - {product.price} so'm</span>
                        <button 
                            onClick={() => addToCart(product)} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Savatga qo'shish
                        </button>
                    </li>
                ))}
            </ul>
            <h2 className="text-2xl font-bold mt-6">Savat</h2>
            <ul className="mt-2">
                {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center text-lg">
                        {item.name}
                        <button 
                            onClick={() => removeFromCart(index)} 
                            className="text-red-300 px-2 py-1 rounded hover:bg-red-600 transition duration-100"
                        >
                            DEL
                        </button>
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold mt-6">Blog</h2>
            <ul className="mt-2">
                {posts.map(post => (
                    <li key={post.id} className="text-lg">
                        <Link href={`/post/${post.id}`} className="text-blue-400 hover:underline">{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

