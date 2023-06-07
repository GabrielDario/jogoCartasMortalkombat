import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TelaInicial } from './components/TelaInicial';
import { Batalhar } from './components/Batalhar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ranking } from './components/Ranking';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={TelaInicial}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ranking"
          component={Ranking}
          options={{
            tabBarLabel: 'Ranking',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="bar-graph" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Batalhar"
          component={Batalhar}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            tabBarLabel: 'Batalhar',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
