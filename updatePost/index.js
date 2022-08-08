const { updatePostHelper } = require("../operations/dbOperations");

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

                await updatePostHelper(
                        id,
                        uname,
                        title,
                        content,
                        "spUpdateItem"
                );

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
