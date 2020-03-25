const connection = require('../database/connection'); //importar as conexões do banco */

module.exports = {
    async index(request, response) { //criar uma rota para listar todos os casos do banco de dados
        const { page = 1 } = request.query; //paginação, para não retornar todos os incidentes de uma vez, por padrão coloca 1

        const [count] = await connection('incidents').count(); //conta quantos casos tem no total
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') /*relaciona dados de 2 tabelas 
            e traz todos os dados da ong relacionada c/ o incidente especificado*/
            .limit(5) //retorna 5 casos
            .offset((page - 1) * 5) //pula 5 casos por página
            .select([
                'incidents.*', //traz todos os dados dessa tabela
                'ongs.name', //daqui pra baixo traz só os dados especificados da tab. ong, senão vai subscrever ID
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
    
        response.header('X-Total-Count', count['count(*)']); //retorna pelo cabeçalho da resposta da requisição, é meio que padrão
        //o frontend consegue saber tbm o total de casos

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; /*guarda informações do contexto dessa requisição, dados de autenticação do usuário, 
        localização*/
        
        const [id] = await connection('incidents').insert({ //outra forma de pegar o id
            title,
            description,
            value,
            ong_id,
        })
        
        /*const result = await connection('incidents').insert({ //outra forma de pegar o id, pegando a primeira posicao do vetor
        const id = result[0];*/

        return response.json({ id });
    },

    async delete(request, response) { //criar uma rota para listar todas as ongs do banco de dados
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id) //id igual ao outo id
            .select('ong_id')
            .first();
        
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};