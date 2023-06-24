import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

/*
  width -> Ocupar 100% da largura
  padding -> 24 px para todos os lados
*/
export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 24px;
`;

export const Logo = styled.Image`
  width: ${RFValue(160)}px;
  height: ${RFValue(160)}px;
  margin-bottom: ${RFValue(64)}px;
`;

//margin-top: -> para afastar do botão de cima
export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.gray500};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

//Esse componente vai ficar colado lá em baixo.  position: absolute; left: 0; right: 0; bottom: 0;
//padding 16 px em cima e embaixo. 0 esquerda-direita
export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.gray800};
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.black};
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 16px;
`;
