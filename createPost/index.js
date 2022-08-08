const { createPostHelper } = require("../operations/dbOperations");

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

                await createPostHelper(uname, title, content, "spInsertItem");

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
