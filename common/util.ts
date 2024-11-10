interface ErrorType {
    statusCode?: string | number
    message: string
    description?: string
    body?: any
}
export const createError = ({
    statusCode,
    message,
    description,
    body,
}: ErrorType) => {
    const error: ErrorType = new Error(message)
    error.body = body
    error.statusCode = statusCode
    error.description = description
    return error
}

export function errorHandler(res: any, errorResponse: any, message: string) {
    let errorStatus: number = 500
    let errorMessage: string = errorResponse.message || message
    let errorObj: any = null
    let data: any = null

    try {
        if (errorResponse) {
            errorStatus = errorResponse?.status || errorResponse?.statusCode
            errorObj = errorResponse
            if (errorResponse?.data) errorObj = errorResponse?.data
            if (errorResponse?.body) errorObj = errorResponse?.body
            errorObj = errorObj?.data || errorObj?.statusText
            switch (errorStatus) {
                case 400:
                    errorMessage = errorMessage || 'Bad request'
                    data = []
                    break
                case 401:
                    errorMessage = errorMessage || 'Unauthorized'
                    break
                case 403:
                    errorMessage = errorMessage || 'Validation failed'
                    break
                case 404:
                    errorMessage = errorMessage || 'Not Found'
                    break
                case 404:
                    errorMessage = errorMessage || 'Request Timeout'
                    break
                case 408:
                    errorMessage = errorMessage || 'Request Timeout'
                    break
                case 409:
                    errorMessage = errorMessage || 'Conflict'
                    break
                case 440:
                    errorMessage = errorMessage || 'Session token expired'
                    break
                default:
                    errorStatus = 500
                    break
            }
        }
    } catch (e) {
        console.log('Error found in util errorHandler')
    }

    res.status(errorStatus).json({
        message: errorMessage,
        description: errorResponse?.description || errorObj,
        error: errorObj,
        data,
    })
}