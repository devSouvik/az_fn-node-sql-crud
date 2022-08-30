const { createPostHelper } = require("../operations/dbOperations");
const { responses } = require("../utility/constants");

module.exports = async function (context, req) {
        try {
                if (!req.body) {
                        context.res = {
                                status: 400,
                                body: responses.requestBodyNotFound,
                        };
                        return;
                }

                const { uname, title, content } = req.body;

                if (!uname || !title || !content) {
                        context.res = {
                                status: 400,
                                body: responses.requiredFieldsNotFound,
                        };
                        return;
                }

                await createPostHelper(req, "spInsertItem");

                context.res = {
                        status: 200 /* Defaults to 200 */,
                        body: responses.recordAdded,
                };
        } catch (err) {
                // ... error checks
                context.res = {
                        status: 500 /* Defaults to 200 */,
                        body: err.message,
                };
        }
};
