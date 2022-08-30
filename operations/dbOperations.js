const { config } = require("../utility/dbconfig");
const sql = require("mssql");
const {
        recordAdded,
        recordDeleted,
        recordUpdated,
} = require("../utility/constants");

// global connection pool
sql.connect(config, (err) => {
        if (err) {
                return console.error(err);
        } else {
                return console.log("connected to database");
        }
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

let parameters;

const globalCall = (spName, recordStatus) => {
        const request = new sql.Request();

        parameters.forEach((param) => {
                if (param.output == true) {
                        request.output(param.name, param.type, param.value);
                } else {
                        request.input(param.name, param.type, param.value);
                }
        });

        request.execute(spName, (err, request) => {
                if (err) {
                        return "something went wrong : " + err.name;
                } else {
                        return recordStatus;
                }
        });
};

const getPostsHelper = (spName) => {
        try {
                const request = new sql.Request();
                let result = request.execute(spName);

                return result;
        } catch (err) {
                return err.message;
        }
};

const getPostByIdHelper = async (id, spName) => {
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

const createPostHelper = (req, spName) => {
        try {
                parameters = sqlParams(req.body);

                globalCall(spName, recordAdded);
        } catch (error) {
                return error.message;
        }
};

const updatePostHelper = async (req, id, spName) => {
        try {
                parameters = sqlParams(req.body);

                parameters.push({
                        name: "id",
                        type: sql.Int,
                        value: id,
                });

                globalCall(spName, recordUpdated);
        } catch (error) {
                return error.message;
        }
};

const deletePostHelper = (id, spName) => {
        try {
                const request = new sql.Request();
                request.input("id", sql.Int, id).execute(spName);

                return recordDeleted;
        } catch (error) {
                return error.message;
        }
};

exports.getPostsHelper = getPostsHelper;
exports.createPostHelper = createPostHelper;
exports.deletePostHelper = deletePostHelper;
exports.updatePostHelper = updatePostHelper;
exports.getPostByIdHelper = getPostByIdHelper;
exports.globalCall = globalCall;
