import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import backgroundImage from "../assets/images/home-background.jpg";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
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
        <FlatList
          style={{ flex: 1 }}
          data={data}
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
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
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
});
