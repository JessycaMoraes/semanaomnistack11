const crypto = require('crypto'); //para criar o id
const connection = require('../database/connection'); //importar as conexões do banco */

module.exports = {
    async index (request, response) { //criar uma rota para listar todas as ongs do banco de dados
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); //para criar o id

        await connection('ongs').insert({ //async e await - vai aguardar finalizar inserir p/ depois continuar o código
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};