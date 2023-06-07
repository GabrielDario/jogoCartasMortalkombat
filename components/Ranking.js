import { View, Text, StyleSheet, Image } from 'react-native';

export function Ranking() {
  const lista = [
    {
      foto: 'https://pt.seaicons.com/wp-content/uploads/2015/06/Healthcare-Skull-icon.png',
      nickname: 'Diego',
      vitoria: 5,
    },
    {
      foto: 'https://cdn-icons-png.flaticon.com/512/2555/2555013.png',
      nickname: 'Fernado',
      vitoria: 4,
    },
    {
      foto: 'https://e7.pngegg.com/pngimages/591/275/png-clipart-world-of-tanks-world-of-warships-computer-icons-zip-funny-miscellaneous-purple.png',
      nickname: 'Gustavo',
      vitoria: 3,
    },
    {
      foto: 'https://static.thenounproject.com/png/1764739-200.png',
      nickname: 'Gabriel',
      vitoria: 1,
    },
  ];
  return (
    <View>
      <View style={styles.tabela}>
        <Text style={styles.dividir}></Text>
        <Text style={styles.dividir}>Jogador</Text>
        <Text style={styles.dividir}>Vitórias</Text>
      </View>

      <View style={styles.ranking}>
        {lista.map((list) => (
          <View>
            <Text style={styles.nomeJogador}>{list.nickname}</Text>
            <Image style={styles.fotoJogador} source={{ uri: list.foto }} />
            <Text style={styles.vitoriaJogador}>{list.vitoria}</Text>
          </View>
        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabela: {
    flexDirection: 'row',
    top: 20,
  },
  dividir: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'cursive',
  },
  ranking: {
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    top: 50,
    width: 350,
    left: 30,
  },
  fotoJogador: {
    width: 50,
    height: 50,
    marginTop: -20,
  },
  nomeJogador: {
    textAlign: 'center',
    fontSize: 20,
  },
  vitoriaJogador: {
    position: 'absolute',
    paddingBottom: 15,
    right: 30,
    fontSize: 20,
  },
});
