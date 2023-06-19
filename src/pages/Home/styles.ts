/*
Se fosse styled-components web seria 'styled-components
*/
import styled from 'styled-components/native';

//estou criando um componente dizendo que ele é igual a uma View. Mas essa View é estilizada pelo styled-components
//No final das contas, um componente vai ser criado
export const Container = styled.View`
  flex: 1; //quero que ocupe 100% da tela
  justify-content: center; //conteudo centralizado
  align-items: center; //centralizado tanto verticalmente e horizontalmente
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) =>
    theme.colors
      .light}; //{props => props.theme.colors.light} só usei a desestruturação
`;
