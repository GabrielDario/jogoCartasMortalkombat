import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import image from '../img/mk.jpg';
import * as firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';
import { useState, useEffect } from 'react';

const foto = 'https://i.ytimg.com/vi/JOMd38rOBMg/maxresdefault.jpg';

const imagem1 = 'https://archive.org/download/icon-1.0/icon-1.0.jpg';
const imagem2 = 'https://images5.alphacoders.com/515/thumb-1920-515358.jpg';
const imagem3 =
  'https://pm1.narvii.com/6479/533b627c148d0921fdee885569ce13d2cba92f3d_128.jpg';
const imagem4 =
  'https://img.quizur.com/f/img617aebc6604c01.61540911.jpg?lastEdited=1635445707';

export function TelaInicial({ navigation }) {
  const [jogadores, setJogadores] = useState([]);
  const [jogador, setjogador] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(
    'https://archive.org/download/icon-1.0/icon-1.0.jpg'
  );

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    console.log('CARREGANDO');
  }

  useEffect(() => {
    carregarjogadorDoFirebase();
  }, []);

  const carregarjogadorDoFirebase = () => {
    firebase
      .database()
      .ref('SalaDeEspera/')
      .on('value', (snapshot) => {
        const jogador = [];
        snapshot.forEach((jogado) => {
          jogador.push(jogado.val());
        });
        setJogadores(jogador);
      });
  };

  const publicarjogadoNoFirebase = () => {
    console.log(jogador.nickname);

    firebase
      .database()
      .ref('SalaDeEspera/')
      .push(jogador)
      .then((data) => {
        console.log('Jogador lançada com sucesso');
      })
      .catch((error) => {
        console.log('Erro ao gravar jogado', error);
      });
  };

  const escolherFoto = (fotu) => {
    setFotoPerfil(fotu);
  };
  return (
    <View style={stilo.container}>
      <Image source={{ uri: foto }} style={stilo.logo} />
      <View style={stilo.imagens}>
        <Pressable
          style={stilo.img1}
          onPress={() =>
            escolherFoto('https://archive.org/download/icon-1.0/icon-1.0.jpg')
          }>
          <Image source={{ uri: imagem1 }} style={stilo.imagenss} />
        </Pressable>

        <Pressable
          style={stilo.img1}
          onPress={() =>
            escolherFoto(
              'https://images5.alphacoders.com/515/thumb-1920-515358.jpg'
            )
          }>
          <Image source={{ uri: imagem2 }} style={stilo.imagenss} />
        </Pressable>

        <Pressable
          style={stilo.img1}
          onPress={() =>
            escolherFoto(
              'https://pm1.narvii.com/6479/533b627c148d0921fdee885569ce13d2cba92f3d_128.jpg'
            )
          }>
          <Image source={{ uri: imagem3 }} style={stilo.imagenss} />
        </Pressable>
        <Pressable
          style={stilo.img1}
          onPress={() =>
            escolherFoto(
              'https://img.quizur.com/f/img617aebc6604c01.61540911.jpg?lastEdited=1635445707.jpg'
            )
          }>
          <Image source={{ uri: imagem4 }} style={stilo.imagenss} />
        </Pressable>
      </View>
    
      <Text style={stilo.esperando}>
        {jogadores.length == 1 && <Text>Esperando {} </Text>}
        {jogadores.length == 2 && navigation.navigate('Batalhar', jogadores)}
      </Text>
      <View style={stilo.botoes}>
        <TextInput
          placeholder="NickName"
          style={stilo.input}
          onChangeText={(jogado) =>
            setjogador({
              ...jogador,
              nickname: jogado,
              image: fotoPerfil,
              pontos: 1000,
              vitoria: 0,
              ataque: 0,
              atacou: false,
            })
          }
        />
        <Pressable
          style={stilo.botao}
          onPress={() => publicarjogadoNoFirebase()}>
          <Text style={stilo.botaotxt}> Batalhar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stilo = new StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
    backgroundImage: image,
    backgroundRepeat: 'repeat',
    backgroundSize: 'contain',
  },
  logo: {
    marginTop: 20,
    width: 350,
    height: 250,
  },

  imagens: {
    flexDirection: 'row',
    marginTop: 50,
  },
  imagenss: {
    flexDirection: 'row',
    marginLeft: 20,
    width: 50,
    height: 50,
  },

  input: {
    backgroundColor: 'rgb(200,200,200)',
    padding: 10,
    marginTop: 50,
    width: 300,
    borderBottomColor: 'black',
    borderWidth: 2,
  },
  botao: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 300,
    height: 50,
    top: 25,
    borderColor: 'orange',
    borderWidth: 3,
  },
  botaotxt: {
    textAlign: 'center',
    color: 'white',
  },
  rodape: {
    borderColor: 'black',
    borderWidth: 2,
    width: 300,
    flexDirection: 'row',
    marginTop: 70,
  },
  esperando: {
    fontSize: 20,
    backgroundColor: 'yellow',
    marginTop: 10,
  },
});
