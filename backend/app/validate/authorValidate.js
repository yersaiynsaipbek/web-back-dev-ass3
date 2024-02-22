exports.validate = (author) => {
    const {name, surname, birthday} = author;

    if (
        typeof name !== 'string' ||
        typeof surname !== 'string' ||
        typeof birthday !== 'string'
    ) {
        const errorMessage = `The variable type is incorrect!`;
        return { valid: false, message: errorMessage };
    }

    if (name.length < 2 || name.length > 30) {
        const errorMessage = `The length of name is incorrect. The length of name is ${name} = ${name.length}`;
        return { valid: false, message: errorMessage };
    }

    if (surname.length < 2 || surname.length > 30) {
        const errorMessage = `The length of surname is incorrect. The length of name is ${surname} = ${surname.length}`;
        return { valid: false, message: errorMessage };
    }

    const [day, month, year] = birthday.split('.').map(Number);
    const author_birthday = new Date(year, month - 1, day);

    const oldest_birthday_limit = new Date("01.01.1900");
    const youngest_birthday_limit = new Date("01.01.2011");

    if (
        author_birthday < oldest_birthday_limit ||
        author_birthday > youngest_birthday_limit
    ) {
        const errorMessage = `The birthday is not allowed. The birthday is ${birthday}`;
        return { valid: false, message: errorMessage };
    }


    return { valid: true, message: "Successfully!" };
}