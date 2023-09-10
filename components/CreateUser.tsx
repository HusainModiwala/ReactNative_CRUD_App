import {View, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import React, {useRef, useState} from 'react';

const CreateUser = (props : any) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<String | Number>();
  const [email, setEmail] = useState('');
  const nameInput = useRef<TextInput | null>(null);

  const url = 'http://10.0.2.2:3000/users';
  const createUser = async () => {
    const data = {name, age, email}
    let response = await fetch(url, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    response = await response.json();
    props.route.params.getData();
    setName('');
    setAge('');
    setEmail('');
    nameInput!.current.focus();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="name"
            value={name}
            onChangeText={text => setName(text)}
            ref={nameInput}
          />
          <TextInput
            keyboardType='numeric'
            style={styles.input}
            placeholder="age"
            value={age?.toString()}
            onChangeText={text => setAge(Number(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Button title="Create" onPress={createUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    margin: 10,
    padding: 18,
    borderWidth: 0.8,
    borderRadius: 5,
    height: 350,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 20,
    fontSize: 15,
  },
});

export default CreateUser;
