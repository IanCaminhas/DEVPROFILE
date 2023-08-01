import React from 'react';
import {
  Container,
  Content,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
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
  //senha atual
  old_password: yup.string().required('Campo obrigatório.'),
  //Nova senha -> Confirmação da senha. Essa confirmação de senha é com base no password. .oneOf([yup.ref('password'), 'Confirmação incorreta'])
  password: yup
    .string()
    .required('Campo obrigatório.')
    .oneOf([yup.ref('password'), 'Confirmação incorreta.']),
});

export const UserProfilePassword: React.FunctionComponent = () => {
  const { user, updateUser } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleUpdatePassword = async (form: IFormInputs) => {
    const data = {
      name: user.name,
      email: user.email,
      old_password: form.old_password,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    try {
      //Estou enviando os dados(data) para a rota que representa a atualização dos dados de perfil do user.
      const response = await api.put('profile', data);
      updateUser(response.data); //esse metodo é do nosso contexto. estou pegando do useAuth
      Alert.alert('Senha atualizada', 'Senha atuaizada com sucesso.');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro ao atualizar',
        'Ocorreu um erro ao atualizar a senha. Tente novamente.',
      );
    }
  };
  //secureTextEntry -> tudo que for digiado, não ser visível
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
            <GoBackButton onPress={goBack}>
              <Icon name="chevron-left" />
            </GoBackButton>
            <HeaderTitle>Seu perfil</HeaderTitle>
            <UserAvatar
              source={
                user.avatar_url ? { uri: user.avatar_url } : avatarDefault
              }
            />
          </Header>
          <Content>
            <Title>Alterar senha</Title>

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="old_password"
              placeholder="Senha atual"
              error={
                errors.old_password && (errors.old_password.message as string)
              }
            />

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="password"
              placeholder="Nova senha"
              error={errors.password && (errors.password.message as string)}
            />

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="password_confirmation"
              placeholder="Confirmar senha"
              error={
                errors.password_confirmation &&
                (errors.password_confirmation.message as string)
              }
            />

            <Button
              title="Salvar alterações"
              onPress={handleSubmit(handleUpdatePassword)}
              disabled={
                !!errors.old_password ||
                !!errors.password ||
                !!errors.password_confirmation
              }
            />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
