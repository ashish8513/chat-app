import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: '10d'
    })
    res.cookie("jwt", token, {
        httpOnly: true, //xss atacks se bachyega
        secure: true,
        sameSite: "strict" //csrfr
    })
}
export default createTokenAndSaveCookie;