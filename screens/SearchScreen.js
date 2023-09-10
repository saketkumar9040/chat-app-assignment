import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import backgroundImage from "../assets/images/home-background.jpg";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.searchContainer}>
          <TextInput style={styles.textInput} placeholder="search user" />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="search" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        {searchText === "" && (
          <View style={styles.searchUserContainer}>
            <Entypo name="emoji-happy" size={200} color="#fff" />
            <Text style={styles.searchUserText}>Search users</Text>
          </View>
        )}
        {searchText && userList.length > 0 && (
          <FlatList
            style={{ flex: 1 }}
            data={userList}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.chatUserContainer}
                  onPress={() =>
                    navigation.navigate("Chat", { chatUser: item.item })
                  }
                >
                  <View style={styles.userImageContainer}>
                    <FontAwesome name="user-circle-o" size={50} color="#fff" />
                  </View>
                  <View style={styles.userDetailsContainer}>
                    <Text style={styles.userName}>
                      {item.item.name.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        {searchText && userList.length === 0 && (
          <View style={styles.noUserFound}>
            <Entypo name="emoji-sad" size={200} color="#fff" />
            <Text style={styles.noUserFoundText}>No User Found !</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:10,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "500",
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
  noUserFound: {
    flex: 1,
    gap: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  noUserFoundText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  searchUserContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:'center',
    gap:20,
  },
  searchUserText:{
    fontSize:40,
    fontWeight:"600",
    color:"#fff",
    textAlign:"center"
  }
});
