import { validationResult } from "express-validator";
import { ProductController } from "../controllers/product.controller";
import { ProductModel } from "../models/Product.model";
import { ProductRepository } from "../repositories/product.repository";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";

describe("Product Controller tests", () => {
    describe("findAll handler", () => {
        test("should return status code 200 and all products", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
    
            const mockedResult = [
                {
                    "id": "65f0a77776dc024ef3a5d9c2",
                    "title": "Book",
                    "description": "Interesting book",
                    "price": 200,
                    "createdAt": new Date(),
                    "updatedAt": new Date(),
                },
                {
                    "id": "65f0a7d676dc024ef3a5d9c5",
                    "title": "Pen",
                    "description": "Cute pen",
                    "price": 20,
                    "createdAt": new Date(),
                    "updatedAt": new Date(),
                }
            ];
            jest.spyOn(ProductModel, "find").mockResolvedValue([]);
            jest.spyOn(ProductRepository, "findAll").mockResolvedValue(mockedResult);
            await ProductController.findAll(mockedRequest, mockedResponse);
            expect(ProductRepository.findAll).toHaveBeenCalledTimes(1);
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: mockedResult, error: null  })
        });
    });
    describe("findOne handler", () => {
        test("should return status code 200 and a product", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
    
            const mockedResult = {
                "id": "12314253452345",
                "title": "Book",
                "description": "Interesting book",
                "price": 200,
                "createdAt": new Date(),
                "updatedAt": new Date(),
            };
            jest.spyOn(ProductModel, "findOne").mockResolvedValue([]);
            jest.spyOn(ProductRepository, "findOne").mockResolvedValue(mockedResult);
            await ProductController.findOne(mockedRequest, mockedResponse);
            expect(ProductRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: mockedResult, error: null  })
        });
        test("should return status code 404 and Product not found.", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
    
            jest.spyOn(ProductModel, "findOne").mockResolvedValue([]);
            jest.spyOn(ProductRepository, "findOne").mockResolvedValue(null);
            await ProductController.findOne(mockedRequest, mockedResponse);
            expect(mockedResponse.status).toHaveBeenCalledWith(404);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Product not found." }  })
        });
    });
}); 