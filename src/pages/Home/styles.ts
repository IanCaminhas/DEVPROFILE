/*
Se fosse styled-components web seria 'styled-components
*/
import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

/*estou criando um componente dizendo que ele é igual a uma View. Mas essa View é estilizada pelo styled-components
No final das contas, um componente vai ser criado
  flex: 1; //quero que ocupe 100% da tela
  justify-content: center; //conteudo centralizado
  align-items: center; //centralizado tanto verticalmente e horizontalmente
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
`;
/*
//aplicando a fonte que vem de um context API: font-family: ${({ theme }) => theme.fonts.bold};
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
`;
*/

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

//width -> ocupar 100% de largura
//height -> altura fixa de 180px
/*
Dependendo de quantos pixels tem por polegada, a altura vai variar de uma tela pra outra.
O que vai depender vai ser o display do dispositivo
Posso ver isso num simulador ios e android...
Não devo trabalhar com 180px de height fixo.
Tenho que trabalhar com algo que verifique o percentual da tela que o height deve ocupar considerando
a densidade de pixel, o tamanho do display, etc
Solução: bib react-native-responsive-fontsize...
São vários métods=os para escolher a meneira de renderizar https://github.com/heyman333/react-native-responsive-fontsize/blob/master/README.md

Ao invés de definir o height como 180px fixos, vou pegar um percentual da tela.
Quantos % da tela o componente Header deve ocupar ?
Era assim:
height: 180px;
Agora é assim:
height: ${RFPercentage(17)}px;
recebe um número percentual. No caso é 17% da tela

RFValue é outro método. Recebe um valor em pixel. Quantos pixels quero para a altura ?
${RFPercentage(120)}px... Quero 120px de height
Olhando a tela do Iphone do android, a altura não fica divergente... Estou olhando a densidade de pixel.
Se eu pegar telas com densidade de pixels bem menores(galaxy S5, Iphone 4 e 5), a altura
vai ser bem diferente

Em resumo:
Essa bib cuida da questão de densidade de pixel. Objetivo: ter melhor experiência.
height: ${RFPercentage(17)}px; -> 17$ da tela. A bib calcula quanto de pixel será usado.
A bib faz a conta e ocupa a área pra gente.

*/
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(17)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
