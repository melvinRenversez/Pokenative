import { Stack } from "expo-router";
import { MoneyProvider } from "./MoneyContext";

export default function RootLayout() {
  return(
    <MoneyProvider>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      />
    </MoneyProvider>
  )
}
