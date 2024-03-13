"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const cartRouter_1 = __importDefault(require("./routes/cartRouter"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(auth_middleware_1.auth);
app.use(bodyParser.json());
app.use("/api/products", productRouter_1.default);
app.use("/api/profile/cart", cartRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
