import { writeFile } from 'fs/promises'

const logger = (req, res, next) => {
    const writeLog = async () => {
        try {
            const logString = `${new Date().toISOString()} - ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}\n`

            // https://devdocs.io/node/fs#fspromiseswritefilefile-data-options

            await writeFile('Logger.log', logString, { flag: 'a' })
            console.log('Log written to Logger.log')
        } catch (error) {
            console.error('Error writing log:', error.message)
        }
    }

    writeLog()
    next()
}

export default logger
