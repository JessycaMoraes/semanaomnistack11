const connection = require('../database/connection'); //importar as conexões do banco */

module.exports = {
    async index(request, response) { //criar uma rota para listar todas os casos de uma ong
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
    
        return response.json(incidents);
    }
};