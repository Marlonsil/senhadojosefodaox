import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SavedPasswords from './src/screens/SavedPasswords';
import { ModalPassword } from './src/components/modal/index';
import SecurityInfoScreen from './src/screens/SecurityInfoScreen'; // Importa a nova tela

let charset = "abcdefghijklmnopqrstuvwxyz!@#$%&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [senhaGerada, setSenhaGerada] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState([]);

  function gerarSenha() {
    let senha = "";
    for (let i = 0, n = charset.length; i < 10; i++) {
      senha += charset.charAt(Math.floor(Math.random() * n));
    }
    setSenhaGerada(senha);
    setModalVisible(true);
  }

  function salvarSenha() {
    setSavedPasswords(prevPasswords => {
      const updatedPasswords = [...prevPasswords, senhaGerada];
      setModalVisible(false);
      navigation.navigate('SavedPasswords', { savedPasswords: updatedPasswords });
      return updatedPasswords;
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("./src/img/yourLogo.png")}  // Substitua pelo caminho da sua logo
        style={styles.logo}
      />
      <Text style={styles.title}>MySecureApp</Text>  {/* Novo nome do app */}
      <TouchableOpacity style={styles.button} onPress={gerarSenha}>
        <Text style={styles.textButton}>Gerar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SecurityInfo')}>
        <Text style={styles.textButton}>Segurança da Senha</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword 
          senha={senhaGerada} 
          handleClose={() => setModalVisible(false)} 
          salvarSenha={salvarSenha} 
        />
      </Modal>
      <Text style={styles.senha}>{senhaGerada}</Text>
    </View>
  );
}

function SavedPasswordsScreen({ route }) {
  const { savedPasswords } = route.params || { savedPasswords: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Senhas Salvas</Text>
      {savedPasswords.length > 0 ? (
        savedPasswords.map((senha, index) => (
          <Text key={index} style={styles.senha}>{senha}</Text>
        ))
      ) : (
        <Text style={styles.senha}>Nenhuma senha salva.</Text>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SavedPasswords" component={SavedPasswordsScreen} />
        <Stack.Screen name="SecurityInfo" component={SecurityInfoScreen} /> {/* Nova tela */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 20,
    width: 150,
    height: 150, // Ajuste do tamanho da logo
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 50,
    color: '#392DE9',  // Cor personalizada
  },
  button: {
    backgroundColor: '#392DE9',
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 6,
    marginVertical: 10,
  },
  textButton: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  senha: {
    marginTop: 20,
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
