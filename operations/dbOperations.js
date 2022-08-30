const { config } = require("../utility/dbconfig");
const sql = require("mssql");
const {
        recordAdded,
        recordDeleted,
        recordUpdated,
        recordNotUpdated,
} = require("../utility/constants");

// global connection pool
sql.connect(config, (err) => {
        if (err) return console.error(err);
        console.log("SQL DATABASE CONNECTED");
});

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
                        value: requestBody.title,
                        output: false,
                },
                {
                        name: "content",
                        type: sql.VarChar,
                        value: requestBody.content,
                        output: false,
                },
        ];
        return parameters;
}

const createPostHelper = function (req, spName) {
        try {
                let parameters = sqlParams(req.body);

                const request = new sql.Request();

                parameters.forEach((param) => {
                        if (param.output == true) {
                                request.output(
                                        param.name,
                                        param.type,
                                        param.value
                                );
                        } else {
                                request.input(
                                        param.name,
                                        param.type,
                                        param.value
                                );
                        }
                });

                request.execute(spName, (err, request) => {
                        if (err) {
                                return "something went wrong : " + err.name;
                        } else {
                                return recordAdded;
                        }
                });
        } catch (error) {
                return error.message;
        }
};

const getPostsHelper = function (spName) {
        try {
                const request = new sql.Request();
                let result = request.execute(spName);

                return result;
        } catch (err) {
                return err.message;
        }
};

const getPostByIdHelper = async function (id, spName) {
        try {
                const request = new sql.Request();

                let result = await request
                        .input("id", sql.Int, id)
                        .execute(spName);
                return result.recordset;
        } catch (error) {
                return error.message;
        }
};

const deletePostHelper = function (id, spName) {
        try {
                const request = new sql.Request();
                request.input("id", sql.Int, id).execute(spName);

                return recordDeleted;
        } catch (error) {
                return error.message;
        }
};

const updatePostHelper = async function (req, id, spName) {
        try {
                let parameters = sqlParams(req.body);
                const request = new sql.Request();

                parameters.push({
                        name: "id",
                        type: sql.Int,
                        value: id,
                });

                parameters.forEach((param) => {
                        if (param.output == true) {
                                request.output(
                                        param.name,
                                        param.type,
                                        param.value
                                );
                        } else {
                                request.input(
                                        param.name,
                                        param.type,
                                        param.value
                                );
                        }
                });

                request.execute(spName, (err, request) => {
                        if (err) {
                                return "something went wrong : " + err.name;
                        } else {
                                return recordUpdated;
                        }
                });
        } catch (error) {
                return error.message;
        }
};

exports.getPostsHelper = getPostsHelper;
exports.createPostHelper = createPostHelper;
exports.deletePostHelper = deletePostHelper;
exports.updatePostHelper = updatePostHelper;
exports.getPostByIdHelper = getPostByIdHelper;
