const { getPostByIdHelper } = require("../operations/dbOperations");

module.exports = async function (context, req) {
        try {
                const { id } = context.bindingData;

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: await getPostByIdHelper(id, "spGetItemById"),
                };
        } catch (error) {
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: error.message,
                };
        }
};
