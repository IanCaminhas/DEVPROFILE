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
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { InputControl } from '../../components/Form/InputControl';

//Estou defindo o tipo que vou usar no const navigation = useNavigation();
interface ScreenNavigationProp {
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

/*
  Antes usava esses inputs do caminho components/input
    <Input placeholder="Nome completo" />
    <Input placeholder="Email" />
    <Input placeholder="Senha" />
*/

export const SignUp: React.FunctionComponent = () => {
  const { handleSubmit, control } = useForm<FieldValues>();

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleSignUp = (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.passowrd,
    };
    //console.log(data); para receber no terminal
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
            <Title>Crie sua conta</Title>

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
            />

            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
            />
            <Button title="Entrar" onPress={handleSubmit(handleSignUp)} />
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
