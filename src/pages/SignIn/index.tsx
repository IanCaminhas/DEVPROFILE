import React from 'react';
import { Container, Content, Title } from './styles';
import { Input } from '../../components/Form/Input';
import { ScrollView } from 'react-native';

/*
Quando o usuario usa o teclado do celular, a página pode fica encurtada.
Solução e bora prática: usar o ScrollView para realizar o scroller
keyboardShouldPersistTaps="handled":
  Qual vai ser o comportamento do teclado quando o usuário clica na tela fora do teclado ?
  Fechar o teclado.
  Em suma: abri o teclado e toquei na área fora do teclado, ele será fechado.
  contentContainerStyle={{ flex: 1 }} estilização inline... para o scrollview ocupar toda a tela
  {{}} -> primeiras chaves: código javaScript/ segunda chave: é um objeto

*/
export const SignIn: React.FunctionComponent = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Faça seu login</Title>
          <Input placeholder="Email" />
          <Input placeholder="Senha" />
        </Content>
      </Container>
    </ScrollView>
  );
};
