const generatePassword = (name, dateOfBirth) => {
    const password = name.split(' ').join('').toLowerCase() + "@" + dateOfBirth
    return password
}

module.exports = generatePassword