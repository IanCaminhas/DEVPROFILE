import React from 'react';
import {
  Container,
  Content,
  GoBackButton,
  Header,
  HeaderTitle,
  HeaderTop,
  Icon,
  Logo,
  PhotoContainer,
  Title,
  UserAvatar,
} from './styles';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { InputControl } from '../../components/Form/InputControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import avatarDefault from '../../assets/avatar02.png';

interface ScreenNavigationProp {
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido').required('Informe o email'),
});

export const UserProfileEdit: React.FunctionComponent = () => {
  const { user } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleProfileEdit = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
    };

    try {
      await api.put('profile', data);

      Alert.alert(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados.',
      );

      //estou indo para a pagina de perfil quando as informações já atualizadas
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro ao atualizar',
        'Ocorreu um erro ao atualizar o perfil. Tente novamente.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Header>
            <HeaderTop>
              <GoBackButton onPress={goBack}>
                <Icon name="chevron-left" />
              </GoBackButton>
              <HeaderTitle>Seu perfil</HeaderTitle>
            </HeaderTop>
            <PhotoContainer>
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : avatarDefault
                }
              />
            </PhotoContainer>
          </Header>

          <Content>
            <Logo source={logo} />
            <Title>Editar dados do perfil</Title>

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
              error={errors.name && (errors.name.message as string)}
            />

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email && (errors.email.message as string)}
            />
            <Button title="Entrar" onPress={handleSubmit(handleProfileEdit)} />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
