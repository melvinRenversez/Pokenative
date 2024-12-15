import { Link, Stack } from "expo-router";
import { MoneyProvider } from "./MoneyContext";

export default function RootLayout() {
  return (
    <MoneyProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        {/* Définir les routes pour les écrans */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="shop" options={{ title: "Shop" }} />
      </Stack>
    </MoneyProvider>
  );
}
