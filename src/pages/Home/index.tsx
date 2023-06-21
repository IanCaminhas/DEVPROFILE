import React from 'react';
import {
  Container,
  Header,
  Icon,
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

export const Home: React.FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={avatarDefault} />
            </UserAvatarButton>
            <UserInfoDetail>
              <UserGretting>Olá,</UserGretting>
              <UserName>Ian</UserName>
            </UserInfoDetail>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
};
