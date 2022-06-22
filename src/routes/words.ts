
import express, { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { wordModel as Word, IWord } from "../models/model.word";
import { authRequired } from "./auth";

export const wordsRouter = express.Router()

declare global {
    namespace Express {
        interface Request {
            word: HydratedDocument<IWord>
        }
    }
}



/**
 * Getting all
 */
 wordsRouter.get( '/', authRequired, async ( req, res ) => {
    try{
        const words = await Word.find().sort( { addDate: -1 } )
        res.json( words )
    } catch( err ) {
        if( err instanceof Error )
            res.status(500).json( { message: err.message } )
        else
            res.status(500).json( { message: 'Something wrong' } )
    }
})

/**
 * Getting one by id
 */
wordsRouter.get( '/:id', authRequired, getWord, ( req, res ) => {
    res.send( req.word )
})


/**
 * Creating one
 */
wordsRouter.post( '/', authRequired, async ( req, res ) => {
    try {
        const data:IWord = {
            word: req.body.word,
            meaning: req.body.meaning,
            phonetic: req.body.phonetic,
            translate: req.body.translate,
            examples: req.body.examples
        }

        console.log( data )
        const word = new Word(data)

    
        const newWord = await word.save()
        res.status(201).json( newWord )
    } catch( err ) {
        if( err instanceof Error )
            res.status(400).json( { message: err.message } )
        else
            res.status(400).json( { message: 'Something wrong' } )
    }
})


/**
 * Update
 */
wordsRouter.patch( '/:id', authRequired, getWord, async ( req: Request, res ) => {
    try{ 
        console.log( req.word )
        if( 'word' in req.body ) {
            console.log( 'word' )
            req.word.word = req.body.word
        }
        if( 'meaning' in req.body ) {
            console.log( 'meaning' )
            req.word.meaning = req.body.meaning
        }
        if( 'phonetic' in req.body ) {
            console.log( 'phonetic' )
            req.word.phonetic = req.body.phonetic
        }
        if( 'translate' in req.body ) {
            console.log( 'translate' )
            req.word.translate = req.body.translate
        }
        if( 'examples' in req.body ) {
            console.log( 'examples' )
            req.word.examples = req.body.examples
        }

        console.log( req.body )
        console.log( req.word )

        const updated = await req.word.save()
        res.json(updated)
    } catch( err ) {
        if( err instanceof Error )
            res.status(400).json( { message: err.message } )
        else
            res.status(400).json( { message: 'Something wrong' } )
    }
})


/**
 * Delete one
 */
wordsRouter.delete( '/:id', authRequired, getWord, async ( req: Request, res ) => {
    try{
        await req.word.remove()
        res.json( { message: 'Word is deleted' })
    } catch( err ) {
        if( err instanceof Error )
            res.status(500).json( { message: err.message } )
        else
            res.status(500).json( { message: 'Something wrong' } )
    } 
})




async function getWord( req: Request, res: Response, next: NextFunction ) {
    try {
        let word = await Word.findById( req.params.id )
        if( word === null ) 
            return res.status( 404 ).json( { message: 'Cannot find the word' } )

        req.word = word
        next()
    } catch( err ) {
        if( err instanceof Error )
            res.status(500).json( { message: err.message } )
        else
            res.status(500).json( { message: 'Something wrong' } )
    }
}