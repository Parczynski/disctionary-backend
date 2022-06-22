import Mongoose from "mongoose"

export interface IWord {
    word: string,
    meaning: string,
    phonetic: string,
    translate: string,
    examples:string,
    addDate?: Date
}

const wordSchema = new Mongoose.Schema<IWord>({
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    phonetic: {
        type: String,
        required: false
    },
    translate: {
        type: String,
        required: true
    },
    examples: {
        type: String,
        required: true
    },
    addDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export const wordModel = Mongoose.model<IWord>( 'Word', wordSchema )