import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { wordsRouter } from './routes/words'
import { authRouter } from './routes/auth'
import mongoose from 'mongoose'



try{

    dotenv.config()
    const url = <string>process.env.DB_URL
    mongoose.connect( url )

    const db = mongoose.connection

    db.on( 'error', ( error ) => console.error( error ) )
    db.once( 'open', () => console.log( 'Connected to database' ) )

    const app = express()
    app.use( cors())
    app.use( express.json() )
    app.use( '/words', wordsRouter )
    app.use( '/auth', authRouter )
    app.listen( process.env.APP_PORT, () => console.log( `Backend is ready on port ${process.env.APP_PORT}` ) )
} catch( err ) {

}

