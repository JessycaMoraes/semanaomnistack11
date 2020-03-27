import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.105:3333' //como está no celular, precisa colocar o IP da máquina. Pega o IP que tá sendo exibida no expo
});

export default api;