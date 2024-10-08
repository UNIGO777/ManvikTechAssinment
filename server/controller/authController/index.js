const user = require('../../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Cart = require('../../model/cart'); // Import the Cart model

const signUp = async (req, res) => {
    const { email, phone, name, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(402).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ email, phone, name, password: hashedPassword });
    await newUser.save();

    // Create a new cart for the user
    const newCart = new Cart({ userId: newUser._id, items: [] });
    await newCart.save();

    const token = jwt.sign(
        {
            userId: newUser._id,
            email: newUser.email
        },
        "secretkey"
    );

    newUser.password = undefined; 
    res.status(200).json({ msg: "User created successfully", user: newUser, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        return res.status(402).send("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
        {
            userId: existingUser._id,
            email: existingUser.email
        },
        "secretkey"
    );

    existingUser.password = undefined; 
    res.status(200).json({ msg: "User logged in successfully", user: existingUser, token });
}

module.exports = { signUp, login };
