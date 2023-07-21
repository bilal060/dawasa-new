const generatePassword = name => {
    let password = `${name}@${Math.floor(1000 + Math.random() * 9000)}`;
    return password;
};

module.exports = generatePassword;