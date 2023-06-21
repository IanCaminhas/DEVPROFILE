/*
Se fosse styled-components web seria 'styled-components
*/
import styled from 'styled-components/native';

/*estou criando um componente dizendo que ele é igual a uma View. Mas essa View é estilizada pelo styled-components
No final das contas, um componente vai ser criado
  flex: 1; //quero que ocupe 100% da tela
  justify-content: center; //conteudo centralizado
  align-items: center; //centralizado tanto verticalmente e horizontalmente
*/

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
`;
