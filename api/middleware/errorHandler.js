const errorHandler = err => {
    let errors = {}
    if (err.message === 'No token detected') {
        errors['message'] = err.message
        return errors
    } else {
        errors['message'] = err.message
        return errors
    }
}

module.exports = errorHandler
