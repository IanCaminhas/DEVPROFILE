import React from 'react';
import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';

//Alem de extender as propriedades do TouchableOpacityProps, vou acrescentar a propriedade title
interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

/*
  declaro um tipo genérico <ButtonProps>... Esse genérico é do próprio react-native
  A partir de agora vou ter todas as propriedades de um ButtonProps para serem usadas...
  Esse otherProps são as propriedades passadas por outros componentes. Essas propriedades podem variar
  Input agora é reutilizável
  além do title do botão, pego todas as outras propriedades com ..otherProps
*/
export const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  ...otherProps
}) => {
  return (
    <Container {...otherProps}>
      <Title>{title}</Title>
    </Container>
  );
};
