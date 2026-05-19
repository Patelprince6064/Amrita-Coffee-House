import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const grandTotal = cart.totalPrice;

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${API_URL}/orders`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            clearCart();
            setIsCartOpen(false);
            toast.success('Order placed successfully!');
            navigate('/profile');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to place order');
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-dark border-l border-white/10 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-2xl font-serif font-bold text-cream-light flex items-center gap-3">
                                <ShoppingBag className="text-primary" /> Your Cart
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors text-cream-dark/60 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <ShoppingBag size={64} className="mb-4" />
                                    <p className="text-xl font-serif">Your cart is empty</p>
                                </div>
                            ) : (
                                cart.items.map((item) => (
                                    <div key={item._id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-xl"
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-cream-light line-clamp-1">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="text-primary font-bold">₹{item.price}</div>
                                            <div className="flex items-center gap-3 bg-black/40 w-fit rounded-lg p-1 border border-white/5">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-dark-dark/50">
                                <div className="space-y-3 mb-6 text-sm">
                                    <div className="flex justify-between text-cream-dark/80">
                                        <span>Subtotal</span>
                                        <span>₹{cart.totalPrice}</span>
                                    </div>
                                    <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-bold text-white">
                                        <span>Grand Total</span>
                                        <span className="text-primary">₹{grandTotal}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold tracking-widest uppercase hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/30"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
