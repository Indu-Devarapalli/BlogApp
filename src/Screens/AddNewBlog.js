import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';

let userId = '',
  name = '',
  profileUrl = '';

const AddNewBlog = ({navigation}) => {
  const [caption, setCaption] = useState('');
  const [data, setData] = useState(null);

  // Fetch user data on initial render
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      userId = await AsyncStorage.getItem('USERID');
      name = await AsyncStorage.getItem('NAME');
      let email = await AsyncStorage.getItem('EMAIL');
    
      const userSnapshot = await firestore()
        .collection('Users')
        .where('email', '==', email)  // Filtering based on email
        .get();

      if (userSnapshot.empty) {
        alert('User Not Found');
      } else {
        profileUrl = userSnapshot.docs[0]._data.profileImage;  // Getting profile image URL from user data
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Save blog data to Firestore
  const saveData = (imageUrl) => {
    // Debugging: log all fields before saving
    console.log('Saving blog data with the following fields:');
    console.log('caption:', caption);
    console.log('profileUrl:', profileUrl);
    console.log('userId:', userId);
    console.log('imageUrl:', imageUrl);

    // Check for undefined/null values
    if (!caption || !imageUrl || !userId || !profileUrl) {
      alert('All fields must be filled out!');
      return;
    }

    // Save data to Firestore
    firestore()
      .collection('Blogs')
      .add({
        caption: caption,
        name: name,
        userId: userId,
        blogImage: imageUrl,  // Store image URL directly in Firestore
        userImage: profileUrl,  // User's profile image URL
      })
      .then(() => {
        console.log('Post added!');
        navigation.goBack();  // Navigate back to the previous screen
      })
      .catch(error => {
        console.error('Error adding post:', error);
        alert('An error occurred while saving the blog post.');
      });
  };

  // Open the camera to pick an image
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log(result);  // Debugging: check the result from the camera
    
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else {
      setData(result);  // Set the selected image data
    }
  };

  // Request Camera permissions
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'BlogApp Camera Permission',
          message:
            'BlogApp needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();  // Open camera if permission is granted
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Upload the image and save the data
  const uploadImage = () => {
    if (data && data.assets && data.assets.length > 0) {
      const imageUrl = data.assets[0].uri;  // Get the URI of the picked image

      // Check if image URL is valid
      if (!imageUrl) {
        alert('No image selected!');
        return;
      }

      saveData(imageUrl);  // Save the blog with the image URL
    } else {
      console.log('No image selected');
      alert('Please select an image before uploading');
    }
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      {/* Caption input */}
      <TextInput
        placeholder="Enter Caption"
        value={caption}
        onChangeText={setCaption}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          marginTop: 50,
          alignSelf: 'center',
          borderWidth: 1,
          paddingLeft: 20,
        }}
      />

      {/* Button to pick image */}
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'blue',
          marginTop: 50,
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={requestCameraPermission}>
        <Text style={{color: '#fff', fontSize: 16}}>Pick Image</Text>
      </TouchableOpacity>

      {/* Display the selected image */}
      {data !== null && data.assets && data.assets.length > 0 && (
        <Image
          source={{uri: data.assets[0].uri}}
          style={{
            width: '90%',
            height: 200,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      )}

      {/* Button to upload the blog */}
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'purple',
          marginTop: 50,
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={uploadImage}>
        <Text style={{color: '#fff', fontSize: 16}}>Upload Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewBlog;
