const createError =  () =>{

    const  error = new Error(message);
    error.statusCode = statusCode;

    throw error;
}

module.exports = createError;