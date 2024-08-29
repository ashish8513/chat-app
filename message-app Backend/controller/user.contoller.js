import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import createTokenAndSaveCookie from '../JWT TOKEN/generateToken.js'


export const signup = async (req, res) => {
    try {
        const { fullname, email, password} = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", error: true });
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save()
        if (createdUser) {
            createTokenAndSaveCookie(createdUser._id, res)
            res.status(200).json({
                message: "User created successfully", user: {
                    _id: createdUser._id,
                    fullname: createdUser.fullname,
                    email: createdUser.email,
                }
            });
        }

    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({ message: "Server  error plz try again😢" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(400).json({
                error: 'Invalid username or password '
            })
        }
        createTokenAndSaveCookie(user._id, res)
        res.status(200).json({
            message: 'User logged in successfully', user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        })
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}



export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(201).json({
            message: 'User logged out successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        res.status(201).json(filteredUsers)
    } catch (error) {
        console.log("Error in allUser in Controller:  ", + error)
    }
}


