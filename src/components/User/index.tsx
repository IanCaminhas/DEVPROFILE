import React from 'react';
import avatarDefault from '../../assets/avatar02.png';
import {
  Container,
  EmailData,
  EmailTitle,
  NameData,
  NameTitle,
  UserAvatar,
  UserDetail,
  UserEmailDetail,
  UserNameDetail,
} from './styles';
import { IUser } from '../../model/user';

interface UserProps {
  data: IUser;
  /*metodo para quando houver o click num nome específico da lista.
  Vai haver o envio do id do usuario da lista. Objetivo: os dados do usuario serem buscados na API.
  Aí vai aparecer os detalhes na página do usuario */
  onPress: () => void;
}
//estou falando que o componente tem as propriedades UserProps
export const User: React.FunctionComponent<UserProps> = ({ data, onPress }) => {
  /*
      source={data.avatar_url ? { uri: data.avatar_url } : avatarDefault} -> estou pegando o avatar do url, caso ele tenha.
      se não tiver, pego o avatar default
  */
  return (
    <Container onPress={onPress}>
      <UserDetail>
        <UserNameDetail>
          <NameTitle>NAME</NameTitle>
          <NameData>{data.name}</NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle>EMAIL</EmailTitle>
          <EmailData>{data.email}</EmailData>
        </UserEmailDetail>
      </UserDetail>
      <UserAvatar
        source={data.avatar_url ? { uri: data.avatar_url } : avatarDefault}
      />
    </Container>
  );
};
