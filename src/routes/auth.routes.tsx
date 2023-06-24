import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

//Objeto que retorna duas propriedades: Screen e Navigator
//As rotas desse objeto não exigem autenticação,ou seja, são as rotas abertas
const Auth = createNativeStackNavigator();

/*
  Para cada tela usada no Navigator, vou usar o Stack.Screen.
  Screen já traz uma estilização. Posso mudar essa estilização.
  Posso tirar o header usando o objeto { headerShown: false }

  Tem como configurar o Auth.Navigator para ele carregar a
  página primária, ou seja, a primeira página a ser carregada.
  Uso a propriedade initialRouteName. Essa propriedade recebe o nome da página
*/
export const AuthRoutes: React.FunctionComponent = () => {
  return (
    <Auth.Navigator
      initialRouteName="SignUp"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};
