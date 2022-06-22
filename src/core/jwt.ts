import { createHmac } from 'crypto'

/**
 * Generate JWT with a given payload
 * @param {Object} payload 
 * @returns {string}
 */
export function makeJWT( payload: Object, secret: string ) {
    
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    const headerString = Buffer.from( JSON.stringify( header ) ).toString('base64')
    const payloadString = Buffer.from( JSON.stringify( payload ) ).toString('base64')
    const signature = createHmac('sha256', secret )
    .update( `${headerString}.${payloadString}` )
    .digest('base64');

    return `${headerString}.${payloadString}.${signature}`
}


/**
 * Parse payload from a given JWT
 * @param {string} token 
 * @param {string} secret
 */
export function parseJWT( token: string, secret: string ): false | Object {

    const [ headerString, payloadString, signature ] = token.split( '.' )

    if( signature !== createHmac('sha256', secret ).update( `${headerString}.${payloadString}` ).digest('base64') )
        return false
    
    const payload = JSON.parse( atob( payloadString ) )
    return payload

}


module.exports = { makeJWT, parseJWT }