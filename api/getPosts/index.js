const { config } = require("../utility/dbconfig");
const sql = require("mssql");

module.exports = async function (context, req) {
        try {
                let pool = await sql.connect(config);

                let result = await pool.request().execute("spGetItems");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: result.recordset,
                };
        } catch (err) {
                // ... error checks
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: err.message,
                };
        }
};
