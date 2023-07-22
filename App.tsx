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
import { AuthProvider } from './src/pages/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
  //coloco o <AuthContext.Provider> em torno do <Route />... Assim, qualquer rota vai exigir a autenticação
  //GestureHandlerRootView vai sempre ocupar 100% de todas as telas
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
