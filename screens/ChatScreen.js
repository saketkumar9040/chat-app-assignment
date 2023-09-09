import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import backgroundImage from "../assets/images/chat-background.jpg";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { messageData } from "../assets/messageData";
import { SaveNewChat, sendMessage } from "../utils/chatHandler";
import { useSelector } from "react-redux";

const ChatScreen = ({ navigation, route }) => {
  // console.log(route.params);
  const chatUser = route.params.chatUser;

  const loggedInUser = useSelector((state)=>state.auth.userData);
  
  const [messageText, setMessageText] = useState("");
//   console.log(chatUser)
// console.log(messageText)

  navigation.setOptions({
    headerLeft: () => {
      return (
        <View style={styles.headerLeftContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
            </TouchableOpacity>
          <FontAwesome name="user-circle-o" size={40} color="#fff" />
          <Text style={styles.headerLeftText}>{chatUser.name}</Text>
        </View>
      );
    },
  });

  const sendMessageHandler = async() => {
    try {   
        let userIds = [loggedInUser.uid]
        const chatUsersIds = chatUser.forEach((user)=>{userIds.push(user.uid)});
        // console.log(userIds)
        const newChat = await SaveNewChat(loggedInUser.uid,userIds);
        const newMessage = await sendMessage(newChat,loggedInUser.uid,messageText);
        setMessageText("");
    } catch (error) {
        console.log(error);
        Alert.alert("OOPS😪","There was some error while sending the message")
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <FlatList
        data={messageData}
        renderItem={(item) => {
        //   console.log(item.item.body);
          return (
            // <View style={styles.receivedMessageContainer}>
            //   <Text style={styles.receivedMessageText}>{item.item.body}</Text>
            // </View>
            <View style={styles.sentMessageContainer}>
              <Text style={styles.sentMessageText}>{item.item.body}</Text>
            </View>
          );
        }}
      />
      <View style={styles.bottomContainer}>
        <Ionicons name="camera-sharp" size={30} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="type your message"
          value={messageText}
          autoCapitalize="none"
          onChangeText={(e)=>setMessageText(e)}
        />
        <TouchableOpacity onPress={()=>sendMessageHandler()}>
          <FontAwesome name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLeftText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#188780",
    padding: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    borderWidth: 4,
    borderLeftWidth: 0,
    borderColor: "#188780",
  },
  receivedMessageText: {
    fontSize: 15,
    fontWeight: "700",
    paddingHorizontal: 10,
    color: "#188780",
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#188780",
    padding: 10,
    marginVertical: 10,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    elevation: 10,
    borderWidth: 4,
    borderRightWidth: 0,
    borderColor: "#fff",
  },
  sentMessageText: {
    fontSize: 15,
    fontWeight: "700",
    paddingHorizontal: 10,
    color: "#fff",
  },
});
