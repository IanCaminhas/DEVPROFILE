import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Content,
  ContentTitle,
  EmailData,
  EmailTitle,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
  NameData,
  NameTitle,
  UserAvatar,
  UserDetailAvatar,
  UserEmailDetail,
  UserNameDetail,
} from './styles';
import { IUser } from '../../model/user';
import { api } from '../../services/api';
import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../context/AuthContext';

interface RouteParams {
  userId: string;
}

interface ScreenNavigationProp {
  //volta para a tela anterior
  goBack: () => void;
}

export const UserDetails: React.FunctionComponent = () => {
  //estado que contem as informações do usuário
  const [userDetails, setUserDetails] = React.useState<IUser>({} as IUser);
  const route = useRoute();
  const { userId } = route.params as RouteParams;
  const { user } = useAuth();
  const { goBack } = useNavigation<ScreenNavigationProp>();

  //console.log(route);
  //o proprio eslint destaca a dependência quando ela não está sendo usada:[]
  //Qual vai ser a dependência ? o userId
  //Toda vez que o userId for alterado, o useEffect precisa ser reexecutado
  React.useEffect(() => {
    const loadUser = async () => {
      const response = await api.get(`/users/${userId}`);
      setUserDetails(response.data);
    };
    loadUser();
  }, [userId]);

  /*
    <GoBackButton>
          <Icon name="chevron-left" />
        </GoBackButton>
        volta para a tela anterior
  */

  return (
    <Container>
      <Header>
        <GoBackButton onPress={goBack}>
          <Icon name="chevron-left" />
        </GoBackButton>
        <HeaderTitle>Usuários</HeaderTitle>
        <UserAvatar
          source={user.avatar_url ? { uri: user.avatar_url } : avatarDefault}
        />
      </Header>
      <Content>
        <ContentTitle>Detalhes do usuário</ContentTitle>
        <UserDetailAvatar
          source={
            userDetails.avatar_url
              ? { uri: userDetails.avatar_url }
              : avatarDefault
          }
        />
        <UserNameDetail>
          <NameTitle>NAME</NameTitle>
          <NameData>{userDetails.name}</NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle>EMAIL</EmailTitle>
          <EmailData>{userDetails.email}</EmailData>
        </UserEmailDetail>
      </Content>
    </Container>
  );
};
