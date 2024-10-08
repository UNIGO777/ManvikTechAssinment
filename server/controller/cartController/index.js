const Cart = require('../../model/cart'); // Import the Cart model



// Get cart by user ID
const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching cart", error: error.message });
    }
};

// Add item to cart
const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ msg: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ msg: "Error adding item to cart", error: error.message });
    }
};



// Add the new controller to handle quantity increase
const increaseItemQuantity = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1; // Increase the quantity by 1
            await cart.save();
            res.status(200).json({ msg: "Item quantity increased", cart });
        } else {
            return res.status(404).json({ msg: "Item not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error increasing item quantity", error: error.message });
    }
};

// Add the new controller to handle quantity decrease
const decreaseItemQuantity = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrease the quantity by 1
                await cart.save();
                res.status(200).json({ msg: "Item quantity decreased", cart });
            } else {
                return res.status(400).json({ msg: "Quantity cannot be less than 1" });
            }
        } else {
            return res.status(404).json({ msg: "Item not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error decreasing item quantity", error: error.message });
    }
};


// Remove item from cart
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json({ msg: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ msg: "Error removing item from cart", error: error.message });
    }
};

// Export the cart controller functions
module.exports = {
    getCartByUserId,
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity
};
