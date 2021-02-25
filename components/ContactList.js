import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { auth, firestore } from "../my-app/config/firbase";
import { loggingOut } from "../my-app/config/fireBaseMethods";
import ChatRoom from "../components/ChatRoom";

export default function ContactList(props) {
    const contactsRef = firestore.collection("users").doc(`${props.route.params.user._id}`);
    //we have the current user in props - we need to get the data for the contact user passed down
    const [contact, setContact] = useState("");
    const [secondUser, setSecondUser] = useState("");

useEffect(() => {
    async function getUserData(){ 
        let doc = await contactsRef
        .get();
   
        let dataObj = doc.data();
        setContact(dataObj.contact);
    }  getUserData();
}, []);

console.log(contact[0])

useEffect(() => {
async function getContactData(){ 
    let docTwo = await firestore
        .collection("users")
        .doc(contact[0])
        .get();

        let dataObjTwo = docTwo.data();
        setSecondUser(dataObjTwo);
        console.log(secondUser)
    } getContactData();
}, []);

return (
        <View>
            <Text>Contacts</Text>
            <Button title={contact}></Button>
        </View>
    )
}
