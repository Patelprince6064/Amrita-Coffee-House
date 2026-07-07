const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Helper to check if Razorpay keys are properly configured
const isRazorpayConfigured = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    return (
        keyId && 
        keySecret && 
        !keyId.includes('your_key_id') && 
        !keySecret.includes('your_key_secret') &&
        keyId !== '' &&
        keySecret !== ''
    );
};

// Helper: get Razorpay instance with current env vars
const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, error: 'Your cart is empty' });
        }

        const amount = cart.totalPrice * 100; // Razorpay works in paise

        // If keys are placeholders, run in MOCK PAYMENT MODE
        if (!isRazorpayConfigured()) {
            console.log('⚠️ Razorpay keys are not configured. Running in MOCK PAYMENT MODE.');
            return res.status(200).json({
                success: true,
                orderId: `mock_order_${Math.random().toString(36).substr(2, 9)}`,
                amount,
                currency: 'INR',
                keyId: 'mock_key_id',
                isMock: true
            });
        }

        const options = {
            amount,
            currency: 'INR',
            receipt: `receipt_${req.user.id}_${Date.now()}`,
            notes: {
                userId: req.user.id.toString(),
            },
        };

        const razorpay = getRazorpay();
        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error('Razorpay create order error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Verify payment & save order
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // If it's a mock payment order, verify immediately without signature validation
        if (razorpay_order_id && razorpay_order_id.startsWith('mock_')) {
            console.log('✅ Verifying mock payment...');
            const cart = await Cart.findOne({ user: req.user.id });

            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ success: false, error: 'Cart not found' });
            }

            const order = await Order.create({
                user: req.user.id,
                items: cart.items,
                totalAmount: cart.totalPrice,
                paymentStatus: 'Completed',
                paymentId: razorpay_payment_id || `mock_pay_${Math.random().toString(36).substr(2, 9)}`,
                razorpayOrderId: razorpay_order_id,
                deliveryStatus: 'Processing',
            });

            // Clear cart
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            return res.status(201).json({ success: true, data: order });
        }

        // Verify signature (for real payments)
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, error: 'Payment verification failed' });
        }

        // Get user's cart and create order
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, error: 'Cart not found' });
        }

        const order = await Order.create({
            user: req.user.id,
            items: cart.items,
            totalAmount: cart.totalPrice,
            paymentStatus: 'Completed',
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            deliveryStatus: 'Processing',
        });

        // Clear cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        console.error('Payment verify error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
