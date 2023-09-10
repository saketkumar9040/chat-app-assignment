import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerStyle:{
          backgroundColor:"#188780"
        }}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTintColor: "#fff",headerStyle:{
          backgroundColor:"#188780",
        }}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{headerTintColor: "#fff",
        headerTitleStyle:{
          fontSize:25,
          fontWeight:"800",
          letterSpacing:2,
        },
        headerStyle:{
          backgroundColor:"#188780",
        }}}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{headerTintColor: "#fff",
        headerTitleStyle:{
          fontSize:25,
          fontWeight:"800",
          letterSpacing:2,
        },
        headerTitle:"",
        headerStyle:{
          backgroundColor:"#188780",
        }}}/>
    </Stack.Navigator>
  )
}

export default MainNavigator;