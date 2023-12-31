 import { firebase } from "../firebase/FirebaseConfig"
 
 export const SaveNewChat = async (loggedInUserId, chatData,groupName=null) => {
    const newChatData = {
      users: [...chatData],
      createdBy: loggedInUserId,
      updatedBy: loggedInUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), 
    };
  
    if(groupName){
      newChatData.groupName=groupName;
    }
  
    const newChat = await firebase.database().ref("Chats").push(newChatData);
  
    let chatUsers = newChatData.users;
    for (let i = 0; i < chatUsers.length; i++) {
      const userId = chatUsers[i];
    await firebase.database().ref(`UsersChats/${userId}`).push(newChat.key)
    }
    return newChat.key;
  };
 
  export const sendMessage = async (chatId, senderUid, messageText) => {

  const messageData = {
    sentBy: senderUid,
    sentAt: new Date().toISOString(),
    text: messageText,
  };

  const send = await firebase.database().ref(`Messages/${chatId}`).push(messageData);
  console.log(send)

  const updatedChatData = {
    updatedBy: senderUid,
    updatedAt: new Date().toISOString(),
    latestMessageText: messageText,
  }
  await firebase.database().ref(`Chats/${chatId}`).update(updatedChatData)

};

 