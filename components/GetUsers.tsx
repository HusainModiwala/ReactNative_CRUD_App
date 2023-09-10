import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import User from '../interfaces/User';
import EditUser from './EditUser';

const GetUsers = (props: any) => {
  const [data, setData] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [modal, setModal] = useState(false);

  const url = 'http://10.0.2.2:3000/users';

  const getData = async () => {
    let result = await fetch(url);
    let userResult: User[] = await result.json();
    setData(userResult);
  };
  const updateUser = async (user: User) => {
    setUser(user);
    setModal(true);
  };
  const deleteUser = async (id: number) => {
    let result = await fetch(`${url}/${id}`, {
      method: 'delete',
    });
    result = await result.json();
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 12}}>
        <Text style={styles.heading}>Get User List</Text>
        {modal ? (
          <EditUser setModal={setModal} user={user} getData={getData} />
        ) : null}
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
          <View style={{flex: 1.6}}>
            <Text style={[styles.text, styles.headingText]}>Operations</Text>
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
                <Button
                  title="Update"
                  color="gold"
                  onPress={() => updateUser(user)}
                />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => deleteUser(user.id)}
                />
              </View>
            ))
          : null}
      </View>
      <View style={{flex: 1, margin: 40, padding: 7}}>
        <Button
          title="Create new User"
          onPress={() => props.navigation.navigate('Create User', {getData: getData})}
        />
        <Button
          title="Go to search"
          onPress={() => props.navigation.navigate('Search User')}
          color={'gold'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default GetUsers;
