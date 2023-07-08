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
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { useForm, FieldValues } from 'react-hook-form';
import { InputControl } from '../../components/Form/InputControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

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
//dentro de cada validação, posso passar uma mensagem. É opcional
const formSchema = yup.object({
  email: yup.string().email('Email inválido').required('Informe o email'),
  password: yup.string().required('Informe a senha'),
});

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
  //const { signIn } = React.useContext(AuthContext);
  const { signIn } = useAuth();
  //o usuario pode clicar várias vezes para entrar e, por consequência, disparar muitas requisições
  //Se o loading for true, eu vou desabilitar o btn de entrar. Isso quer dizer: usuario deu um click e a requisição foi enviada
  //Agora, o usuario vai aguardar uma mensagem de retorno(algo acontecer) aparecer para depois ele usar o botão
  //Vou controlar quantas vezes o usuário clicou. Clicou uma vez, vai ficar desabilitado
  //enquanto o loading for false, o botao esta liberado... Ninguem clicou nele ainda
  //Quando loading ficar true, é desabilitado automaticamente
  const [loading, setLoading] = React.useState(false);
  console.log(signIn);

  //conrola a submissão dos dados do formulário: handleSubmit
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    //Estou dizendo para o react hook form que ele vai trabalhar com esse tipo de validação
    resolver: yupResolver(formSchema),
  });
  /*
    vai para a página específica. Recebe o nome da tela que quero navegar
    navigation.navigate().
  */
  const { navigate } = useNavigation<ScreenNavigationProp>();

  //Essa função cria um objeto com as informações recebidas do formulário
  const handleSignIn = (form: IFormInputs) => {
    const data = {
      email: form.email,
      password: form.password,
    };
    //console.log(data); apenas para conferência

    try {
      setLoading(true);
      // SignIn(data); -> esse metodo desestruturado ->  auth.signIn(data);
      //metodo do contexto de autenticação
      signIn(data);
    } catch (error) {
      // title = 'Erro na autenticação' / message = "Ocorreu um erro ao fazer login, verifique as credenciais"
      //caso surgir um problema no login
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais',
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
              error={errors.email && (errors.email.message as string)}
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
              error={errors.password && (errors.password.message as string)}
            />

            <Button
              title="Entrar"
              disabled={loading || errors.email || errors.password}
              onPress={handleSubmit(handleSignIn)}
            />
            <ForgotPasswordButton onPress={() => navigate('ForgotPassword')}>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigate('SignUp');
        }}
      >
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
