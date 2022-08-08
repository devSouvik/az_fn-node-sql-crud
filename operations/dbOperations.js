const { config } = require("../utility/dbconfig");
const sql = require("mssql");

// global connection pool
// sql.connect(config, (err) => {
//         if (err) return console.error(err);
//         console.log("SQL DATABASE CONNECTED");
// });

function sqlParams(requestBody) {
        let parameters = [
                {
                        name: "uname",
                        type: sql.VarChar,
                        value: requestBody.uname,
                        output: false,
                },
                {
                        name: "title",
                        type: sql.VarChar,
                        value: requestBody.Title,
                        output: false,
                },
                {
                        name: "body",
                        type: sql.VarChar,
                        value: requestBody.body,
                        output: false,
                },
        ];
        return parameters;
}

const createPostHelper = async function (uname, title, content, spName) {
        try {
                // let parameters = sqlParams(req.body);
                let pool = await sql.connect(config);

                await pool
                        .request()
                        .input("uname", sql.VarChar, uname)
                        .input("title", sql.VarChar, title)
                        .input("content", sql.VarChar, content)
                        .execute(spName);

                // return request;
        } catch (error) {
                return error.message;
        }
};

const getPostsHelper = async function (spName) {
        try {
                let pool = await sql.connect(config);
                let result = await pool.request().execute(spName);
                return result.recordset;
        } catch (err) {
                return err.message;
        }
};

const deletePostHelper = async function (id, spName) {
        try {
                let pool = await sql.connect(config);

                await pool.request().input("id", sql.Int, id).execute(spName);

                return "post deleted succesfully";
        } catch (error) {
                return error.message;
        }
};

const updatePostHelper = async function (id, uname, title, content, spName) {
        try {
                let pool = await sql.connect(config);

                await pool
                        .request()
                        .input("id", sql.Int, id)
                        .input("uname", sql.VarChar, uname)
                        .input("title", sql.VarChar, title)
                        .input("content", sql.VarChar, content)
                        .execute(spName);

                return "record updated successfully";
        } catch (error) {
                return error.message;
        }
};

exports.getPostsHelper = getPostsHelper;
exports.createPostHelper = createPostHelper;
exports.deletePostHelper = deletePostHelper;
exports.updatePostHelper = updatePostHelper;
