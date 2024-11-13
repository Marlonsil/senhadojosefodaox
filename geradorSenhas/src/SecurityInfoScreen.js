import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SecurityInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segurança das Senhas</Text>
      <Text style={styles.text}>
        É fundamental usar senhas fortes para proteger suas contas online.
        Uma senha forte deve conter:
      </Text>
      <Text style={styles.text}>- Pelo menos 12 caracteres</Text>
      <Text style={styles.text}>- Uma mistura de letras maiúsculas e minúsculas</Text>
      <Text style={styles.text}>- Números e caracteres especiais (!, @, #, etc.)</Text>
      <Text style={styles.text}>- Evitar usar informações pessoais óbvias, como nome ou data de nascimento</Text>
      <Text style={styles.text}>
        Lembre-se: guardar suas senhas em um local seguro ou usar um gerenciador de senhas é essencial para sua proteção online!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#392DE9', // Cor personalizada
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
