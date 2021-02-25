const getCurrentWeek = require("../controllers/getCurrentWeek");

describe("Testing Suite for getCurrentWeek", () => {
    describe("Positive Tests", () => {
        test("Should return an object", () => {
            const returned = getCurrentWeek();
            expect(typeof returned).toBe("object");
        })
        test("Should have startOfWeek property", () => {
            const returned = getCurrentWeek();
            expect(returned.hasOwnProperty("startOfWeek")).toBe(true)
        })
        test("Should have endOfWeek property", () => {
            const returned = getCurrentWeek();
            expect(returned.hasOwnProperty("endOfWeek")).toBe(true)
        })
        test("Should have days property", () => {
            const returned = getCurrentWeek();
            expect(returned.hasOwnProperty("days")).toBe(true)
        })
    })
})