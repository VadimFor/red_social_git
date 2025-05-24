import React, { useState } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions } from 'react-native';

export default function HomeScreen() {

  
  interface User {
    username: string;
    name: string;
    age: number;
    images: string[];
  }

  const [list, setUsersList] = useState<User[]>([]);

  const testUser : User = {username: 'utest1',name: 'John Doe',age: 30,images: ['https://example.com/image1.jpg',]}

  //React.useEffect(() => {
  //  setUsersList((prevList) => [...prevList, testUser]);
  //}, []); // Empty dependency array ensures this runs only once

  
  React.useEffect(() => {

      const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.18.87:3000/search_users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();     
        console.log('@@@DATA[0]:', data[0]);
        
        const i = 0;
        
        if (data.length !== 0) {
          const users_transform: User[] = data.map((item:any) => ({
            username : item.username,
            name: item.name,
            age: item.age,
            //images: [item.img1, item.img2, item.img3].filter(Boolean)
            images: item.img1
          }))
          setUsersList(users_transform);
        } else {
          alert('data empty');
        }
      } catch (error) {
        console.error(error);
        alert('Error connecting to server');
      }
    };

    fetchUsers();
  }, []); // <- para evitar los infinite loops al rerenderizar por culpa se setUsersList

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'white', paddingTop: 50, textAlign: 'center' }}>Search</Text>

    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View style={styles.itembox}>
            {/* Horizontal Slider for Images */}
            <FlatList
              data={item.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(images, index) => index.toString()}
              renderItem={({ item: images }) => (
                <Image source={{ uri: images }} style={styles.image} />
              )}
            />
            {/* Text Information */}
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 20, color: 'black', marginRight: 10 }}>{item.name}</Text>
              <Text style={{ fontSize: 20, color: 'black', marginRight: 10 }}>{item.age}</Text>
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