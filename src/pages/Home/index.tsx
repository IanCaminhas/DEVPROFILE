import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  Icon,
  LogoutButton,
  UserAvatar,
  UserAvatarButton,
  UserGretting,
  UserInfo,
  UserInfoDetail,
  UserList,
  UserListEmpty,
  UserListHeader,
  UserName,
  UserWrapper,
} from './styles';

//se o usuario não tiver a imagem no back-end, vou usar o avatar default
//Precisamos definir a tipagem para entender como um módulo. Olhe em src/@types/index.d.ts
import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';
import { IUser } from '../../model/user';
import { api } from '../../services/api';
import { User } from '../../components/User';

interface ScreenNavigationProp {
  //screen representa a página para a qual quero ir/params são os parametros que desejo passar para a pagina que estou indo
  navigate: (screen: string, params?: unknown) => void;
}

export const Home: React.FunctionComponent = () => {
  /*
    uri é do parâmetro source
    Se não tiver user.avatar, uso do url. Senão, uso a imagem avatarDefault mesmo
    <UserAvatar
                source={user.avatar ? { uri: user.avatar_url } : avatarDefault}
              />
    ListHeaderComponent={<UserListHeader>Usuários</UserListHeader>} header da flatlist
  */
  const [users, setUsers] = React.useState<IUser[]>([]);
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  /*posso usar isso daqui para substituir o  React.useEffect e o const [users, setUsers] = React.useState<IUser[]>([]);.
  vou usar isso . Assim, nao preciso usar banco de dados para criar as telas
  const users: IUser[] = []; */

  //Quando o componente Home carregar, o próprio componente pega a lista de usuários
  React.useEffect(() => {
    const loadUsers = async () => {
      //Estou pegando os users através da rota users
      const response = await api.get('users');
      //Estou pegando as informações de todos os users com axios e armazenando no estado
      setUsers(response.data);
    };
    loadUsers();
  }, []);

  //console.log(users); -> so para visualizar se os users estavam vindo

  const handleSignOut = () => {
    Alert.alert('Tem certeza ?', 'Deseja realmente sair da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => signOut(), //esse signOut foi importado do contexto
      },
    ]);
  };

  /* Vou chamar o handleUserDetails pegando o id quando houver o click
    renderItem={({ item }) => (
          <User data={item} onPress={() => handleUserDetails(item.id)} />
        )}
  */

  const handleUserDetails = (userId: string) => {
    //A tela para onde eu vou
    //{ userId } é o objeto que contem as informações que serão repassadas para a tela userDetails
    //{ userId } -> posso pegar um ou mais parâmetros
    navigate('UserDetails', { userId });
  };

  const handleUserProfile = () => {
    navigate('UserProfile');
  };

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={handleUserProfile}>
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : avatarDefault
                }
              />
            </UserAvatarButton>
            <UserInfoDetail>
              <UserGretting>Olá,</UserGretting>
              <UserName>{user.name}</UserName>
            </UserInfoDetail>
          </UserInfo>
          <LogoutButton onPress={handleSignOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <UserList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <User data={item} onPress={() => handleUserDetails(item.id)} />
        )}
        ListHeaderComponent={<UserListHeader>Usuários</UserListHeader>}
        ListEmptyComponent={
          <UserListEmpty>Ops! Ainda não há registros.</UserListEmpty>
        }
      />
    </Container>
  );
};
