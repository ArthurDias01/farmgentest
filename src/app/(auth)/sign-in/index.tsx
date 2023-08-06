import React from "react";
import { View, Text } from "react-native";
import { theme } from "@/styles/theme";
import { Formik } from "formik";
import { BackgroundContainerCentered } from "@/components/BackgroundCenteredContainer";
import { FormContainerAuth } from "@/components/Forms/FormContainerAuth";
import { Input } from "@/components/Forms/Input";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/Auth";
import * as Yup from 'yup';
import { styles } from "./style";


const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Required'),
});

interface FormValues {
  email: string;
  password: string;
}

export default function SignIn() {

  const { signIn, isLogginIn } = useAuth();

  async function handleSignInSubmit(values: FormValues) {
    const { email, password } = values;
    try {
      await signIn(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BackgroundContainerCentered>
      <FormContainerAuth>
        <Text
          style={[styles.headingTextH1, { textAlign: 'center' }]}
        >
          Login
        </Text>
        <Formik initialValues={{
          email: '',
          password: '',
        }}
          onSubmit={handleSignInSubmit}
          validationSchema={SigninSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ flex: 1, gap: 16 }}>
              <Input
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email"
                error={errors.email}
              />
              <Input
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                placeholder="password"
                error={errors.password}
              />
              <SubmitButton
                onPress={handleSubmit as any}
                style={{ marginTop: 16 }}
                isLoading={isLogginIn}
                title="Submit"
              />
              <Link href="/(auth)/register" asChild>
                <Text style={{ color: theme.colors.white, textAlign: 'center', marginTop: 16 }}>
                  Don't have an account? Register
                </Text>
              </Link>
            </View>
          )}
        </Formik>
      </FormContainerAuth>
    </BackgroundContainerCentered>
  )
}
