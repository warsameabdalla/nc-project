import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInUp from "./components/SignInUp";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EventList from "./components/EventList";
import EventPage from "./components/EventPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={SignInUp} />
        <Stack.Screen name={"EventList"} component={EventList} />
        <Stack.Screen name={"EventPage"} component={EventPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
