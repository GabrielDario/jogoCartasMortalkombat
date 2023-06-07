import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '../firebaseConfig';
import * as firebase from 'firebase';
import { Cartas } from './Cartas';

export function Batalhar({ route, perfil }) {
  const [perfis, setPerfis] = useState([]);

  const [atributo, setAtributo] = useState(null);
  const [cartasDentro, setCartasDentro] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  let [nome, setNome] = useState(null);
  let [forca, setForca] = useState(null);
  let [inteligencia, setInteligencia] = useState(null);
  let [magia, setMagia] = useState(null);
  let [armadura, setArmadura] = useState(null);
  let [influencia, setInfluencia] = useState(null);
  let [cartas, setCartas] = useState([]);
  let [batalhar, setBatalhar] = useState([]);
  let [alterarAtacar, setAlterarAtacar] = useState(0);

  let sortearAtributo = false;
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    // console.log('App em carregamento');
  }

  useEffect((perfiles) => {
    perfiles = route.params;
    setPerfis(perfiles);
    carregarCartas();
    criarPerfilFB();
  }, []);

  const criarPerfilFB = () => {
    console.log(perfis); 
     firebase
      .database()
       .ref('Perfis/')
      .push(perfis)
    .then((data) => {
         console.log('Jogador lançada com sucesso');
       })
       .catch((error) => {
        console.log('Erro ao gravar jogado', error);
       });
  };

  const carregarCartas = () => {
    // firebase
    //   .database()
    //   .ref('SalaDeEspera/').remove()

    firebase
      .database()
      .ref('Cartas/')
      .on('value', (snapshot) => {
        snapshot.forEach((cart) => {
          cartasDentro.push(cart.val());
        });

        setCartas(cartasDentro);
        // sorteio
      });
  };

  const atacar = () => {
    let atributoCarta;
    for (var i = 0; i < cartas.length; i++) {
      if (cartas[i].nome === nome) {
        atributoCarta = cartas[i][atributo];
      }
    }
    let dadosPlayer;
    let perfil = perfis[alterarAtacar].nickname;
    if (alterarAtacar == 0) {
      dadosPlayer = { nickname: perfil, carta: nome, atributo: atributoCarta };
      let somar = 1;
      setAlterarAtacar(somar);
    } else {
      dadosPlayer = { nickname: perfil, carta: nome };
      alterarAtacar = alterarAtacar - 1;
      let diminuir = 0;
      setAlterarAtacar(diminuir);
      setAlterarAtacar(0);
    }

    firebase
      .database()
      .ref('Batalhar/')
      .push(dadosPlayer)
      .then((data) => {
        console.log('Batalhar lançada com sucesso');
      })
      .catch((error) => {
        console.log('Erro ao gravar Batalhar', error);
      });
    setBatalhar([...batalhar, dadosPlayer]);

    setModalVisible(!modalVisible);
  };

  const mostrarAtributos = (item) => {
    setNome(item.nome);
    setForca(item.forca);
    setInfluencia(item.influencia);
    setInteligencia(item.inteligencia);
    setMagia(item.magia);
    setArmadura(item.armadura);
  };

  const resultadoBatalha = () => {
    let localCartaUm = cartas.map((n) => n.nome).indexOf(batalhar[0].carta);
    let localCartaDois = cartas.map((n) => n.nome).indexOf(batalhar[1].carta);

    let cartaperfilUm = cartas[localCartaUm][atributo];
    let cartaperfilDois = cartas[localCartaDois][atributo];

    if (cartaperfilDois > cartaperfilUm) {
      let diferenca = Number(cartaperfilDois - cartaperfilUm);
      alert('perfil ' + perfis[1].nickname + ' venceu essa rodada!');

      let descontar = perfis[0].pontos - diferenca;

      let novaLista = [...perfis];
      novaLista[0].pontos = descontar;

      setPerfis(novaLista);
    }
    if (cartaperfilDois < cartaperfilUm) {
      let diferenca = Number(cartaperfilUm - cartaperfilDois);
      alert('perfil ' + perfis[0].nickname + '  venceu essa rodada!');

      let descontar = perfis[1].pontos - diferenca;
      let novaLista = [...perfis];
      novaLista[1].pontos = descontar;

      setPerfis(novaLista);
    }

    if (cartaperfilDois == cartaperfilUm) {
      alert('atributos iguais!! empatee');
    }
    firebase.database().ref('Batalhar/').remove();

    setBatalhar([]);
  };

  const abrirCarta = () => {
    criarPerfilFB();
    console.log(perfis);
    if (alterarAtacar == 0) {
      //Sortear atributo
      const atributos = [
        'forca',
        'inteligencia',
        'magia',
        'armadura',
        'influencia',
      ];
      let atributoSorteado =
        atributos[Math.floor(Math.random() * atributos.length)];

      setAtributo(atributoSorteado);
    }

    setModalVisible(!modalVisible);
  };

  return (
    <View style={estilo.conteudo}>
      <FlatList
        data={perfis}
        renderItem={({ item }) => (
          <View style={estilo.viewperfiles}>
            <Image source={{ uri: item.image }} style={estilo.imgperfil} />
            <Text style={estilo.nicknameperfil}> @{item.nickname}</Text>
            <Text style={estilo.pontosperfil}> {item.pontos} pts</Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={estilo.centeredView}>
          <View style={estilo.modalView}>
            <Text style={estilo.titulo}>Atributo sorteado: {atributo}</Text>

            <Text style={estilo.vezDeQuem}>Escolha Sua Carta</Text>

            <View style={estilo.imagens}>
              <FlatList
                horizontal={true}
                data={cartasDentro}
                renderItem={({ item }) => (
                  <Pressable onPress={() => mostrarAtributos(item)}>
                    <Cartas
                      foto={item.foto}
                      nome={item.nome}
                      forca={item.forca}
                      inteligencia={item.inteligencia}
                      magia={item.magia}
                      armadura={item.armadura}
                      influencia={item.influencia}
                    />
                  </Pressable>
                )}
              />
            </View>

            <View>
              <Text>Força: {forca}</Text>
              <Text>Inteligencia: {inteligencia}</Text>
              <Text>Magia: {magia} </Text>
              <Text>Armadura: {armadura} </Text>
              <Text>Influência: {influencia}</Text>
            </View>

            <Pressable
              style={[estilo.button, estilo.buttonClose]}
              onPress={() => atacar()}>
              <Text style={estilo.textStyle}>Atacar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text>{batalhar.length}</Text>
      <Text>
        {batalhar.length == 0 && (
          <Text>Escolha uma carta {perfis[alterarAtacar]?.nickname}</Text>
        )}
        {batalhar.length == 1 && (
          <Text>
            {batalhar.length} Esperando outro perfil... Sua carta:{' '}
            {batalhar[0].carta}:{batalhar[0].atributo}
          </Text>
        )}
        {batalhar.length == 2 && resultadoBatalha()}
      </Text>

      <Pressable onPress={() => abrirCarta()} style={estilo.btn}>
        <Text style={estilo.btnTxt}>Escolher Carta</Text>
      </Pressable>
    </View>
  );
}

const estilo = new StyleSheet.create({
  conteudo: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'orange',
    height: 50,
    width: 250,
    borderRadius: 30,
    bottom: 0,
  },
  btnTxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 25,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  titulo: {
    marginBottom: 15,
    fontSize: 25,
  },
  texto1: {
    textAlign: 'left',
    fontSize: 15,
    marginTop: 10,
  },
  imagens: {
    flexDirection: 'row',
  },
  imagenss: {
    flexDirection: 'row',
    marginLeft: 5,
    width: 70,
    height: 180,
  },
  imgperfil: {
    width: 70,
    height: 70,
    marginLeft: 20,
  },
  viewperfiles: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pontosperfil: {
    fontSize: 25,
    marginLeft: 20,
  },
  vezDeQuem: {
    marginBottom: 20,
    fontSize: 20,
  },
});
