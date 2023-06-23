import React, { useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { Routes } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FunctionComponent = () => {
  //Aqui já tenho as duas fontes disponíveis para trabalhar no projeto
  //fontsLoaded é um array que carrega o momento em que a fonte foi carregada no projeto
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  //A tela de splash screen vai ficar mantida enquanto as fontes não forem carregadas. Retorna esse componente até as fontes serem carregadas
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  //antes de retornar toda a aplicação, preciso carregar as fontes referentes às instruções acima
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
