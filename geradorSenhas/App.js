import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';

// Importações para Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SavedPasswords from './src/screens/SavedPasswords'; // Tela de Senhas Salvas
import { ModalPassword } from './src/components/modal/index';

let charset = "abcdefghijklmnopqrstuvwxyz!@#$%&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Criação do Stack Navigator para as Telas
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [senhaGerada, setSenhaGerada] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState([]); // Estado para Senhas Salvas

  function gerarSenha() {
    let senha = "";
    for (let i = 0, n = charset.length; i < 10; i++) {
      senha += charset.charAt(Math.floor(Math.random() * n));
    }
    setSenhaGerada(senha);
    setModalVisible(true);
  }

  // Função para Salvar Senha e Navegar para Tela de Senhas Salvas
  function salvarSenha() {
    setSavedPasswords(prevPasswords => {
      const updatedPasswords = [...prevPasswords, senhaGerada];
      setModalVisible(false); // Fecha o modal após salvar a senha
      navigation.navigate('SavedPasswords', { savedPasswords: updatedPasswords }); // Navega e passa as senhas
      return updatedPasswords; // Atualiza o estado de senhas salvas
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("./src/img/logolock.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>LockGen</Text>
      <TouchableOpacity style={styles.button} onPress={gerarSenha}>
        <Text style={styles.textButton}>Gerar Senha</Text>
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
  const { savedPasswords } = route.params || { savedPasswords: [] }; // Recebe as senhas salvas via params

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#333',
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 6,
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
