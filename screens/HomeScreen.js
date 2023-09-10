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
  Entypo,
} from "@expo/vector-icons";
import { firebase } from "../firebase/FirebaseConfig";
import backgroundImage from "../assets/images/home-background.jpg";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation, route }) => {
  const loginUserData = useSelector((state) => state.auth.userData);
  // console.log(loginUserData.uid)
  const [chatIds, setChatIds] = useState([]);
  const [allChatsData,setAllChatsData] = useState([]);
  const [ allChatsUsers,setAllChatsUsers]  = useState([])
  // console.log(allChatsData);

  if(allChatsData.length){
    let chatData = allChatsData.sort((a,b)=>{
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    setAllChatsData(chatData)
  }
  // console.log(chatData)

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

  // useEffect(() => {
  //   // getAllUsers();
  //   getAllChatsIds();
  //   getAllChatsData();
  // }, []);

  // const getAllChatsIds = async () => {
  //  const chats = await firebase.database().ref(`UsersChats/${loginUserData.uid}`).on("value",(snapshot)=>{
  //    let chatIds = Object.values(snapshot.val())
  //    setChatIds(chatIds)
  //  })
  // };

  // const getAllChatsData = async () => {
  //   let chatData= []
  //   for(let i =0;i<chatIds.length;i++){
  //     let chatId = chatIds[i]
  //     const datas = await firebase.database().ref(`Chats/${chatId}`).on("value",(snapshot)=>{
  //       // console.log(snapshot.val())
  //          chatData.push(snapshot.val())
  //       })
  //     }
  //     setAllChatsData(chatData);
  // };

  // const getAllUsers = async () => {
  //  let  allUsers=[]
  //   await firebase
  //     .database()
  //     .ref("UserData")
  //     .on("value",async (snapshot) => {
  //       let data = Object.values(snapshot.val());
  //        data.forEach((user)=>{
  //           if(user.uid !== loginUserData.uid){
  //             allUsers.push(user)
  //           }
  //        })
  //       // console.log(allUsers);
  //     });
  //     return allUsers
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      >{
        allChatsData.length > 0 ? (
          <FlatList
          style={{ flex: 1 }}
          data={allChatsData}
          renderItem={(item) => {   
            console.log(item.item) 
            // const userIds = item.item.users.filter((uid)=>uid !== loginUserData.uid);
            // console.log(userIds)
            // let userData = ""
            // if(userIds.length<2){
            //    firebase.database().ref(`UserData/${userIds[0]}`).on("value",(snapshot)=>{
            //       console.log(snapshot.val());
            //       userData = snapshot.val()
            //    })
            // }
             
            return (
              <TouchableOpacity
                style={styles.chatUserContainer}
                onPress={() =>
                  navigation.navigate("Chat", { chatUser: item.item?.users})
                }
              >
                <View style={styles.userImageContainer}>
                  <FontAwesome name="user-circle-o" size={50} color="#fff" />
                </View>
                <View style={styles.userDetailsContainer}>
                  <Text style={styles.userName}> 
                    {/* {userData.name.toUpperCase()} */}
                  </Text>
                  <Text style={styles.latestMessage}>No messages yet</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.dateText}>12/4/4536</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        ): (
          <View style={styles.userContainer}>
          <Text style={{...styles.noUserText,fontSize:40}}>No user yet !</Text>
          <Entypo name="emoji-sad" size={180} color="#fff" style={{marginVertical:30,}}/>
          <Text style={styles.noUserText}>Search for </Text>
          <Text style={styles.noUserText}>{`>>>      Family👪` }</Text>
          <Text style={styles.noUserText}>{`>>>      Friends😎`}</Text>
          <Text style={styles.noUserText}>{`>>>      Groups👩‍👩‍👧‍👦`}</Text>
        </View>
        )
      }
     
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
   userContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop:100,
    // justifyContent: "center",
  },
  noUserText: {
    fontSize: 22,
    paddingTop: 10,
    color: "#fff",
    fontWeight:"800"
  },
});
