import React from 'react';
import { Container, Error } from './styles';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Input } from '../Input';

interface Props extends TextInputProps {
  control: Control;
  name: string; //nome do campo
  error: string | undefined; //error quando violar as regras do input. undefined quando o formulário estiver ok
}

//Isso aqui é um input criado com react hook form. Esse input são para formulários mais complexos
//A pasta Input contém os inputs para formulários mais simples
//O controller acaba sendo o nosso input
export const InputControl: React.FunctionComponent<Props> = ({
  control,
  name,
  error,
  ...otherProps
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...otherProps} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
