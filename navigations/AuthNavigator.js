import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainNavigator from "./MainNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const isAuth = false;

  return (
    <NavigationContainer>
      {isAuth ? (
        <MainNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AuthNavigator;
