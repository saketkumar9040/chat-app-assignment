import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIconcontainer}>
        <FontAwesome5 name="facebook-messenger" size={150} color="#fff" />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={30} color="#188780" />
          <TextInput
            placeholder="Enter your e-mail"
            placeholderTextColor="#188780"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo name="lock" size={30} color="#188789" />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#188780"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.alreadyAccountText}>Don't have an account ?</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    //   marginTop:Platform.OS==="android"?40:0,
    flex: 1,
  },
  headerIconcontainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "35%",
    backgroundColor: "#188780",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    padding: 10,
    margin: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#188780",
    borderRadius: 10,
  },
  textInput: {
    marginLeft: 10,
    paddingLeft: 10,
    padding: 5,
    fontSize: 20,
    fontWeight: "600",
    width: "80%",
  },
  buttonContainer: {
    marginVertical: 20,
    padding: 5,
    paddingHorizontal: 55,
    alignSelf: "center",
    backgroundColor: "#188780",
    borderRadius: 10,
    elevation: 10,
  },
  loginText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
  },
  registerContainer: {
    alignItems: "center",
  },
  alreadyAccountText: {
    fontSize: 17,
    fontWeight: "600",
    color:"#188780"
  },
  registerButton: {
    marginTop:30,
    borderWidth:3,
    paddingHorizontal:40,
    padding:5,
    borderColor:"#188780",
    borderRadius:80,

  },
  registerText:{
    fontSize:20,
    fontWeight:"700",
    color:"#188780",
    letterSpacing:2,

  }
});
