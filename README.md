# SocialBlogApp
SocialBlogApp is a simple and user-friendly mobile app built with React Native. The app allows users to upload their daily activities, memories, and thoughts along with images. It provides a platform to create and store blogs, update profiles

This app is powered by Firebase for user authentication and data storage.

## Technologies Used
* React Native – For building cross-platform mobile apps (iOS & Android)
* React Navigation – For handling app navigation
* Firebase – For user authentication, blog storage, and real-time database
* TypeScript – For static typing and enhanced code quality
* React Native Image Picker – For uploading images from the gallery or camera
* React Native UUID – For generating unique identifiers for blog posts and images

## Prerequisites
* Node.js
* React Native CLI 
* Xcode (for iOS development) 
* CocoaPods (for iOS dependencies) 
* Android Studio (for Android development) 

## Project Structure
SocialBlogApp/
├── src/
│   ├── Screens/        # All app screens
│   ├── Images/         # Image assets
│   ├── AppNavigator/   # Navigation configurations
├── ios/                # iOS specific files
├── android/            # Android specific files
├── package.json        # Project dependencies and scripts
└── README.md           # Project Documentation

## Installation
1. Clone the Repository
```bash
git clone https://github.com/Indu-Devarapalli/BlogApp.git
```
2. Install Dependencies
```bash
npm install
#Or 
yarn install
```
3. Install iOS Dependencies
```bash
cd ios
pod install
cd ..
```
## Running the App
1. Start Metro Bundler
```bash
yarn start
#or
npm start
```
2. Run on Android
```bash
yarn 
#or
npx react-native run-android
```
3. Run on iOS
```bash
yarn ios
#or
npx react-native run-ios
```
## App Features
### User Authentication
 * Easy login and sign-up using Firebase Authentication.
 * User profile creation and updates.
 ### Blog Creation and Uploading

  * Upload pictures from the camera or gallery to your blog posts.
  * Write content along with images for each post.
* Viewing Past Posts

  * View all previously uploaded blogs.
  * Edit and update profile.
* Firebase Integration

Firebase is used for user authentication, storing user data, and uploading blog posts.
All blog data is stored in Firebase Realtime Database for seamless updates.
Profile Management

Users can update their profiles, including pictures and bio information.
Store and manage personal blog data with ease.
