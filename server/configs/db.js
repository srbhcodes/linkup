import mongoose from 'mongoose';

function buildMongoUri(rawUri, dbName) {
    const raw = rawUri.trim()
    const [beforeQuery, query] = raw.split('?')

    const protoIdx = beforeQuery.indexOf('://')
    const hostStart = protoIdx === -1 ? 0 : protoIdx + 3
    const firstSlashAfterHost = beforeQuery.indexOf('/', hostStart)

    // If there is no "/" after the host, there's no db in the URI.
    if (firstSlashAfterHost === -1) {
        const base = `${beforeQuery}/${dbName}`
        return query ? `${base}?${query}` : base
    }

    // If URI ends with "/", the db is not specified.
    if (beforeQuery.endsWith('/')) {
        const base = `${beforeQuery}${dbName}`
        return query ? `${base}?${query}` : base
    }

    // A path already exists (likely the db name). Keep as-is.
    return raw
}

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log('Database connected'))
        const rawUri = process.env.MONGODB_URI
        if (!rawUri) throw new Error('MONGODB_URI is missing')
        const dbName = (process.env.MONGODB_DB || 'linkup').trim()
        const uri = buildMongoUri(rawUri, dbName)
        await mongoose.connect(uri)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB