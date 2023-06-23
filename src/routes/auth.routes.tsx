import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

//Objeto que retorna duas propriedades: Screen e Navigator
//As rotas desse objeto não exigem autenticação,ou seja, são as rotas abertas
const Auth = createNativeStackNavigator();

export const AuthRoutes: React.FunctionComponent = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

//arquivo será responsável por liberar as rotas privadas ou as abertas. Isso vai ocorrer se o usuário está autenticado ou não
