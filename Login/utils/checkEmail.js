const users = require("../DB/model/schema")

const userExsist = async (email) => {
    try {
        const emailExists = await users.findOne({ email: email });
        if (emailExists) {
            // console.log("Email already exists")
            return true;
        }
        else {
            // console.log("Email doesnt exists")
            false;
        }
    }
    catch (e) {
        console.log("Email check: " + e);
    }
}
module.exports = userExsist;