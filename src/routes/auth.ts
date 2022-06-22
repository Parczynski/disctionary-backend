import { Request, Response, Router, NextFunction } from 'express'
import { makeJWT, parseJWT } from '../core/jwt'


export const authRouter = Router()




authRouter.post( '/', ( req: Request, res: Response ) => {
    try{

        if( req.body.login !== process.env.ADMIN || req.body.password !== process.env.ADMIN_PSWD ) throw new Error( 'Wrong login or password' )

        const payload = {
            name: process.env.ADMIN
        }

        res.json( { token: makeJWT( payload, <string>process.env.SECRET ) } )


    } catch( err ) {
        if( err instanceof Error )
            res.status(403).json( { message: err.message } )
        else
            res.status(500).json( { message: 'Something wrong' } )
    }
    
})

export function authRequired( req: Request, res: Response, next: NextFunction ) {

    try {
        if( typeof req.headers.authorization === 'undefined' )  
            throw new Error( 'Unauthorized' )

        const [ , token ] = req.headers.authorization.split( ' ' )

        const payload = parseJWT( token, <string>process.env.SECRET )

        if( !payload )
            throw new Error( 'Unauthorized' )
    
        next()

    } catch( err ) {
        if( err instanceof Error )
            res.status( 401 ).json( { message: err.message } )
        else
            res.status( 500 ).json( { message: 'Something wrong' } )
    }
}