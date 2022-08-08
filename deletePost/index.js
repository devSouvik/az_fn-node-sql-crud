const { deletePostHelper } = require("../operations/dbOperations");

module.exports = async function (context, req) {
        try {
                const { id } = context.bindingData;

                await deletePostHelper(id, "spDeleteItem");

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
