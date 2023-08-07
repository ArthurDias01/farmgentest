# farmgentest

The Challenge
Create a new project using expo for ios, android and web (use react-native-web) and typescript with good use of types.

For Navigation use react-navigation-v6 / expo-router

Set up a Firebase project to use in the app with Firestore
Add Formik and Yup to project

Setup firebase authentication (just email is good enough) with a login / register screen (also uses Formik/Yup)

Setup two screens with ability to Navigate between: Register/Login/Logout Screen and List Farm screen

On user login, the screen shows a list of Farms (initially empty of course)
The Screen has an add button to add new Farms.

The AddFarm function is a form built using Formik / Yup and firestore.
Farm displayname (required)
Farm name (required and unique, using Yup for validation)
Farm phone (optional, use Yup for phone number validation) 
Farm open hours (optional)
Farm image (A button to prompt and upload image to Firebase storage, and add url to Farm collection. The url is not directly editable)

On Submit, 
Add data to Farm collection in firestore
Return to List screen

Live Update (optional):
Live update data on list screen (you will use a firestore snapshot listener for this) - So, if you android and web version of app opened simultaneously, add a farm using one and the other list screen will auto update
