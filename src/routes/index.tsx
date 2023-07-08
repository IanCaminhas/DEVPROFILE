//arquivo será responsável por liberar as rotas privadas ou as abertas. Isso vai ocorrer se o usuário está autenticado ou não
//Ou seja, vai carregar as rotas abertas ou as rotas privadas
import React from 'react';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../pages/context/AuthContext';

//esse arquivo vai carregar ou as rotas abertas ou as rotas privadas
//Vamos verificar a cada requisão que o usuário fizer se ele está podendo acessar uma rota privada ou não
export const Routes: React.FunctionComponent = () => {
  const { user } = useAuth();
  //se o user estiver autenticado(user?.id for true), renderizo o AppRoutes... Se não tiver autenticado, renderizo AuthRoutes(autentica aí ou cria uma nova conta antes de autenticar)
  return user?.id ? <AppRoutes /> : <AuthRoutes />;
};
