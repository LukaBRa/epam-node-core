import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays
} from "../../services/public-holidays.service";
import {
    validateInput
} from "../../helpers";

describe("Public holidays service integration tests", () => {
    describe("getListOfPublicHolidays", () => {
        test("should return all GB public holidays", async () => {

            const publicHolidays = await getListOfPublicHolidays(2024, "GB");
    
            expect(publicHolidays).not.toHaveLength(0);
    
        });
        test("should return all FR public holidays", async () => {
    
            const publicHolidays = await getListOfPublicHolidays(2024, "FR");
    
            expect(publicHolidays).not.toHaveLength(0);
    
        });
        test("should return all DE public holidays", async () => {
    
            const publicHolidays = await getListOfPublicHolidays(2024, "DE");
    
            expect(publicHolidays).not.toHaveLength(0);
    
        });
        test("should return all NL public holidays", async () => {
    
            const publicHolidays = await getListOfPublicHolidays(2024, "NL");
    
            expect(publicHolidays).not.toHaveLength(0);
    
        });
        test("should throw error for invalid year", async () => {
            try {
                await getListOfPublicHolidays(2023, "GB");
            } catch (error: any) {
                expect(error.toString()).toEqual("Error: Year provided not the current, received: 2023");
            }
        })
        test("should throw error for unsupported country", async () => {
            try {
                await getListOfPublicHolidays(2024, "RS");
            } catch (error: any) {
                expect(error.toString()).toEqual("Error: Country provided is not supported, received: RS");
            }
        })
    });
    describe("checkIfTodayIsPublicHoliday", () => {
        test("should return false for GB", async () => {
            const response = await checkIfTodayIsPublicHoliday("GB");
            expect(response).toBeFalsy();
        });
        test("should return false for FR", async () => {
            const response = await checkIfTodayIsPublicHoliday("FR");
            expect(response).toBeFalsy();
        });
        test("should return false for DE", async () => {
            const response = await checkIfTodayIsPublicHoliday("DE");
            expect(response).toBeFalsy();
        });
        test("should return false for NL", async () => {
            const response = await checkIfTodayIsPublicHoliday("NL");
            expect(response).toBeFalsy();
        });
        test("should throw error for unsupported country", async () => {
            try {
                await checkIfTodayIsPublicHoliday("RS");
            } catch (error: any) {
                expect(error.toString()).toEqual("Error: Country provided is not supported, received: RS");
            }
        });
    });
    describe("getNextPublicHolidays", () => {
        test("should return next public holidays for GB", async () => {
            const nextHolidays = await getNextPublicHolidays("GB");
            expect(nextHolidays).not.toHaveLength(0);
        });
        test("should return next public holidays for FR", async () => {
            const nextHolidays = await getNextPublicHolidays("FR");
            expect(nextHolidays).not.toHaveLength(0);
        });
        test("should return next public holidays for DE", async () => {
            const nextHolidays = await getNextPublicHolidays("DE");
            expect(nextHolidays).not.toHaveLength(0);
        });
        test("should return next public holidays for NL", async () => {
            const nextHolidays = await getNextPublicHolidays("NL");
            expect(nextHolidays).not.toHaveLength(0);
        });
        test("shoud throw error for unsupported country", async () => {
            try {
                await getNextPublicHolidays("RS");
            } catch (error: any) {
                expect(error.toString()).toEqual("Error: Country provided is not supported, received: RS");
            }
        });
    });
});