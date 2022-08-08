const { config } = require("../utility/dbconfig");
const sql = require("mssql");

module.exports = async function (context, req) {
        try {
                const { id } = context.bindingData;

                let pool = await sql.connect(config);

                let result = await pool
                        .request()
                        .input("id", sql.Int, id)
                        .execute("spGetItemById");

                context.res = {
                        // status: 200, /* Defaults to 200 */
                        body: result.recordset[0],
                };
        } catch (error) {
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: error.message,
                };
        }
};
