const validStatuses = ['pending', 'completed']

const validateTodoInput = (data, isUpdate = false) => {
    const errors = []

    if (!isUpdate || data.title !== undefined) {
        if (data.title !== undefined) {
            if (typeof data.title !== 'string') {
                errors.push({
                    field: 'title',
                    message: 'Title must be a string'
                })
            } else {
                const trimmedTitle = data.title.trim()
                if (!trimmedTitle) {
                    errors.push({
                        field: 'title',
                        message: 'Title is required'
                    })
                } else if (trimmedTitle.length > 255) {
                    errors.push({
                        field: 'title',
                        message: 'Title exceeds 255 characters'
                    })
                }
            }
        } else if (!isUpdate) {
            errors.push({
                field: 'title',
                message: 'Title is required'
            })
        }
    }

    if (data.description !== undefined) {
        if (typeof data.description !== 'string') {
            errors.push({
                field: 'description',
                message: 'Description must be a string'
            })
        } else {
            const trimmedDesc = data.description.trim()
            if (trimmedDesc.length > 1000) {
                errors.push({
                    field: 'description',
                    message: 'Description exceeds 1000 characters'
                })
            }
        }
    }

    if (data.status !== undefined) {
        if (typeof data.status !== 'string' || !validStatuses.includes(data.status)) {
            errors.push({
                field: 'status',
                message: `Invalid status. Valid values: ${validStatuses.join(', ')}`
            })
        }
    }

    if (errors.length > 0) {
        const error = new Error('Validation failed')
        error.type = 'VALIDATION_ERROR'
        error.errors = errors
        error.status = 400
        throw error
    }
}

const validateId = (id) => {
    if (!Number.isInteger(Number(id)) || id < 1) {
        const error = new Error('Invalid ID format')
        error.type = 'INVALID_ID'
        error.status = 400
        throw error
    }
}

module.exports = {
    validateTodoInput,
    validateId,
    validStatuses
}