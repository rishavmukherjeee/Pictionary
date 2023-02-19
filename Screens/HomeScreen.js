import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PaintApp from './PaintApp';
export default function HomeScreen({ navigation }) {

  // Define function to handle Start Game button press
  const handleStartGame = () => {
    navigation.navigate('PaintApp');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/profile-icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Pictionary Game</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/settings-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Play with Friends</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.scoreboard}>Wins: 0</Text>
        <TouchableOpacity style={styles.chestButton}>
          <Image source={require('../assets/chest-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#E5E5E5',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '70%',
    height: 60,
    backgroundColor: '#F4A261',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal:20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#E5E5E5',
  },
  scoreboard: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chestButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4A261',
    borderRadius: 20,
  },
});
