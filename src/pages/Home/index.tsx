import React from 'react';
import { Container, Header } from './styles';

//se o usuario não tiver a imagem no back-end, vou usar o avatar default
import avatarDefault from '../../assets/avatar02.png';

export const Home: React.FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <Userwrapper>
          <UserInfo>
            <UserAvatarButton onPress={}>
                <userAvatar source={avatarDefault} />
            </ UserAvatarButton>
            <UserInfoDetail>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Ian</UserName>
            </UserInfoDetail>
          </UserInfo>
        </Userwrapper>
      </Header>
    </Container>
  );
};
