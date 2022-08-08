const { config } = require("../utility/dbconfig");
const sql = require("mssql");

module.exports = async function (context, req) {
        try {
                const { id } = context.bindingData;

                let pool = await sql.connect(config);

                await pool
                        .request()
                        .input("id", sql.Int, id)
                        .execute("spDeleteItem");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: "post deleted succesfully",
                };
        } catch (error) {
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: error.message,
                };
        }
};
