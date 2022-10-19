import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import {firestore, collection, addDoc, MESSAGES, serverTimestamp} from './firebase/Config'
//testi2
export default function App() {
  const [newMessage, setNewMessage] = useState('')

  const save =async()=> {
    const docRef = await addDoc(collection(firestore,MESSAGES),{
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
    console.log('message saved')
  }

  return (
    <View style={styles.container}>
      <TextInput 
      placeholder='Enter new message...'
      value = {newMessage}
      onChangeText={text => setNewMessage(text)}
      />
      <Button title="save" onPress={save}/>
    </View>
  );
}
// älä välitä
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
