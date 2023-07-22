/*
Se fosse styled-components web seria 'styled-components
*/
import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { IUser } from '../../model/user';

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
  height: ${RFPercentage(12)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: ${RFValue(28)}px;
`;
// space entre os elementos: justify-content: space-between;
export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: 10px;
`;

export const UserInfoDetail = styled.View`
  margin-left: 17px;
`;

export const UserGretting = styled.Text`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray800};
`;

//alguns componentes devem ser passados assim para o styled() components
//Não consigo capturar pelo ponto como os principais componentes do react-native
export const Icon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.dark};
`;

//só queremos o TouchableOpacity definido, pois a estitlização já foi feita em export const Icon
export const LogoutButton = styled.TouchableOpacity``;

/*
Até a realização deste curso, FlatList não tinha sido incorporado no styled-components.
Foi feito esse código abaixo
FlatList as new (props: FlatList<IUser>) => FlatList<IUser>)
Alem de falar que estou trabalhando com FlatList, estou dizendo também com qual tipo
de informação a FlatList vai trabalhar.
Estou renderizando a FlatList Padrão para a renderização já com os elementos
que serão manipulados na lista em si.
*/
export const UserList = styled(
  FlatList as unknown as new (props: FlatList<IUser>) => FlatList<IUser>,
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``;

export const UserListEmpty = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.gray500};
`;

//margin-bottom: ${RFValue(8)}px; -> para o titulo que vier abaixo, nao ficar tao proximo
export const UserListHeader = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${RFValue(8)}px;
`;
