import React from 'react';
import {
  Container,
  Content,
  Title,
  Logo,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  CreateAccount,
  CreateAccountTitle,
  Icon,
} from './styles';
import { Input } from '../../components/Form/Input';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';

/*
Quando o usuario usa o teclado do celular, a página pode fica encurtada.
Solução e bora prática: usar o ScrollView para realizar o scroller
keyboardShouldPersistTaps="handled":
  Qual vai ser o comportamento do teclado quando o usuário clica na tela fora do teclado ?
  Fechar o teclado.
  Em suma: abri o teclado e toquei na área fora do teclado, ele será fechado.
  contentContainerStyle={{ flex: 1 }} estilização inline... para o scrollview ocupar toda a tela
  {{}} -> primeiras chaves: código javaScript/ segunda chave: é um objeto

  KeyboardAvoidingView -> quando o app é rodado no IOs e o teclado está aberto,
  a rolagem não ocorre. behavior Será aplicado nas plataformas android e IOs.
  behavior -> qual comportamento será aplicado ?
  <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
  Se for ios, empurre a página com 'padding'... Se for outra plataforma, undefined(não precisa fazer nada).
*/
export const SignIn: React.FunctionComponent = () => {
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
            <View>
              <Title>Faça seu login</Title>
            </View>
            <Input placeholder="Email" />
            <Input placeholder="Senha" />
            <Button title="Entrar" />
            <ForgotPasswordButton>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount>
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
