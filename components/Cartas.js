import { View, Image, StyleSheet, Pressable } from 'react-native';

const CARTAS = {
  Baraka: require('../img/Baraka.png'),
  Cyrax: require('../img/Cyrax.png'),
  Ermac: require('../img/Ermac.png'),
  Freddy: require('../img/Freddy.png'),
  Goro: require('../img/Goro.png'),
  Jax: require('../img/Jax.png'),
  Johnny: require('../img/Johnny.png'),
  Kabal: require('../img/Kabal.png'),
  Kano: require('../img/Kano.png'),
  Kitana: require('../img/Kitana.png'),
  Kratos: require('../img/Kratos.png'),
  Liukang: require('../img/Liukang.png'),
  Mileena: require('../img/Mileena.png'),
  Motaro: require('../img/Motaro.png'),
  Nightwolf: require('../img/Nightwolf.png'),
  Noob: require('../img/Noob.png'),
  Raiden: require('../img/Raiden.png'),
  Rambo: require('../img/Rambo.png'),
  Reptile: require('../img/Reptile.png'),
  Scorpion: require('../img/Scorpion.png'),
  ShangTsung: require('../img/ShangTsung.png'),
  ShaoKahn: require('../img/ShaoKahn.png'),
  Sindel: require('../img/Sindel.png'),
  Sonya: require('../img/Sonya.png'),
  SubZero: require('../img/SubZero.png'),
};

 
export function Cartas({nome}) {
  return (
    <View>
      
        <Image source={CARTAS[nome]} style={estilo.foto} />
 
    </View>
  );
}

const estilo = new StyleSheet.create({
  foto: {
    width: 70,
    height: 180,
  },
});
