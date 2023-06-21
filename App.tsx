import React from 'react';
import { Home } from './src/pages/Home';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

const App: React.FunctionComponent = () => {
  //Aqui já tenho as duas fontes disponíveis para trabalhar no projeto
  //fontsLoaded é um array que carrega o momento em que a fonte foi carregada no projeto
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  //A tela de splash screen vai ficar mantida enquanto as fontes não forem carregadas. Retorna esse componente até as fontes serem carregadas
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //antes de retornar toda a aplicação, preciso carregar as fontes referentes às instruções acima
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
