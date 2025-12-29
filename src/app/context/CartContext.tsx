"use client";



import { createContext, useContext, useState, ReactNode } from "react";


export interface CartProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    quantity: number;
}


interface CartContextType {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (id: number) => void;
     updateQuantity: (id: number, quantity: number) => void;
}


const CartContext = createContext<CartContextType | null>(null);


export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartProduct[]>([]);


    const addToCart = (product: CartProduct) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);


            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }


            return [...prev, product];
        });
    };


    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart CartProvider ichida bo‘lishi kerak");
    }
    return context;
};