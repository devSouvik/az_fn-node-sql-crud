const { getPostsHelper } = require("../operations/dbOperations");

module.exports = async function (context, req) {
        try {
                let result = await getPostsHelper("spGetItems");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: result,
                };
        } catch (err) {
                // ... error checks
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: err.message,
                };
        }
};
