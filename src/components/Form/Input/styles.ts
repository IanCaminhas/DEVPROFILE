import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

//styled agora se tornou um método. Esse método recebe um TextInput como parâmetro.
//Por que não uso mais o styled.TextInput ? agora esse componente Container vai receber propriedades(props)
// padding: 18px 16px -> padding de 18px em cima e em baixo. padding de 16px esquerda/direita
export const Container = styled(TextInput)`
  width: 100%;
  padding: 18px 16px;
  background-color: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;
  margin-bottom: 16px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
