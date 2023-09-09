import { ImageBackground, StyleSheet, Text, View ,FlatList, TextInput, TouchableOpacity} from 'react-native'
import React from 'react';
import backgroundImage from "../assets/images/chat-background.jpg";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';



const ChatScreen = ({navigation,route}) => {
    console.log(route.params);
    const chatUser = route.params.chatUser;

    navigation.setOptions({
        headerLeft: () => {
          return (
            <View style={styles.headerLeftContainer}>
                <AntDesign name="arrowleft" size={24} color="#fff" />
             <FontAwesome name="user-circle-o" size={40} color="#fff" />
              <Text style={styles.headerLeftText}>{chatUser.name}</Text>
            </View>
          );
        }
      });
  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={{flex:1,}}>
      <FlatList/>
      <View style={styles.bottomContainer}>
      <Ionicons name="camera-sharp" size={30} color="#fff" />
      <TextInput
         style={styles.textInput}
         placeholder='type your message'
      />
      <TouchableOpacity>

      <FontAwesome name="send" size={24} color="#fff" />
      </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerLeftContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems:'center',
        gap: 10,
      },
      headerLeftText: {
        fontSize: 25,
        fontWeight: "700",
        color: "#fff",
      },
    bottomContainer:{
        flexDirection:'row',
        alignItems:"center",
        backgroundColor:"#188780",
        padding:10,
        paddingHorizontal:15,
    },
    textInput:{
        flex:1,
        marginHorizontal:10,  
        backgroundColor:"#fff",
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:10,
        
    }
})