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
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { useForm, FieldValues } from 'react-hook-form';
import { InputControl } from '../../components/Form/InputControl';

//Estou defindo o tipo que vou usar no const navigation = useNavigation();
interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

//tipo para definir quais informações tenho em cada input do react-hook-form
//essa tipagen aqui agora é genérica, ou seja, não posso especificar cada campo mais
interface IFormInputs {
  /*
  email: string;
  passowrd: string;
  */
  //O eslint não gosta de any. Tenho como ignorar essa linha amarela abaixo
  //quando ocorrer isso, vai no arquivo do eslintrc.json copiando e colando em rules.
  //Passe o mouse a cima do código com a linha amarela e copia o warn que está assim eslint(@typescript-eslint/no-explicit-any)
  //Resolvi a tipagem
  [name: string]: any;
}

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

  Antes estava usando o:
  <Input placeholder="Email" />
  <Input placeholder="Senha" />

  Eu tinha feito esse input. Agora estou usando o InputControl
*/
export const SignIn: React.FunctionComponent = () => {
  //conrola a submissão dos dados do formulário: handleSubmit
  const { handleSubmit, control } = useForm<FieldValues>();
  /*
    vai para a página específica. Recebe o nome da tela que quero navegar
    navigation.navigate().
  */
  const navigation = useNavigation<ScreenNavigationProp>();

  //Essa função cria um objeto com as informações recebidas do formulário
  const handleSignIn = (form: IFormInputs) => {
    const data = {
      email: form.email,
      password: form.passowrd,
    };
    console.log(data);
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
            <View>
              <Title>Faça seu login</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
            />
            <Button title="Entrar" onPress={() => handleSubmit(handleSignIn)} />
            <ForgotPasswordButton>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
