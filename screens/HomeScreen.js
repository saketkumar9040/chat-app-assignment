import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { firebase } from "../firebase/FirebaseConfig";
import backgroundImage from "../assets/images/home-background.jpg";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation, route }) => {
  const loginUserData = useSelector((state) => state.auth.userData);
  // console.log(loginUserData.uid)
  const [chatIds, setChatIds] = useState([]);
  console.log(chatIds);

  navigation.setOptions({
    headerLeft: () => {
      return (
        <View style={styles.headerLeftContainer}>
          <AntDesign name="message1" size={29} color="#fff" />
          <Text style={styles.headerLeftText}>CHAT APP</Text>
        </View>
      );
    },
    headerTitle: "",
    headerRight: () => {
      return (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="search" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesome5 name="user-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    },
  });

  useEffect(() => {
    // getAllUsers();
    getAllChats()
  }, []);

  const getAllChats = async () => {
   const chats = await firebase.database().ref(`UsersChats/${loginUserData.uid}`).on("value",(snapshot)=>{
     let chatIds = Object.values(snapshot.val())
     setChatIds(chatIds)
   })
  }

  // const getAllUsers = async () => {
  //   await firebase
  //     .database()
  //     .ref("UserData")
  //     .on("value",async (snapshot) => {
  //       allUsers=[]
  //       let data = Object.values(snapshot.val());
  //        data.forEach((user)=>{
  //           if(user.uid !== loginUserData.uid){
  //             allUsers.push(user)
  //           }
  //        })
  //       // console.log(allUsers);
  //       await setUsers(allUsers)
  //     });
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {/* <FlatList
          style={{ flex: 1 }}
          data={users}
          renderItem={(item) => {        
            return (
              <TouchableOpacity
                style={styles.chatUserContainer}
                onPress={() =>
                  navigation.navigate("Chat", { chatUser: [item.item] })
                }
              >
                <View style={styles.userImageContainer}>
                  <FontAwesome name="user-circle-o" size={50} color="#fff" />
                </View>
                <View style={styles.userDetailsContainer}>
                  <Text style={styles.userName}>
                    {item.item.name.toUpperCase()}
                  </Text>
                  <Text style={styles.latestMessage}>No messages yet</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.dateText}>12/4/4536</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        /> */}
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 20,
    flexDirection: "row",
    gap: 10,
  },
  headerLeftText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
    gap: 13,
  },
  container: {
    flex: 1,
    // padding:10,
  },
  chatUserContainer: {
    flexDirection: "row",
    marginVertical: 13,
    marginHorizontal: 10,
  },
  userImageContainer: {},
  userDetailsContainer: {
    flex: 1,
    marginLeft: 15,
    gap: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
  },
  latestMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    fontStyle: "italic",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#fff",
  },
});
