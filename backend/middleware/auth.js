import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authenticated!Please Login Again" })
    }
    try {
        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decode_token.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!!" })
    }
}
export default authMiddleware; 