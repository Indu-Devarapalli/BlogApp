import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signin = () => {
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)

      .get()
      .then(querySnapshot => {
        /* ... */
        if (querySnapshot.docs.length === 0) {
          alert('User Not Found');
        } else {
          console.log(querySnapshot.docs[0]._data);
          if (querySnapshot.docs[0]._data.password === password) {
            saveData(
              querySnapshot.docs[0]._data.name,
              querySnapshot.docs[0]._data.userId,
            );
          } else {
            alert('Password Incorrect');
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const saveData = async (name, userId) => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Main');
  };
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          alignSelf: 'center',
          marginTop: 100,
        }}>
        Login
      </Text>
      <TextInput
        placeholder="Enter Email Id"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 50,
          paddingLeft: 20,
        }}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 20,
        }}
      />
      <TouchableOpacity
        style={{
          marginTop: 20,
          width: '90%',
          height: 50,
          backgroundColor: 'purple',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={() => {
          signin();
        }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{
          textDecorationLine: 'underline',
          fontSize: 18,
          marginTop: 60,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        {' Want To create New Account'}
      </Text>
    </View>
  );
};

export default Login;
