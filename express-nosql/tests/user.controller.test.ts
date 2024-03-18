import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import UserModel from "../models/User.model";

describe("UserController tests", () => {
    describe("All users handler", () => {
        test("should return status code 200", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            const mockedResult = {
                data: [],
                metaData: {
                    totalDocs: 1,
                    totalPages: 1,
                    page: 1,
                    perPage: 10,
                }
            };
            jest.spyOn(UserModel, "find").mockResolvedValue([]);
            jest.spyOn(UserRepository, "findAll").mockResolvedValue(mockedResult);

            await UserController.allUsers(mockedRequest, mockedResponse);
            expect(UserRepository.findAll).toHaveBeenCalledWith(mockedRequest);
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: mockedResult, error: null })
        });
    });
    describe("register user handler", () => {
        test("should return status code 500 and Internal server error.", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            jest.spyOn(UserRepository, "createUser").mockResolvedValue(null);

            await UserController.register(mockedRequest, mockedResponse);
            expect(mockedResponse.status).toHaveBeenCalledWith(500);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: { message: "Internal server error." }  })
        });
    });
        test("should return status code 200 and a new user.", async () => {
            const mockedRequest = { 
                headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
                params: {  },
            } as any;
            const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;

            const mockedUser = {
                email: "luka@epam.com",
                password: "asdfasdfasdf",
                role: "admin",
                createdAt: new Date(),
                updateAt: new Date()
            };

            jest.spyOn(UserRepository, "createUser").mockResolvedValue(true);

            await UserController.register(mockedRequest, mockedResponse);
            expect(mockedResponse.status).toHaveBeenCalledWith(200);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: true, error: null });
        });
});