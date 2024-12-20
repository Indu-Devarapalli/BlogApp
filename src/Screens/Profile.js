import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

let userId = '';

const Profile = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  // Fetch user data from Firestore
  const getData = async () => {
    try {
      userId = await AsyncStorage.getItem('USERID');
      const userDoc = await firestore().collection('Users').doc(userId).get();
      if (userDoc.exists) {
        setData(userDoc.data()); // Set profile data
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  // Request camera permissions for Android
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take profile pictures.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera(); // If permission is granted, open the camera
      } else {
        Alert.alert('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Open camera to capture a new profile image
  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.5,
      saveToPhotos: true, // Optionally save the photo to gallery
    });

    if (!result.didCancel && result.assets) {
      const newImageUri = result.assets[0].uri;
      setData({ ...data, profileImage: newImageUri }); // Update the profile image in the state
      updateProfile(newImageUri); // Update profile image in Firestore
    }
  };

  // Update the profile image in Firestore
  const updateProfile = (url) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        profileImage: url, // Update profile image in Firestore
      })
      .then(() => {
        console.log('Profile updated!');
        Alert.alert('Profile updated successfully!');
        navigation.goBack(); // Go back after successful update
      })
      .catch((error) => {
        console.error('Error updating profile: ', error);
        Alert.alert('Error updating profile');
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Display the profile image */}
      {data && data.profileImage ? (
        <Image
          source={{ uri: data.profileImage }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginTop: 50,
          }}
        />
      ) : (
        <Image
          source={require('../images/user.png')} // Fallback image if no profile image is available
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginTop: 50,
          }}
        />
      )}

      {/* Button to open camera and pick a new image */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          height: 50,
          width: '50%',
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        onPress={requestCameraPermission} // Request camera permission and open camera
      >
        <Text>Pick Image</Text>
      </TouchableOpacity>

      {/* Button to update the profile */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          height: 50,
          width: '50%',
          backgroundColor: 'purple',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        onPress={() => updateProfile(data.profileImage)} // Update profile image in Firestore
      >
        <Text style={{ color: '#fff' }}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
