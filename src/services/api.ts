import axios from 'axios';

//nesse objeto passo parametros de conexao e configuracao
export const api = axios.create({
  baseURL: 'http://10.0.0.196:3333',
});
