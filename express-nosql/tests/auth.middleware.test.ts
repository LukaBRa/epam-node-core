import { auth } from "../middlewares/auth.middleware";
import { UserRepository } from "../repositories/user.repository";

describe("Auth middleware tests", () => {
    test("should return 403 and error You must be authorized user", async () => {
        const mockedRequest = { 
            headers: { 'x-user-id': '' },
            params: {  },
        } as any;
        const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
        const mockedNext = jest.fn();

        await auth(mockedRequest, mockedResponse, mockedNext);
            expect(mockedResponse.status).toHaveBeenCalledWith(403);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: "You must be authorized user."  });
    });
    test("should return 401 and error User is not authorized.", async () => {
        const mockedRequest = { 
            headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
            params: {  },
        } as any;
        const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
        const mockedNext = jest.fn();

        jest.spyOn(UserRepository, "findOne").mockResolvedValue(false);

        await auth(mockedRequest, mockedResponse, mockedNext);
            expect(mockedResponse.status).toHaveBeenCalledWith(401);
            expect(mockedResponse.json).toHaveBeenCalledWith({ data: null, error: "User is not authorized."  });
    });
    test("should call next function", async () => {
        const mockedRequest = { 
            headers: { 'x-user-id': '65f069b938f24fa516fc0f83' },
            params: {  },
        } as any;
        const mockedResponse = { status: jest.fn(() => mockedResponse), json: jest.fn()  } as any;
        const mockedNext = jest.fn();

        jest.spyOn(UserRepository, "findOne").mockResolvedValue(true);

        await auth(mockedRequest, mockedResponse, mockedNext);
        expect(mockedNext).toHaveBeenCalledTimes(1);
    });
});