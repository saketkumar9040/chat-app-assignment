import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import ChatScreen from "../screens/ChatScreen";
import { useEffect } from "react";
import { firebase } from "../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setChatUsersList } from "../redux/userSlice";
import { setMessageList } from "../redux/messageSlice";
import { setChatList } from "../redux/chatSlice";

const Stack = createStackNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.userData);
  // console.log(loggedInUser)

  // FETCHING DATA FROM DATABASE FOR LOGGED IN USER ============================================>

  useEffect(() => {
    const chatData = {};
    const chatUserData = {};
    const messageData = {};
    const fetchingData = firebase
      .database()
      .ref(`UsersChats/${loggedInUser.uid}`)
      .on("value", (chatSnapshot) => {
        chatIds = Object.values(chatSnapshot.val());
        //  console.log(chatIds)

        for (let i = 0; i < chatIds.length; i++) {
          const chatRef = firebase
            .database()
            .ref(`Chats/${chatIds[i]}`)
            .on("value", (snapshot) => {
              const chat = snapshot.val();
              chatData[snapshot.key] = snapshot.val();

              chat.users.forEach(async (uid) => {
                const userRef = firebase
                  .database()
                  .ref(`UserData/${uid}`)
                  .on("value", (snapshot) => {
                    let user = snapshot.val();
                    if (user.uid !== loggedInUser.uid) {
                      chatUserData[snapshot.key] = snapshot.val();
                    }
                  });
              });
            });
          const messageRef = firebase
            .database()
            .ref(`Messages/${chatIds[i]}`)
            .on("value", (snapshot) => {
              messageData[snapshot.key] = snapshot.val();
            });
        }
      });
    dispatch(setChatList({ chatList: chatData }));
    dispatch(setChatUsersList({ chatUsersList: chatUserData }));
    dispatch(setMessageList({ messageList: messageData }));
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: "#188780",
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#188780",
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "800",
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: "#188780",
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "800",
            letterSpacing: 2,
          },
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#188780",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
