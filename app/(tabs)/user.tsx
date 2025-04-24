import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import '../../globals';


// llama la función la primera vez al darle en el menú o al escribir o pulsar algo
export default function UserScreen() {

  console.log('\x1b[32m%s\x1b[0m', 'User tab triggered');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log('\x1b[31m%s\x1b[0m' ,'isLoggedIn:', isLoggedIn);
  console.log('\x1b[31m%s\x1b[0m' , 'username:', username);

  if (!isLoggedIn) {
    // 🔐 Mostrar pantalla de login
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888" 
          
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888" 
          
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Button
          title="Login"
          onPress={async () => {
            try {
              console.log('\x1b[31m%s\x1b[0m' , '@@@@LOGIN BUTTON PRESSED@@@@');
              console.log('\x1b[31m%s\x1b[0m' , 'username:', username);
              console.log('\x1b[31m%s\x1b[0m' , 'password:', password);


              const response = await fetch('http://192.168.18.87:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password}), // add a password input too!
              });

              const data = await response.json();
              if (data.success) {

                global.username =  username

                setIsLoggedIn(true);
              } else {
                alert('Login failed');
              }
            } catch (error) {
              console.error(error);
              alert('Error connecting to server');
            }
          }}
        />

      </View>
    );
  }

  // 👤 Mostrar pantalla de perfil, al darle al boton login
  // vendrá aqui ya que rellamará la función.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {username} 👋</Text>
      <Button title="Cerrar sesión" onPress={() => setIsLoggedIn(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});