//arquivo será responsável por liberar as rotas privadas ou as abertas. Isso vai ocorrer se o usuário está autenticado ou não
//Ou seja, vai carregar as rotas abertas ou as rotas privadas
import React from 'react';
import { AuthRoutes } from './auth.routes';

//esse arquivo vai carregar ou as rotas abertas ou as rotas privadas
//Vamos verificar a cada requisão que o usuário fizer se ele está podendo acessar uma rota privada ou não
export const Routes: React.FunctionComponent = () => {
  return <AuthRoutes />;
};
