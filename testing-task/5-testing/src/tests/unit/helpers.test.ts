import { validateInput, shortenPublicHoliday } from "../../helpers";

describe("Helpers", () => {
    describe("validateInput", () => {
        test("should throw Error 'Country provided is not supported'", () => {
                expect(() => validateInput({ year: 2025, country: "RS" })).toThrow('Country provided is not supported, received: RS');
        });
        test("shoud throw Error 'Invalid year provided'", () => {
                expect(() => validateInput({ year: 2025, country: "GB" })).toThrow("Year provided not the current, received: 2025");
        });
        test("should return true", () => {
                expect(() => validateInput({ year: 2024, country: "GB" })).toBeTruthy();
        });
        test("should return true without passed parameters", () => {
                expect(() => validateInput({})).toBeTruthy();
        });
        test("should return country error If passed year is valid", () => {
                expect(() => validateInput({ year: 2024, country: "USA" })).toThrow('Country provided is not supported, received: USA');
        });
    });
    describe("shortenPublicHoliday", () => {
        test("should return New Year's Day 2025-01-01", () => {
            const holiday = {
                "date": "2025-01-01",
                "localName": "New Year's Day",
                "name": "New Year's Day",
                "countryCode": "GB",
                "fixed": false,
                "global": true,
                "counties": null,
                "launchYear": null,
                "types": [
                  "Public"
                ]
              }
            expect(shortenPublicHoliday(holiday)).toEqual({
                "date": "2025-01-01",
                "localName": "New Year's Day",
                "name": "New Year's Day",
            });
        });
        test("should return Saint Patrick's Day 2025-03-17", () => {
            const holiday = {
                "date": "2025-03-17",
                "localName": "Saint Patrick's Day",
                "name": "Saint Patrick's Day",
                "countryCode": "GB",
                "fixed": true,
                "global": false,
                "counties": [
                  "GB-NIR"
                ],
                "launchYear": null,
                "types": [
                  "Public"
                ]
              }
            expect(shortenPublicHoliday(holiday)).toEqual({
                "date": "2025-03-17",
                "localName": "Saint Patrick's Day",
                "name": "Saint Patrick's Day",
            });
        });
        test("should return Easter Monday 2025-04-21", () => {
            const holiday = {
                "date": "2025-04-21",
                "localName": "Easter Monday",
                "name": "Easter Monday",
                "countryCode": "GB",
                "fixed": false,
                "global": false,
                "counties": [
                  "GB-ENG",
                  "GB-WLS",
                  "GB-NIR"
                ],
                "launchYear": null,
                "types": [
                  "Public"
                ]
              }
            expect(shortenPublicHoliday(holiday)).toEqual({
                "date": "2025-04-21",
                "localName": "Easter Monday",
                "name": "Easter Monday",
            });
        });
    });
});