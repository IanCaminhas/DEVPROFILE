import React from 'react';
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

export const Home: React.FunctionComponent = () => {
  /*
    uri é do parâmetro source
    Se não tiver user.avatar, uso do url. Senão, uso a imagem avatarDefault mesmo
    <UserAvatar
                source={user.avatar ? { uri: user.avatar_url } : avatarDefault}
              />
  */
  const [users, setUsers] = React.useState<IUser[]>([]);
  const { user, signOut } = useAuth();
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

  console.log(users);

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

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={() => {}}>
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
    </Container>
  );
};
