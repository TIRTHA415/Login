const getUserByEmail = async (email) => {
  try {
    const user = await users.findOne({ email: email });
    return user;
  } catch (e) {
    console.log("Login error " + e.message);
  }
};

module.exports = getUserByEmail;
