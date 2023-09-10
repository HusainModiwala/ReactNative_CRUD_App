import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import User from '../interfaces/User';

const SearchUser = () => {
  const [data, setData] = useState<User[]>([]);

  const url = 'http://10.0.2.2:3000/users';

  const searchUser = async (input: string) => {
    if (!input) {
      setData([]);
      return;
    }

    let result = await fetch(`${url}?q=${input}`);
    let userResult: User[] = await result.json();
    setData(userResult);
  };
  return (
    <View>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        onChangeText={text => searchUser(text)}
      />
      <View style={[styles.container, styles.headingContainer]}>
        <View style={{flex: 1}}>
          <Text style={[styles.text, styles.headingText]}>Name</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[styles.text, styles.headingText]}>Age</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={[styles.text, styles.headingText]}>Email</Text>
        </View>
      </View>
      {data.length
        ? data.map((user: User) => (
            <View key={user.id} style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{user.name}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{user.age}</Text>
              </View>
              <View style={{flex: 1.8}}>
                <Text style={styles.text}>{user.email}</Text>
              </View>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'lightblue',
    margin: 10,
    fontSize: 18,
  },
  heading: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
  headingContainer: {
    backgroundColor: 'black',
    padding: 18,
  },
  headingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SearchUser;
