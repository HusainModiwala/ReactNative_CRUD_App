import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import User from '../interfaces/User';

interface Props {
  user: User | undefined;

  setModal: (arg: boolean) => void;
  getData: () => void;
}

const EditUser = ({user, setModal, getData}: Props) => {
  const [name, setName] = useState<string>(user!.name);
  const [age, setAge] = useState<number>(user!.age);
  const [email, setEmail] = useState<string>(user!.email);
  const url = 'http://10.0.2.2:3000/users';

  const updateUser = async () => {
    const data = {name, age, email};
    let result = await fetch(`${url}/${user!.id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    result = await result.json();
    getData();
    setModal(false);
  };

  return (
    <SafeAreaView>
      <Modal animationType="slide">
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="name"
              value={name}
              style={styles.textInput}
              onChangeText={text => setName(text)}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="age"
              value={String(age)}
              style={styles.textInput}
              onChangeText={text => setAge(Number(text))}
            />
            <TextInput
              placeholder="email"
              value={email}
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
            />
            <Button title="Update" onPress={updateUser} />
            <Button title="Close" color="red" onPress={() => setModal(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  formContainer: {
    borderRadius: 7,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
    height: 370,
    width: 350,
    backgroundColor: 'lightblue',
    borderWidth: 2,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: 'grey',
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 15,
  },
});

export default EditUser;
