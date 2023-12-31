import React from 'react';
import {
  BackToSignIn,
  BackToSignInTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
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

//Estou defindo o tipo que vou usar no const navigation = useNavigation();
interface ScreenNavigationProp {
  goBack: () => void;
  navigate(screen: string): void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  token: yup.string().uuid('Código inválido').required('Informe o código'),
  password: yup.string().required('Informe a nova senha'),
  password_confirmation: yup //password_confirmation tem que ter o mesmo conteúdo de password
    .string()
    .oneOf([yup.ref('password'), null], 'Confirmação incorreta'), //ref = vai ser usada como referência o campo password
});

export const ResetPassword: React.FunctionComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

  const handleResetPassword = async (form: IFormInputs) => {
    const data = {
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    try {
      await api.post('password/reset', data);

      Alert.alert(
        'Senha redefinida',
        'A senha foi redefinida com sucesso. Efetue login para acessar',
      );
      navigate('SignIn');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro ao resetar senha',
        'Ocorreu um erro ao resetar sua senha. Tente novamente.',
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
          <Content>
            <Logo source={logo} />
            <Title>Redefinir a senha</Title>

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="token"
              placeholder="Código"
              error={errors.token && (errors.token.message as string)}
            />

            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
              error={errors.password && (errors.password.message as string)}
            />

             <InputControl
              control={control}
              name="password_confirmation"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
              error={
                errors.password_confirmation &&
                (errors.password_confirmation.message as string)
              }
            />
            <Button
              title="Entrar"
              onPress={handleSubmit(handleResetPassword)}
            />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignIn
        onPress={() => {
          goBack();
        }}
      >
        <Icon name="arrow-left" />
        <BackToSignInTitle>Voltar para logon</BackToSignInTitle>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};
