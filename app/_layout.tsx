import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [authed, setAuthed] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      return token;
    } catch (error) {
      console.error("Failed to fetch the token from storage", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        // console.log("pathname:::", pathname);
        // console.log("token:::", token);

        if (token === null) {
          setAuthed(false);
          if (pathname !== "/login" && pathname !== "/register") {
            router.push("/login");
          }
        } else {
          setAuthed(true);
          if (pathname === "/login" || pathname === "/register") {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    })();
  }, [pathname]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name={`${authed ? "(tabs)" : "(auth)"}`}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
