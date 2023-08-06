import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform, Alert } from "react-native";
import { theme } from "@/styles/theme";
import { Formik } from "formik";
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
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useAuth } from "@/contexts/Auth";
import { Link, router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from './style'

interface FormValues {
  displayName: string;
  name: string;
  phone: string;
  openHour: string;
  closeHour: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const FarmSchema = Yup.object().shape({
  displayName: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
  name: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
  phone: Yup.string().required('Required').matches(phoneRegExp, 'Phone number is not valid'),
  openHour: Yup.string().required('Required'),
  closeHour: Yup.string().required('Required'),
});

export default function AddFarm() {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  async function checkFarmNameUnique(name: string) {
    const Collection = collection(db, 'farms');
    const q = query(Collection, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0 ? false : true
  }

  async function handleFormSubmit(values: FormValues) {
    setIsSending(true)
    const openHour = values.openHour.split(':');
    const closeHour = values.closeHour.split(':');

    //check if openHour is before closeHour
    if (openHour[0] > closeHour[0]) {
      Alert.alert('Open hour must be before close hour')
      return
    } else if (openHour[0] == closeHour[0] && openHour[1] > closeHour[1]) {
      Alert.alert('Open hour must be before close hour')
      return
    }

    if (!image) {
      Alert.alert('Please select an image')
      return
    }

    if (!await checkFarmNameUnique(values.name)) {
      Alert.alert('Farm name already exists! Try another one.')
      setIsSending(false)
      return;
    }

    try {
      const StoredImageURL = await uploadImageAsync(image)

      const farmData = {
        ...values,
        farmImageUrl: StoredImageURL,
        owner: user!.uid,
      }
      await setDoc(doc(db, "farms", uuidv4()), farmData)
      Alert.alert('Farm added successfully')
      router.push('/(tabs)/')
    } catch (error) {
      console.log(error)
      Alert.alert('Error uploading image')
    } finally {
      setImage(null)
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
      blob.close();
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.log(error);
      Alert.alert("An error occurred while uploading image");
    }
  }

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
              displayName: '',
              name: '',
              phone: '',
              openHour: "09:00",
              closeHour: "17:00",
            }}
            onSubmit={async (values, { resetForm }) => {
              await handleFormSubmit(values);
              resetForm();
            }}
            validationSchema={FarmSchema}
            validateOnBlur
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
                {!image && <CustomButton onPress={pickImage} title="Add Image" />}
                {image &&
                  (
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                    </View>
                  )
                }
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
            )}
          </Formik>
        </FormContainerFarm>
      </BackgroundContainerCentered>
    </ScrollView>
  )
}
