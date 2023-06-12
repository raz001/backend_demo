const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, 'masai');
            console.log(decoded)
            if (decoded) {
                req.body["userID"] = decoded.userID;
                req.body["user"] = decoded.user
                next();
            }
            else res.json({ msg: "not authorized" })
        } catch (error) {
            res.json({ error: error })
        }
    } else {
        res.json({ msg: "please login!!" })
    }
};

module.exports = { auth }

