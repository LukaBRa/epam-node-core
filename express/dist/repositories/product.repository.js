"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    static findAll() {
        return this.products;
    }
    static findOne(id) {
        return this.products.find(product => product.id === id);
    }
}
exports.ProductRepository = ProductRepository;
ProductRepository.products = [
    {
        id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
        title: "Book",
        description: "Interesting book",
        price: 200
    },
    {
        id: "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
        title: "Pen",
        description: "Cute pen",
        price: 20
    }
];
