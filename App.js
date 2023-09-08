import { Alert, StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";
import AuthNavigator from "./navigations/AuthNavigator";

export default function App() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      if (
        error.message ==
        "You cannot check for updates in development mode. To test manual updates, publish your project using `expo publish` and open the published version in this development client."
      ) {
        console.log(error.message);
      } else {
        Alert.alert(`Error fetching latest Expo update: ${error}`);
        console.log(error.message);
      }
    }
  }
  onFetchUpdateAsync();

  return (
     <AuthNavigator/>
  );
};

