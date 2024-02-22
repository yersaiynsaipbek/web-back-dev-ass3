exports.validate = (genre) => {
    const { name } = genre;

    if (typeof name !== 'string') {
        const errorMessage = `The variable type is incorrect!`;
        return { valid: false, message: errorMessage };
    }

    if (name.length < 2 || name.length > 30) {
        const errorMessage = `The length of title is incorrect. The length of title is ${name} = ${name.length}`;
        return { valid: false, message: errorMessage };
    }

    return { valid: true, message: "Successfully!" };
}