import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays
} from "../../services/public-holidays.service";
import axios from "axios";
import { 
    GB_HOLIDAYS, FR_HOLIDAYS, DE_HOLIDAYS, NL_HOLIDAYS,
    GB_NEXT_PUBLIC_HOLIDAYS, FR_NEXT_PUBLIC_HOLIDAYS, DE_NEXT_PUBLIC_HOLIDAYS, NL_NEXT_PUBLIC_HOLIDAYS
} from "../../mock_data";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("[Mocks] Public holidays servie", () => {
    describe("getListOfPublicHolidays", () => {
        test("should return all public holidays for GB", async () => {
            mockedAxios.get.mockResolvedValue({ data: GB_HOLIDAYS });

            const publicHolidays = await getListOfPublicHolidays(2024, "GB");
        
            expect(publicHolidays).toHaveLength(GB_HOLIDAYS.length);
        });
        test("should return all public holidays for FR", async () => {
            mockedAxios.get.mockResolvedValue({ data: FR_HOLIDAYS });

            const publicHolidays = await getListOfPublicHolidays(2024, "FR");
        
            expect(publicHolidays).toHaveLength(FR_HOLIDAYS.length);
        });
        test("should return all public holidays for DE", async () => {
            mockedAxios.get.mockResolvedValue({ data: DE_HOLIDAYS });

            const publicHolidays = await getListOfPublicHolidays(2024, "DE");
        
            expect(publicHolidays).toHaveLength(DE_HOLIDAYS.length);
        });
        test("should return all public holidays for NL", async () => {
            mockedAxios.get.mockResolvedValue({ data: NL_HOLIDAYS });

            const publicHolidays = await getListOfPublicHolidays(2024, "NL");
        
            expect(publicHolidays).toHaveLength(NL_HOLIDAYS.length);
        });
        test("should call API with proper arguments", async () => {
            const axiosGetSpy = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: GB_HOLIDAYS }));
            
            await getListOfPublicHolidays(2024, "GB");

            expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2024/GB`);
        });
    });
    describe("checkIfTodayIsPublicHoliday", () => {
        test("should return false", async () => {
            mockedAxios.get.mockResolvedValue({ status: 204 });
            
            const response = await checkIfTodayIsPublicHoliday("GB");

            expect(response).toBeFalsy();
        });
        test("should return true", async () => {
            mockedAxios.get.mockResolvedValue({ status: 200 });

            const response = await checkIfTodayIsPublicHoliday("GB");

            expect(response).toBeTruthy();
        });
        test("should call API with proper arguments", async () => {
            const axiosMockSpy = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ status: 200 }));

            await checkIfTodayIsPublicHoliday("GB");

            expect(axiosMockSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/GB`);
        });
    });
    describe("getNextPublicHolidays", () => {
        test("should return next public holidays for GB", async () => {
            mockedAxios.get.mockResolvedValue({ data: GB_NEXT_PUBLIC_HOLIDAYS });

            const nextPublicHolidays = await getNextPublicHolidays("GB");

            expect(nextPublicHolidays).toHaveLength(GB_NEXT_PUBLIC_HOLIDAYS.length);
        });
        test("should return next public holidays for FR", async () => {
            mockedAxios.get.mockResolvedValue({ data: FR_NEXT_PUBLIC_HOLIDAYS });

            const nextPublicHolidays = await getNextPublicHolidays("FR");

            expect(nextPublicHolidays).toHaveLength(FR_NEXT_PUBLIC_HOLIDAYS.length);
        });
        test("should return next public holidays for DE", async () => {
            mockedAxios.get.mockResolvedValue({ data: DE_NEXT_PUBLIC_HOLIDAYS });

            const nextPublicHolidays = await getNextPublicHolidays("DE");

            expect(nextPublicHolidays).toHaveLength(DE_NEXT_PUBLIC_HOLIDAYS.length);
        });
        test("should return next public holidays for NL", async () => {
            mockedAxios.get.mockResolvedValue({ data: NL_NEXT_PUBLIC_HOLIDAYS });

            const nextPublicHolidays = await getNextPublicHolidays("NL");

            expect(nextPublicHolidays).toHaveLength(NL_NEXT_PUBLIC_HOLIDAYS.length);
        });
        test("should call API with with proper arguments", async () => {
            const axiosMockSpy = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: GB_NEXT_PUBLIC_HOLIDAYS }));

            await getNextPublicHolidays("GB");

            expect(axiosMockSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/GB`);
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
});