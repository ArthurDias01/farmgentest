import { router, useRootNavigationState, useSegments } from "expo-router";
import { User } from "firebase/auth";
import { useEffect } from "react";

//this hook is having issues because of no router at the moment the app loads the first time
// https://github.com/expo/router/pull/794 & https://github.com/expo/router/issues/740
export function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments,navigationState]);
}
