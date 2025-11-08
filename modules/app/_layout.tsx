import { AuthProvider, useAuth } from "@/modules/auth/context/AuthContext";
import AuthNavigator from "@/modules/auth/navigation/AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabsLayout from "./(tabs)/_layout";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#fff", height: 90 },
      headerTitleStyle: { fontWeight: "600", fontSize: 18 },
    }}>
      {user ? (
        <Stack.Screen name="MainStack" component={TabsLayout} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
