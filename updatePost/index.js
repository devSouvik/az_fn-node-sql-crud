const { updatePostHelper } = require("../operations/dbOperations");
const {
        requestBodyNotFound,
        requiredFieldsNotFound,
        recordUpdated,
} = require("../utility/constants");

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
                                body: requiredFieldsNotFound,
                        };
                        return;
                }

                const { id } = context.bindingData;

                await updatePostHelper(req, id, "spUpdateItem");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: recordUpdated,
                };
        } catch (error) {
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: error.message,
                };
        }
};
