import React from 'react';
import { api } from '../../services/api';
import { Alert } from 'react-native';

//os dados para o login
interface ICredentials {
  email: string;
  password: string;
}

//O que vai ficar de forma global nesse contexto ?
interface IAuthContext {
  name: string; //nome do usuario
  signIn(credentials: ICredentials): void; //method de signIn
}

interface IProps {
  children: React.ReactElement;
}

//Passo como gneric <> o IAuthContext
//para parar de dar erro, passo um objeto vazio do tipo: {} as IAuthContext
export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  //estou criando a sessão ao enviar email e senha
  const signIn = async ({ email, password }: ICredentials) => {
    //console.log('SignIn');
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      //throw new Error(error as string);
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais',
      );
    }
  };
  //disponibilizo globalmente o metodo signIn() via AuthProvider
  return (
    <AuthContext.Provider value={{ name: 'Ian', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
