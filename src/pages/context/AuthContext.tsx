import React from 'react';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../../model/user';

//aqui estou mantendo as informações da autenticação em memória. Mantenho isso em AsyncStorage
interface IAuthState {
  token: string;
  user: IUser;
}

//os dados para o login
interface ICredentials {
  email: string;
  password: string;
}

//O que vai ficar de forma global nesse contexto ?
interface IAuthContext {
  user: IUser; //nome do usuario
  signIn(credentials: ICredentials): void; //method de signIn
  signOut(): void;
  updateUser(user: IUser): void;
}

interface IProps {
  children: React.ReactElement;
}

//Passo como gneric <> o IAuthContext
//para parar de dar erro, passo um objeto vazio do tipo: {} as IAuthContext
export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

//Os dados que são manipulados pelo Async storage. token é uma string(não preciso criar uma interface para tipar isso)
//userData é um objeto que precisa ser tipado(vou criar uma interface pra isso)
const tokenData = '@DevProfile:token';
const userData = '@DevProfile:user';

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = React.useState<IAuthState>({} as IAuthState);
  //Quando o componente AuthProvider carregar, buscar as informações da autenticação realizada
  React.useEffect(() => {
    async function loadAuthData() {
      const token = await AsyncStorage.getItem(tokenData);
      const user = await AsyncStorage.getItem(userData);

      //Caso tiver o user autenticado: para isso o token e o user precisam estar definidos
      if (token && user) {
        setData({ token, user: JSON.parse(user) });
        //se tem o token e o user, o usuário está logado.
        /*O header authorization será preenchido.
        Garanto que o usuário sempre vai estar com header associado para realizar as requisições.
        Assim, vai ter condições de acessar os dados da API. */
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }

    loadAuthData();
  }, []);
  //estou criando a sessão ao enviar email e senha
  const signIn = async ({ email, password }: ICredentials) => {
    //console.log('SignIn');
    try {
      //aqui estou autenticado o usuário
      const response = await api.post('sessions', {
        email,
        password,
      });
      //console.log(response.data);
      //Recebo aqui os dados do usuario ao ter realizado a autenticação
      const { token, user } = response.data;
      //Armazeno o token e o user no AsyncStorage
      await AsyncStorage.setItem(tokenData, token);
      //AsyncStorage recebe uma string. Por isso o JSON.stringify
      await AsyncStorage.setItem(userData, JSON.stringify(user));
      /*Permite definir valores padronizados para todas as requisições que vamos usar através do axios.
      Quando o usuário se autentica, colocamos o token da forma abaixo como a configuração abaixo.
      Essa configuração já fica válida para todas as requições que esse usuário logado fizer.
      */
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ token, user });
    } catch (error) {
      //throw new Error(error as string);
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais',
      );
    }
  };
  //Chamo esse method para deslogar o usuario
  const signOut = async () => {
    //Ao se deslogar da aplicação, removo as informações do banco de dados local do dispositivo
    await AsyncStorage.removeItem(tokenData);
    await AsyncStorage.removeItem(userData);
    //Apago tudo que estava em memória
    setData({} as IAuthState);
  };
  //Quando atualizo os dados de perfil do usuário, preciso atualizar os dados dele que estão de forma global
  const updateUser = async (user: IUser) => {
    await AsyncStorage.setItem(userData, JSON.stringify(user));
    setData({
      user,
      token: data.token,
    });
  };

  //disponibilizo globalmente o metodo signIn() via AuthProvider. Que no caso é o login
  //Tbm tenho o user disponivel globalmente -> ser: data.user
  //Tbm tenho globalmente o method signOut em qualquer lugar da aplicação.
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//Tipo de retorno da função: IAuthContext... Estou retornando um contexto
export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  //caso o hook seja chamado num componente que não esteja envolvido pelo provider. Portanto, preciso inibir.
  if (!context) {
    throw new Error('useAuth deve ser usado em um AuthProvider.');
  }
  return context;
};
