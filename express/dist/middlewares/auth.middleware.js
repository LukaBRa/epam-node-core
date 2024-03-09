"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_repository_1 = require("../repositories/user.repository");
function auth(req, res, next) {
    if (!req.headers['x-user-id']) {
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.send({ data: null, error: "You must be authorized user" });
        return;
    }
    const userId = req.headers["x-user-id"];
    const user = user_repository_1.UserRepository.findOne(typeof userId === "string" ? userId : "");
    if (!user) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.send({ data: null, error: "User is not authorized" });
        return;
    }
    next();
}
exports.auth = auth;
