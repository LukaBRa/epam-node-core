import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";

describe("Nager.Date API", () => {
    describe("/PublicHolidays", () => {
        test("should return public holidays for GB in 2025", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get("/PublicHolidays/2025/GB");
        
            expect(status).toEqual(200);
            expect(body).not.toHaveLength(0);
        });
        test("should return public holidays for RS in 2026", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get("/PublicHolidays/2026/RS");
        
            expect(status).toEqual(200);
            expect(body).not.toHaveLength(0);
        });
        test("should return error for unknown country", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get("/PublicHolidays/2026/SDFGA");
        
            expect(status).toEqual(404);
        })
    });
    describe("/IsTodayPublicHoliday", () => {
        test("should return false for GB", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get("/IsTodayPublicHoliday/GB");
        
            expect(status).toEqual(204);
        });
        test("should return false RS", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get("/IsTodayPublicHoliday/RS");
        
            expect(status).toEqual(204);
        });
        test("should return error for unknown country", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get("/IsTodayPublicHoliday/SDFGA");
        
            expect(status).toEqual(404);
        })
    });
});