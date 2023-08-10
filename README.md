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

Last Challenge:

Requirements:

Create an edit screen, accessible by pressing a farm card component.
The edit screen code should reuse the same code as the add screen, refactor any names and parameters as necessary for clarity and good code organization.
The edit screen should receive a navigation param for farm id.
The edit screen should have a hook that listens to the farm whose id is provided. Based on this farm's data, the screen should populate the form's fields.
If the farm data changes while the form is displayed, the form should update.
While the edit screen is loading the data for the new farm, it should show a loading indicator instead of the form. It should not show data for the previous farm loaded.
It should handle a not found farm id.
Should add an address field for the farm model, consisting of: street, city, zip code, state, and coordinate (latitude and longitude numbers). The farm model should have address as a required field.
There should be an address validator function.
State must be a valid US state. The state field should match either the 2-letter code or the long name of a US state. (Will provide an object that has a mapping of US state codes to state names). If a match is found, the saved state should be replaced with the 2-letter code.
Every field must be present.
Zip code should be 5 digits exactly.
A geocode api should be called to get the coordinates of this address. If no coordinates are returned, it's not a valid address. (Will provide the google maps api key, and the template string for the query to call React Native's built-in "fetch" global, easily).
PO boxes not allowed. (Should identify whether an address is a PO box) 
Should support addresses with unit number, such as “123 Oak Street Apt #102”.
Should handle cases when the api may return an unsuccessful response. Should check that the coordinates are valid and are not zero.
In the farm edit screen, when a farm is loaded, the address should be validated. Invalid fields should be filled with blank data for the address. Invalid fields should show the red text below the Input, with the error message for the field, on initial render


