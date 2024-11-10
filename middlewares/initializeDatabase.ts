import { Firestore } from '@google-cloud/firestore'
import { Request, Response } from 'express'
import { createError, errorHandler } from '../common/util'

async function initializeFirestore(req: Request, res: Response) {
    try {
        const db = new Firestore({
            projectId: 'airasia-digitaltripfiles-dev',
            keyFilename: './secret/airasia-digitaltripfiles-dev-key.json',
        })

        return (res.locals.firestoreDb = db)
    } catch (error: any) {
        const exception = createError({
            statusCode: 500,
            message: 'FIRESTORE CONNECTION FAILED',
            description:
                'Something went wrong while establishing connection to the firestore.',
        })

        return errorHandler(res, exception, 'Firestore Connection Error')
    }
}

export { initializeFirestore }
