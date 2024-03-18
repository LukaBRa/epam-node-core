import { CartController } from "../controllers/cart.controller";
import { CartRepository } from "../repositories/cart.repository";
import { CartModel } from "../models/Cart.model";
import { ProductModel } from "../models/Product.model";
import { OrderRepository } from "../repositories/order.repository";

describe("Cart Controller tests", () => {
    
    describe("findOrCreate handler", () => {
        test("should return status code 200 and new cart", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f0a7d676dc024ef3a5d9c5' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
            const mockedCart = {
                "id": "1231fasdfagaadgasdg",
                "createdAt": new Date(),
                "items": [
                    {
                        "product": {
                            "title": "Pen",
                            "description": "Cute pen",
                            "price": 20,
                            "createdAt": new Date(),
                            "updatedAt": new Date(),
                            "id": "65f0a7d676dc024ef3a5d9c5",
                        },
                        "count": 12,
                    }
                ],
                "updatedAt": new Date()
            };
            jest.spyOn(CartModel, "findOneAndUpdate").mockResolvedValue({});
            jest.spyOn(CartRepository, "findOrCreate").mockResolvedValue(mockedCart);

            await CartController.findOrCreate(mockedRequest, mockedResponse);
            expect(CartRepository.findOrCreate).toHaveBeenCalledWith("65f0a7d676dc024ef3a5d9c5");
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data:mockedCart, error: null  })
        });

        test("should return status code 500 and message Internal server error", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
            const mockedCart = {
                "id": "1231fasdfagaadgasdg",
                "createdAt": new Date(),
                "items": [
                    {
                        "product": {
                            "title": "Pen",
                            "description": "Cute pen",
                            "price": 20,
                            "createdAt": new Date(),
                            "updatedAt": new Date(),
                            "id": "65f0a7d676dc024ef3a5d9c5",
                        },
                        "count": 12,
                    }
                ],
                "updatedAt": new Date()
            };
            jest.spyOn(CartModel, "findOneAndUpdate").mockResolvedValue({});
            jest.spyOn(CartRepository, "findOrCreate").mockResolvedValue(mockedCart);

            await CartController.findOrCreate(mockedRequest, mockedResponse);
            expect(CartRepository.findOrCreate).toHaveBeenCalledWith("65f0a7d676dc024ef3a5d9c5");
            expect(mockedResponse.status).toHaveBeenCalledWith(500);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data:null, error: { message: "Internal server error" }  })
        });

    });

    describe("updateCart handler", () => {
        test("should return 200 and cart snapshot", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
            const mockedCart = {
                "id": "65f46b2c0a03c688230e3ffc",
                "createdAt": new Date(),
                "items": [
                    {
                        "product": {
                            "id": "123sdfsadfasdas",
                            "title": "Pen",
                            "description": "Cute pen",
                            "price": 20,
                            "createdAt": new Date(),
                            "updatedAt": new Date(),
                        },
                        "count": 12,
                    }
                ],
                "updatedAt": new Date()
            }
            jest.spyOn(CartModel, "findOneAndUpdate").mockResolvedValue({});
            jest.spyOn(CartRepository, "findOrCreate").mockResolvedValue(mockedCart);

            await CartController.findOrCreate(mockedRequest, mockedResponse);
            expect(CartRepository.findOrCreate).toHaveBeenCalledWith("65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: mockedCart, error: null  })
        });
        test("shoud return status code 500 and Internal server error", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(CartModel, "findOne").mockResolvedValue({});
            jest.spyOn(CartModel, "findOneAndUpdate").mockResolvedValue({});
            jest.spyOn(ProductModel, "findOne").mockResolvedValue({});
            jest.spyOn(CartRepository, "updateCart").mockResolvedValue(null);

            await CartController.findOrCreate(mockedRequest, mockedResponse);
            expect(mockedResponse.status).toHaveBeenCalledWith(500);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Internal server error" }  })
        });
        test("should return status code 400 and Cart not found.", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
                body: {
                    productId: "1312414125sdfsdg",
                    count: 10
                }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(CartModel, "findOne").mockResolvedValue({});
            jest.spyOn(CartModel, "findOneAndUpdate").mockResolvedValue({});
            jest.spyOn(ProductModel, "findOne").mockResolvedValue({});
            jest.spyOn(CartRepository, "updateCart").mockResolvedValue(null);

            await CartController.updateCart(mockedRequest, mockedResponse);
            expect(CartRepository.updateCart).toHaveBeenCalledWith( {"count": 10, "productId": "1312414125sdfsdg"} ,"65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(400);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Cart was not found." }  })
        });
        test("should return status code 400 and Product not found.", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
                body: {
                    productId: "1312414125sdfsdg",
                    count: 10
                }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(CartModel, "findOne").mockResolvedValue({});
            jest.spyOn(CartModel, "findOneAndUpdate").mockResolvedValue({});
            jest.spyOn(ProductModel, "findOne").mockResolvedValue({});
            jest.spyOn(CartRepository, "updateCart").mockResolvedValue(false);

            await CartController.updateCart(mockedRequest, mockedResponse);
            expect(CartRepository.updateCart).toHaveBeenCalledWith( {"count": 10, "productId": "1312414125sdfsdg"} ,"65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(400);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Product is not valid." }  })
        });
    });

    describe("checkout handler", () => {
        test("should return status code 200 and new order", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            const mockedOrder = {
                    "userId": "65f069b938f24fa516fc0f83",
                    "cartId": "65f46b2c0a03c688230e3ffc",
                    "items": [
                        {
                            "product": {
                                "id": "sdfsdf2341515121",
                                "title": "Pen",
                                "description": "Cute pen",
                                "price": 20,
                                "createdAt": new Date(),
                                "updatedAt": new Date(),
                            },
                            "count": 12,
                        }
                    ],
                    "payment": {
                        "type": "paypal",
                        "address": "London",
                        "creditCard": "1234-1234-1234-1234"
                    },
                    "delivery": {
                        "type": "post",
                        "address": "London"
                    },
                    "comments": "delivered",
                    "status": "created",
                    "total": 240,
                    "id": "65f57a2e10ece4c109b05b33",
                    "createdAt": new Date(),
                    "updatedAt": new Date()
            }

            jest.spyOn(OrderRepository, "createOrder").mockResolvedValue(mockedOrder);

            await CartController.checkout(mockedRequest, mockedResponse);
            expect(OrderRepository.createOrder).toHaveBeenCalledWith("65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: mockedOrder, error: null })
        });
        test("should return status code 500 and Internal server error", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(OrderRepository, "createOrder").mockResolvedValue(null);

            await CartController.checkout(mockedRequest, mockedResponse);
            expect(OrderRepository.createOrder).toHaveBeenCalledWith("65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(500);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Internal server error." } })
        });
        test("should return status code 500 and Internal server error when no id passed", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '' },
                params: {  }
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(OrderRepository, "createOrder").mockResolvedValue(null);

            await CartController.checkout(mockedRequest, mockedResponse);
            expect(OrderRepository.createOrder).toHaveBeenCalledWith("");
            expect(mockedResponse.status).toHaveBeenCalledWith(500);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Internal server error." } })
        });
    });

    describe("empty cart handler", () => {
        test("should return status code 200 and success true", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(CartRepository, "emptyCart").mockResolvedValue(true);

            await CartController.emptyCart(mockedRequest, mockedResponse);
            expect(CartRepository.emptyCart).toHaveBeenCalledWith("65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: { success: true }, error: null  })
        });
        test("should return status code 500 and Internal server error.", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(CartRepository, "emptyCart").mockResolvedValue(false);

            await CartController.emptyCart(mockedRequest, mockedResponse);
            expect(CartRepository.emptyCart).toHaveBeenCalledWith("65f069b938f24fa516fc0f83");
            expect(mockedResponse.status).toHaveBeenCalledWith(500);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Internal server error." }  })
        });
    }); 

});