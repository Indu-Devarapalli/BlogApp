import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const saveData = async () => {
    const userId = uuid.v4();

    // Set loading state to true to show the loading indicator during API call
    setIsLoading(true);

    try {
      // Store the data in Firestore
      await firestore()
        .collection('Users') // Specify the collection
        .doc(userId) // Use the userId as the document ID
        .set({
          name: name,
          userId: userId,
          email: email,
          password: password, // You might want to hash the password before saving it
        });

      console.log('User added to Firestore');
      alert('Signup Successful!');

      // Navigate to the next screen or reset form
      navigation.goBack(); // You can replace this with navigation to a home screen if needed
    } catch (error) {
      console.error('Error adding user to Firestore: ', error.message);
      alert('Failed to sign up. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
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
        Sign up
      </Text>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
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
        placeholder="Enter Email Id"
        value={email}
        onChangeText={setEmail}
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
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
          if (name !== '' && email !== '' && password !== '') {
            saveData();
          } else {
            alert('Please Enter All Data');
          }
        }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>
          {isLoading ? 'Signing Up...' : 'Sign up'}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          textDecorationLine: 'underline',
          fontSize: 18,
          marginTop: 60,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        {'Already have an account?'}
      </Text>
    </View>
  );
};

export default Signup;
