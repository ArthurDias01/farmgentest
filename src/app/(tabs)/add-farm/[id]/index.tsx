import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Platform, Alert } from "react-native";
import { theme } from "@/styles/theme";
import { Formik, FormikHelpers } from "formik";
import { BackgroundContainerCentered } from "@/components/BackgroundCenteredContainer";
import { Label } from "@/components/Forms/Label";
import { Input } from "@/components/Forms/Input";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import * as Yup from 'yup';
import { HoursInput } from "@/components/Forms/HoursInput";
import { FormContainerFarm } from "@/components/Forms/FormContainerFarm";
import * as ImagePicker from 'expo-image-picker';
import { CustomButton } from "@/components/CustomButton";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from '@/services/firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where, QueryDocumentSnapshot, FieldValue } from 'firebase/firestore'
import { useAuth } from "@/contexts/Auth";
import { Link, router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from './style'
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from 'expo-router';
import { GoogleApiGeocodingResponse, IFarm } from "@/interfaces/global";
import { statesJSON } from '@/constants'


type FormSubmitFormik = {
  displayName: string;
  name: string;
  phone: string;
  openHour: string;
  closeHour: string;
  farmAddress_street: string;
  farmAddress_city: string;
  farmAddress_state: string;
  farmAddress_zip: string;
  farmAddress_geoLocation_lat: number;
  farmAddress_geoLocation_lng: number;
}

const API_KEY = "AIzaSyBeYJE8YpRJJNggMOArkzcgMnM4Fpxm3Gs"
const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
var poBoxantiPattern = /\bP(ost|ostal)?([ \.]*O(ffice)?)?([ \.]*Box)?\b/i;

function isFirebaseStorageUrl(url: string) {
  return url.includes('firebasestorage')
}

const FarmSchema = Yup.object().shape({
  displayName: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
  name: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
  phone: Yup.string().required('Required').matches(phoneRegExp, 'Phone number is not valid'),
  openHour: Yup.string().required('Required'),
  closeHour: Yup.string().required('Required'),
  "farmAddress_street": Yup.string().test("valid address", "invalid Address", value => {
    return poBoxantiPattern.test(value ?? "") ? false : true
  }).required('Required'),
  "farmAddress_city": Yup.string().required('Required'),
  "farmAddress_state": Yup.string().test('valid state', 'invalid state', (value) => {
    const isValidAbbreviation = statesJSON.find((state) => state.abbreviation === value)
    const isValidName = statesJSON.find((state) => state.name === value)
    return Boolean(isValidAbbreviation || isValidName)
  }),
  "farmAddress_zip": Yup.string().required('Required').matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Zip code is not valid'),
  "farmAddress_geoLocation_lat": Yup.number().required('Required'),
  "farmAddress_geoLocation_lng": Yup.number().required('Required'),
});

export default function AddFarm() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ [key: string]: string }>();
  const [isSending, setIsSending] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [farmData, setFarmData] = useState<IFarm | null>(null);


  async function checkFarmNameUnique(name: string) {
    const Collection = collection(db, 'farms');
    const q = query(Collection, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0 ? false : true
  }

  async function handleFormSubmit(values: FormSubmitFormik) {

    setIsSending(true)
    const openHour = values.openHour.split(':');
    const closeHour = values.closeHour.split(':');
    try {

      if (openHour[0] > closeHour[0]) {
        Alert.alert('Open hour must be before close hour')
        return
      } else if (openHour[0] == closeHour[0] && openHour[1] > closeHour[1]) {
        Alert.alert('Open hour must be before close hour')
        return
      }

      if (!image) {
        Alert.alert('Please select an image')
        Toast.show({
          type: "error",
          text1: "ERROR!",
          text2: `Please select an image`,
        })
        return
      }

      if (id === "null" && !await checkFarmNameUnique(values.name)) {
        Alert.alert('Farm name already exists! Try another one.')
        Toast.show({
          type: "error",
          text1: "ERROR!",
          text2: `Farm name already exists! Try another one.`,
        })
        setIsSending(false)
        return;
      }

      //check if the address is a valid google places address
      const address = `${values.farmAddress_street}, ${values.farmAddress_city}, ${values.farmAddress_state}, ${values.farmAddress_zip}`
      const response = await fetch(`${GOOGLE_API_URL}?address=${address}&key=${API_KEY}`)
      const data = await response.json() as GoogleApiGeocodingResponse
      if (data.status !== 'OK') {
        Alert.alert('Invalid address')
        Toast.show({
          type: "error",
          text1: "ERROR!",
          text2: `Invalid address`,
        })
        setIsSending(false)
        return
      }

      if (data.results[0].geometry.location.lat === 0 || data.results[0].geometry.location.lng === 0) {
        Alert.alert('Invalid address')
        Toast.show({
          type: "error",
          text1: "ERROR!",
          text2: `Invalid address`,
        })
        setIsSending(false)
        return
      }

      const StoredImageURL = isFirebaseStorageUrl(image) ? image : await uploadImageAsync(image);

      const farmData = {
        ...values,
        farmImageUrl: StoredImageURL,
        owner: user!.uid,
        farmAddress: {
          street: values.farmAddress_street,
          city: values.farmAddress_city,
          state: values.farmAddress_state,
          zip: values.farmAddress_zip,
          geoLocation: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
        }
      }

      if (id) {
        await setDoc(doc(db, "farms", id), farmData)
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Successfully Updated farm",
        })
      } else {
        await setDoc(doc(db, "farms", uuidv4()), farmData)
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Farm added to your Farms list",
        })
      }

      router.push('/(tabs)/')
    } catch (error) {
      console.log(error)
      Alert.alert('Error uploading image')
      Toast.show({
        type: "error",
        text1: "ERROR!",
        text2: `${error}`,
      })
    } finally {
      setImage(undefined)
      setIsSending(false)
    }
  }

  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    }
    checkPermissions()
  }, [])

  useEffect(() => {
    function checkEditFarm() {
      if (id !== 'null') {
        const Collection = collection(db, "farms");
        const q = query(Collection, where('__name__', "==", id));

        onSnapshot(q, (QuerySnapshot) => {
          const data = QuerySnapshot.docs.map(doc => {
            return {
              ...doc.data() as Omit<IFarm, 'id'>,
              id: doc.id,
            } as IFarm;
          });

          if (data.length > 0 && data) {
            setFarmData(data[0])
            setImage(data[0].farmImageUrl)
          }
        });
      }
    }
    return checkEditFarm()
  }, [id])


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function uploadImageAsync(uri: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    }) as any;
    try {
      const fileRef = ref(storage, uuidv4());
      await uploadBytes(fileRef, blob);
      // blob.close();
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while uploading image",
      })
      Alert.alert("An error occurred while uploading image");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <BackgroundContainerCentered>
        <FormContainerFarm>
          <Text
            style={[styles.headingTextH1, { textAlign: 'center' }]}
          >
            Farm Characteristics
          </Text>
          <Formik
            initialValues={{
              displayName: farmData ? farmData.displayName : '',
              name: farmData ? farmData.name : '',
              phone: farmData ? farmData.phone : '',
              openHour: farmData ? farmData.openHour : "09:00",
              closeHour: farmData ? farmData.closeHour : "17:00",
              "farmAddress_street": farmData?.farmAddress?.street ?? '',
              "farmAddress_city": farmData?.farmAddress?.city ?? '',
              "farmAddress_state": farmData?.farmAddress?.state ?? '',
              "farmAddress_zip": farmData?.farmAddress?.zip ?? '',
              "farmAddress_geoLocation_lat": farmData?.farmAddress?.geoLocation.lat ?? 39.8097343,
              "farmAddress_geoLocation_lng": farmData?.farmAddress?.geoLocation.lng ?? -98.5556199,
            }}
            onSubmit={async (values, { resetForm }) => {
              console.log('VALUES ON SUBMIT', values)
              await handleFormSubmit(values as FormSubmitFormik);
              resetForm();
            }}
            validationSchema={FarmSchema}
            validateOnBlur
            enableReinitialize
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
              return (
                <View style={{ flex: 1, gap: 16 }}>
                  <Input
                    label="Farm Display Name"
                    onChangeText={handleChange('displayName')}
                    onBlur={handleBlur('displayName')}
                    value={values.displayName}
                    placeholder="Farm Display Name"
                    error={errors.displayName}
                    required
                  />
                  <Input
                    label="Farm Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder="Farm Name"
                    required
                    error={errors.name}
                  />

                  <Input
                    label="Phone Number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="(123) 456-7890"
                    error={errors.phone}
                    keyboardType="phone-pad"
                    maxLength={10}
                    required
                  />
                  <Text
                    style={[styles.headingTextH1, { textAlign: 'center' }]}
                  >
                    Farm Address
                  </Text>

                  <Input
                    label="Farm Address street"
                    onChangeText={handleChange('farmAddress_street')}
                    onBlur={handleBlur('farmAddress_street')}
                    value={values.farmAddress_street as string ?? ''}
                    placeholder="Farm Address"
                    required
                    error={errors["farmAddress_street"]}
                  />

                  <Input
                    label="Farm Address city"
                    onChangeText={handleChange('farmAddress_city')}
                    onBlur={handleBlur('farmAddress_city')}
                    value={values.farmAddress_city as string || ''}
                    placeholder="Farm Address"
                    required
                    error={errors.farmAddress_city}
                  />

                  <Input
                    label="Farm Address state"
                    onChangeText={handleChange('farmAddress_state')}
                    onBlur={handleBlur('farmAddress_state')}
                    value={values.farmAddress_state as string || ''}
                    placeholder="Farm Address State"
                    required
                    error={errors.farmAddress_state}
                  />

                  <Input
                    label="Farm Address zip"
                    keyboardType="number-pad"
                    onChangeText={handleChange('farmAddress_zip')}
                    onBlur={handleBlur('farmAddress_zip')}
                    value={values.farmAddress_zip as string || ''}
                    placeholder="Farm Address State"
                    required
                    error={errors.farmAddress_zip}
                  />


                  <View style={styles.rowView}>
                    <Label>Open Hour</Label>
                    <HoursInput
                      onChange={handleChange('openHour')}
                      value={values.openHour}
                    />
                  </View>
                  <View style={styles.rowView}>
                    <Label>Close Hour</Label>
                    <HoursInput
                      onChange={handleChange('closeHour')}
                      value={values.closeHour}
                    />
                  </View>

                  {id !== "null" &&
                    (
                      <>
                        <View style={styles.imageWrapper}>
                          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                        </View>
                        <CustomButton onPress={pickImage} title="Edit Image" />
                      </>
                    )
                  }
                  {id === "null" && <CustomButton onPress={pickImage} title="Add Image" />}

                  <SubmitButton
                    onPress={handleSubmit as any}
                    style={{ marginTop: 16 }}
                    isLoading={isSending}
                    title="Submit"
                  />
                  <Link href="/(tabs)/" asChild>
                    <Text style={styles.backLink}>
                      back
                    </Text>
                  </Link>
                </View>
              )
            }}
          </Formik>
        </FormContainerFarm>
      </BackgroundContainerCentered>
    </ScrollView>
  )
}
