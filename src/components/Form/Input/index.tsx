import React from 'react';
import { Container } from './styles';
import theme from '../../../global/styles/theme';
import { TextInputProps } from 'react-native';

/*Vou precisar de todos os recursos de um TextInput.
Para isso, declaro um tipo genérico <TextInputProps>... Esse genérico é do próprio react-native
A partir de agora vou ter todas as propriedades de um textInput para serem usadas...
Esse otherProps são as propriedades passadas por outros componentes. Essas propriedades podem variar
Input agora é reutilizável
*/
export const Input: React.FunctionComponent<TextInputProps> = ({
  ...otherProps
}) => {
  return (
    <Container placeholderTextColor={theme.colors.gray500} {...otherProps} />
  );
};
