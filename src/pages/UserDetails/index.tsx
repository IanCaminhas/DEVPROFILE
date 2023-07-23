import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container } from './styles';
import { IUser } from '../../model/user';
import { api } from '../../services/api';

interface RouteParams {
  userId: string;
}

export const UserDetails: React.FunctionComponent = () => {
  //estado que contem as informações do usuário
  const [userDetails, setUserDetails] = React.useState<IUser>({} as IUser);
  const route = useRoute();
  const { userId } = route.params as RouteParams;

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

  return <Container />;
};
