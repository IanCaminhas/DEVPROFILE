import axios from 'axios';

//nesse objeto passo parametros de conexao e configuracao
export const api = axios.create({
  baseURL: 'http://192.168.100.12:3333',
});
