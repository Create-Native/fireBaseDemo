import { StatusBar } from 'expo-status-bar';
import { onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView } from 'react-native';
import {firestore, collection, addDoc, MESSAGES, serverTimestamp} from './firebase/Config'
import Constants from 'expo-constants';
import { convertFirbaseTimeStampToJS } from './helpers/Functions';

export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setmessages] = useState([])
  
  useEffect(() =>{
    const q = query(collection(firestore,MESSAGES), orderBy('created','desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirbaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setmessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])


  const save =async()=> {
    const docRef = await addDoc(collection(firestore,MESSAGES),{
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
    console.log('message saved')
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
        <TextInput 
          placeholder='Enter new message...'
          value = {newMessage}
          onChangeText={text => setNewMessage(text)}
        />
      <Button title="save" onPress={save}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.StatusBarheight,
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    padding:10,
    marginTop:10,
    marginBottom:10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius5: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12
  }
});
