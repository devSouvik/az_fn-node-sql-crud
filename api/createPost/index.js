const { config } = require("../utility/dbconfig");
const sql = require("mssql");

module.exports = async function (context, req) {
        try {
                if (!req.body) {
                        context.res = {
                                status: 400,
                                body: "please pass a request body",
                        };
                        return;
                }

                const { uname, title, content } = req.body;

                if (!uname || !title || !content) {
                        context.res = {
                                status: 400,
                                body: "please pass all the required fields",
                        };
                        return;
                }

                let pool = await sql.connect(config);

                await pool
                        .request()
                        .input("uname", sql.NVarChar, uname)
                        .input("title", sql.NVarChar, title)
                        .input("content", sql.NVarChar, content)
                        .execute("spInsertItem");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: "record added successfully",
                };
        } catch (err) {
                // ... error checks
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: err.message,
                };
        }
};
