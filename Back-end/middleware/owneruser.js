const jwt = require('jsonwebtoken');
const conn = require("../connection");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    conn.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
        if ((result[0].id === userId) || result.isAdmin === 1) {
            console.log("Action authorized");
            next();
        } else {
            res.status(403).json({ message: "Action not authorized" });
        }
    });

};