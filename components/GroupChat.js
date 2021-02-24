import React, { useEffect, useState ,useCallback} from "react";
import { View, Text, StyleSheet, Alert, Button , TextInput} from "react-native";
import * as firebase from "firebase";
import { auth,firestore} from "../my-app/config/firbase";
import {GiftedChat} from "react-native-gifted-chat";

const chatsRef = firestore.collection("chats").doc("chatroom-1").collection("messages-chatroom-1") //this bit here will allow us to create different collections.
//maybe pass this down props later to take user to right chat room.
export default function App(props) {
       
  const [user,setUser] = useState(props.route.params);
  const [name,setName] = useState("");
  const [messages,setMessages]=useState([])

  useEffect(() => {
      
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({ type }) => type === 'added')
            .map(({ doc }) => {
                const message = doc.data()
                //createdAt is firebase.firestore.Timestamp instance
                //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                return { ...message, createdAt: message.createdAt.toDate()}
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
}, [])

const appendMessages = useCallback(
    (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
)

async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
}


return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
  },
});