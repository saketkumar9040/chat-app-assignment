import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useDebugValue, useState } from "react";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [passwordFocus, setPasswordFocus] = useState(false);

  const registerHandler = async () => {
    if(userDetails.email==="" || userDetails.password === "" || userDetails.phone==="" || userDetails.name===""){
      return Alert.alert("please enter all the details 😐")
    }
    Alert.alert("registering ...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIconcontainer}>
        <FontAwesome5 name="facebook-messenger" size={100} color="#fff" />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={30} color="#188780" />
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#188780"
            style={styles.textInput}
            autoCapitalize="none"
            value={userDetails.name}
            onChangeText={(e) => setUserDetails({ ...userDetails, name: e })}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={30} color="#188780" />
          <TextInput
            placeholder="Enter your e-mail"
            placeholderTextColor="#188780"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
            value={userDetails.email}
            onChangeText={(e) => setUserDetails({ ...userDetails, email: e })}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={30} color="#188780" />
          <TextInput
            placeholder="Enter your number"
            placeholderTextColor="#188780"
            style={styles.textInput}
            keyboardType="numeric"
            autoCapitalize="none"
            value={userDetails.phone}
            onChangeText={(e) => setUserDetails({ ...userDetails, phone: e })}
          />
        </View>
        <View style={styles.inputContainer}>
        <Entypo name={passwordFocus?"lock-open":"lock"} size={30} color="#188789" />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#188780"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={!passwordFocus}
            value={userDetails.password}
            onChangeText={(e) =>
              setUserDetails({ ...userDetails, password: e })
            }
          />
          <TouchableOpacity onPress={() => setPasswordFocus(!passwordFocus)}>
            <Entypo name={passwordFocus?"eye":"eye-with-line"} size={24} color="#188780" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => registerHandler()}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.alreadyAccountText}>
            Already have an account ?
          </Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.registerText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    //   marginTop:Platform.OS==="android"?40:0,
    flex: 1,
  },
  headerIconcontainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    backgroundColor: "#188780",
    marginBottom: 40,
    paddingTop: 20,
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
    color: "#188780",
  },
  registerButton: {
    marginTop: 30,
    borderWidth: 3,
    paddingHorizontal: 40,
    padding: 5,
    borderColor: "#188780",
    borderRadius: 80,
  },
  registerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#188780",
    letterSpacing: 2,
  },
});
