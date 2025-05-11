import React, { useState } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions } from 'react-native';

export default function HomeScreen() {

  interface User {
    id: string;
    name: string;
    age: number;
    images: string[];
  }

  const [list, setUsersList] = useState<User[]>([]);

  const testUser : User = {id: '1',name: 'John Doe',age: 30,images: ['https://example.com/image1.jpg',]}

  //añadir un usuario de prueba
  setUsersList((prev) => [...prev, testUser]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.18.87:3000/search_users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();     
        console.log('@@@DATA:', data.data);

        if (data.success) {
          console.log('@@@DATA:', data);
          setUsersList(data.data);
        } else {
          alert('data failed');
        }
      } catch (error) {
        console.error(error);
        alert('Error connecting to server');
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'white', paddingTop: 50, textAlign: 'center' }}>Search</Text>

    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itembox}>
            {/* Horizontal Slider for Images */}
            <FlatList
              data={item.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(imageUri, index) => index.toString()}
              renderItem={({ item: imageUri }) => (
                <Image source={{ uri: imageUri }} style={styles.image} />
              )}
            />
            {/* Text Information */}
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 20, color: 'white', marginRight: 10 }}>{item.name}</Text>
              <Text style={{ fontSize: 20, color: 'white', marginRight: 10 }}>{item.age}</Text>
            </View>
          </View>
        )}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    marginTop: 105, 
    flexDirection: 'column', 
    alignItems: 'center', 
  },
  itembox: { 
    width: Dimensions.get('window').width * 0.7, // Adjust width to fit the screen
    height: 250, 
    margin: 10, 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden', // Ensure images don't overflow
  },
  image: { 
    width: Dimensions.get('window').width * 0.7, // Full width of the slider
    height: '100%', 
    resizeMode: 'cover', 
  },
});