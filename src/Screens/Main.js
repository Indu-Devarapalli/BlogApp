import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const Main = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const isFocused = useIsFocused();

  // Fetch blogs when screen is focused
  useEffect(() => {
    getBlogs();
  }, [isFocused]);

  const getBlogs = () => {
    firestore()
      .collection('Blogs') // Fetch blogs collection from Firestore
      .get()
      .then(querySnapshot => {
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
        });
        setBlogs(tempData); // Update blogs state
      })
      .catch(error => {
        console.log('Error fetching blogs: ', error.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'purple',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            marginLeft: 20,
            fontSize: 18,
            fontWeight: '700',
          }}>
          BlogApp
        </Text>
        <Text
          style={{
            color: '#fff',
            marginRight: 20,
            fontSize: 18,
            fontWeight: '700',
          }}
          onPress={() => {
            navigation.navigate('Profile'); // Navigate to Profile page
          }}>
          Profile
        </Text>
      </View>

      {/* List Blogs */}
      <FlatList
        data={blogs}
        renderItem={({ item }) => (
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              elevation: 3,
              backgroundColor: '#fff',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Image
                source={{ uri: item.userImage || require('../images/user.png') }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
            </View>
            <Text style={{ margin: 10, fontSize: 16, fontWeight: '600' }}>
              {item.caption}
            </Text>
            {item.blogImage && (
              <Image
                source={{ uri: item.blogImage }}
                style={{
                  width: '90%',
                  height: 200,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
              />
            )}
          </View>
        )}
      />

      {/* Add New Blog Button */}
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          borderRadius: 30,
          backgroundColor: 'purple',
          position: 'absolute',
          right: 20,
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddNewBlog'); // Navigate to AddNewBlog page
        }}>
        <Text style={{ color: '#fff' }}>Add New Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
