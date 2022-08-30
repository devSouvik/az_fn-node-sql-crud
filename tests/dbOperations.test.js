const config = require("../utility/dbconfig");

const mockSqlConnect = jest.fn();
const mockGlobalCall = jest.fn();

test("test db connection", () => {
        mockSqlConnect.mockReturnValue("connected to database");
});

test("test global call function", () => {
        function globalCall(spName, recordStatus) {
                return recordStatus;
        }
});
