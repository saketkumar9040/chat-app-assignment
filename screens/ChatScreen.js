import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking
} from "react-native";
import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/chat-background.jpg";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SaveNewChat, sendMessage } from "../utils/chatHandler";
import { useSelector } from "react-redux";
import { firebase } from "../firebase/FirebaseConfig";

const ChatScreen = ({ navigation, route }) => {
  const [chatUser, setChatUser] = useState(route.params.chatUser ?? "");
  // console.log(chatUser)
  const loggedInUser = useSelector((state) => state.auth.userData);
  const [messageData, setMessageData] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(
    route.params.chatId ?? "-NdzGiJcVy9nAsgFMflS"
  );
  // console.log(chatId)

  useEffect(() => {
    if (chatId !== "") {
      const findUserData = async () => {
        let user = await firebase
          .database()
          .ref(`Chats/${chatId}`)
          .once("value", (snapshot) => {
            //  console.log(snapshot.val());
            let chatData = snapshot.val();
            // console.log(chatData.users)
            let userUID = chatData.users.filter(
              (uid) => uid !== loggedInUser.uid
            );

            let userDetails = firebase
              .database()
              .ref(`UserData/${userUID[0]}`)
              .once("value", (snapshot) => {
                // console.log(snapshot.val())
                setChatUser(snapshot.val());
              });
          });
      };
      findUserData();
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId === "") {
      return;
    }
    const findMessageData = async () => {
      let messages = await firebase
        .database()
        .ref(`Messages/${chatId}`)
        .on("value", (snapshot) => {
          // console.log(snapshot.val());
          const messageData = Object.values(snapshot.val());
          setMessageData(messageData);
        });
    };
    findMessageData();
  }, []);

  navigation.setOptions({
    headerLeft: () => {
      return (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          <FontAwesome name="user-circle-o" size={40} color="#fff" />
          <Text style={styles.headerLeftText}>{chatUser.name}</Text>
        </View>
      );
    },
    headerRight: () => {
      return (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${chatUser.number}`)}}>
            <Ionicons name="call" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
            <FontAwesome name="user" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    },
  });

  const sendMessageHandler = async () => {
    try {
      if (!chatId || chatId === "") {
        let userIds = [loggedInUser.uid, chatUser.uid];
        // console.log(userIds)
        const newChat = await SaveNewChat(loggedInUser.uid, userIds);
        setChatId(newChat);
        const newMessage = await sendMessage(
          newChat,
          loggedInUser.uid,
          messageText
        );
        setMessageText("");
      } else {
        const newMessage = await sendMessage(
          chatId,
          loggedInUser.uid,
          messageText
        );
        setMessageText("");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("OOPS😪", "There was some error while sending the message");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {messageData.length > 0 ? (
        <FlatList
          data={messageData}
          renderItem={(item) => {
            // console.log(item.item);
            return (
              <>
                {item.item.sentBy === loggedInUser.uid ? (
                  <View style={styles.sentMessageContainer}>
                    <Text style={styles.sentMessageText}>{item.item.text}</Text>
                  </View>
                ) : (
                  <View style={styles.receivedMessageContainer}>
                    <Text style={styles.receivedMessageText}>
                      {item.item.body}
                    </Text>
                  </View>
                )}
              </>
            );
          }}
        />
      ) : (
        <View style={styles.noMessageContainer}>
          <Text style={styles.noMessageText}>No Messages 😥</Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <Ionicons name="camera-sharp" size={30} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="type your message"
          value={messageText}
          autoCapitalize="none"
          onChangeText={(e) => setMessageText(e)}
        />
        <TouchableOpacity onPress={() => sendMessageHandler()}>
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
  headerRightContainer: {
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#188780",
    padding: 10,
    paddingHorizontal: 15,
  },
  noMessageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    // justifyContent:"center"
  },
  noMessageText: {
    fontSize: 25,
    fontWeight: "900",
    backgroundColor: "#188780",
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 10,
    color: "#fff",
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
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 10,
    color: "#fff",
    letterSpacing: 1,
  },
});
