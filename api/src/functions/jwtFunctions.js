const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');

let refreshTokens = [];

module.exports = {
    generateAccessToken: function (user) {
        return jwt.sign(user, ACCESS_TOKEN_SECRET, {
            expiresIn: '3600s',
        });
    },
    generateRefreshToken: function (user) {
        const refreshTokenGenerated = jwt.sign(user, REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshTokenGenerated);
        return refreshTokenGenerated;
    },
    authenticateToken: function (req, res, next) {
        const token =
            req.headers['authorization'] &&
            req.headers['authorization'].split().length &&
            req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return res.status(403).send();
        }

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err instanceof TokenExpiredError) {
                return res.sendStatus(401);
            } else if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    },
    removeToken: function (token) {
        refreshTokens = refreshTokens.filter(
            (tokenInArr) => tokenInArr !== token
        );
    },
    renewAccessToken: function (req, res) {
        const refresh_token = req.body.token;
        if (refresh_token == null) {
            return res.status(401).send();
        }
        if (!refreshTokens.includes(refresh_token))
            return res.status(403).send();

        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send();
            const access_token = generateAccessToken({
                username: user.username,
                password: user.password,
            });
            res.send({ access_token });
        });
    },
};
