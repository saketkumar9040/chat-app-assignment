import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View,FlatList } from "react-native";
import React from "react";
import { Ionicons, AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";

import backgroundImage from "../assets/images/home-background.jpg"

const HomeScreen = ({ navigation, route }) => {
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

  data = [
   {
    name:"raj",
    email:"raj@gmail.com",
    profilePic:"",
    phone:"7896837838"
   },
   {
    name:"sham",
    email:"sham@gmail.com",
    profilePic:"",
    phone:"7896837838"
   },
   {
    name:"shankar",
    email:"shankar@gmail.com",
    profilePic:"",
    phone:"7896837838"
   },
   {
    name:"sahid",
    email:"sahid@gmail.com",
    profilePic:"",
    phone:"7896837838"
   },
   {
    name:"sonu",
    email:"sonu@gmail.com",
    profilePic:"",
    phone:"7896837838"
   },
  ]

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={{flex:1,}}>
       <FlatList
         style={{flex:1}}
         data={data}
         renderItem={(item)=>{
          return(
            <TouchableOpacity style={styles.chatUserContainer} onPress={()=>navigation.navigate("Chat",{chatUser:item.item})}>
              <View style={styles.userImageContainer}>
              <FontAwesome name="user-circle-o" size={50} color="#fff" />
              </View>
              <View style={styles.userDetailsContainer}>
              <Text style={styles.userName}>{item.item.name.toUpperCase()}</Text>
               <Text style={styles.latestMessage}>No messages yet</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.dateText}>12/4/4536</Text>
              </View>
            </TouchableOpacity>
          )
         }
        }

       />
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
    gap:13,
  },
  container:{
    flex:1,
    // padding:10,
  },
  chatUserContainer:{
    flexDirection:'row',
    marginVertical:13,
    marginHorizontal:10,
  },
  userImageContainer:{
      
  },
  userDetailsContainer:{
    flex:1,
    marginLeft:15,
    gap:4
  },
  userName:{
    fontSize:20,
    fontWeight:'900',
    color:"#fff",
    letterSpacing:1,
  },
  latestMessage:{
    fontSize:14,
    fontWeight:"500",
    color:"#fff",
    fontStyle:'italic'
  },
  timeContainer:{
    flexDirection:'row',
    alignItems:'flex-end',
  },
  dateText:{
    fontSize:15,
    fontWeight:"900",
    color:'#fff'
  }
});
