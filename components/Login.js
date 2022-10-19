import { useState } from "react"
import { StyleSheet, Button, Text, TextInput, View, SafeAreaView } from "react-native"
import { getAuth, signInWithEmailAndPassword } from '../firebase/Config'
import Constants from 'expo-constants';


export default function Login({setLogin}) {
    const [userName, setUserName] = useState('') //test@test.com
    const [password, setPasword] = useState ('') //123456

      const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth,userName,password)
        .then((userCredential) => {
          console.log(userCredential.user)
          setLogin(true)
        }).catch((error) => {
          if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            alert("Inalid credentials!")
          } else if (error.code === 'auth/too-many-requests') {
            alert("Too many attempts, your account will be locked temporarility")
          } else {
            console.log (error.code)
            console.log (error.message)
          }
        })
      } 
 
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Login</Text>
                <Text style={styles.field}>Username</Text>
                <TextInput style={styles.field} 
                value={userName}
                onChangeText={text => setUserName(text)}
                placeholder={'insert username...'}
                />
                <Text style={styles.field}>password</Text>
                <TextInput style={styles.field}
                value={password}
                onChangeText={text => setPasword(text)}
                placeholder={'insert password...'}
                />
                <Button title="Login" onPress={login} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.StatusBarheight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 40
    },
    field: {
        fontSize: 20
    },
  });

