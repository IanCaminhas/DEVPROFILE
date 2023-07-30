import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Home';
import { UserDetails } from '../pages/UserDetails';
import { UserProfile } from '../pages/UserProfile';
import { UserProfileEdit } from '../pages/UserProfileEdit';

//Objeto que retorna duas propriedades: Screen e Navigator
//As rotas desse objeto exigem autenticação. São rotas privadas
const App = createNativeStackNavigator();

/*
  Para cada tela usada no Navigator, vou usar o Stack.Screen.
  Screen já traz uma estilização. Posso mudar essa estilização.
  Posso tirar o header usando o objeto { headerShown: false }

  Tem como configurar o Auth.Navigator para ele carregar a
  página primária, ou seja, a primeira página a ser carregada.
  Uso a propriedade initialRouteName. Essa propriedade recebe o nome da página
*/
export const AppRoutes: React.FunctionComponent = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="UserDetails" component={UserDetails} />
      <App.Screen name="UserProfile" component={UserProfile} />
      <App.Screen name="UserProfileEdit" component={UserProfileEdit} />
    </App.Navigator>
  );
};
