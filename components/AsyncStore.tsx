import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStore = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const saveAsync = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('pass', pass);
  };
  const show = async () => {
    // console.warn(await AsyncStorage.getItem('name'));
    console.warn(await AsyncStorage.getItem('pass'));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>Async Store</Text>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="pass"
            onChangeText={text => setPass(text)}
          />
          <Button title="Save" onPress={saveAsync} />
          <Button title="Show" onPress={show} />
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
    padding: 20,
    borderWidth: 0.8,
    borderRadius: 5,
    height: 300,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});

export default AsyncStore;
