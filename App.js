import { StatusBar } from 'expo-status-bar';
import { onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView } from 'react-native';
import {firestore, collection, addDoc, MESSAGES, serverTimestamp} from './firebase/Config'
import Constants from 'expo-constants';

export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setmessages] = useState([])
  
  useEffect(() =>{
    const q = query(collection(firestore,MESSAGES))

    const unsubscribe = onSnapshot(q,(QuerySnapshot) => {
      const tempMessages = []

      QuerySnapshot.forEach((doc) => {
        tempMessages.push(doc.data())
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
      <TextInput 
        placeholder='Enter new message...'
        value = {newMessage}
        onChangeText={text => setNewMessage(text)}
      />
      <Button title="save" onPress={save}/>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message}>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? Constants.StatusBarheight: 0,
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
  }
});
