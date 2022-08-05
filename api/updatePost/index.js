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

                if (!uname && !content && !title) {
                        context.res = {
                                status: 400,
                                body: "please pass a  uname, title and a content",
                        };
                        return;
                }

                const { id } = context.bindingData;

                let pool = await sql.connect(config);

                await pool
                        .request()
                        .input("id", sql.Int, id)
                        .input("uname", sql.VarChar, uname)
                        .input("title", sql.VarChar, title)
                        .input("content", sql.VarChar, content)

                        .execute("spUpdateItem");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: "record updated successfully",
                };
        } catch (error) {
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: error.message,
                };
        }
};
