import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function Astroid({navigation}) {
  const [AsteroidID, setAsteroidID] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (AsteroidID === 0) {
      Alert.alert('Enter Asteroid ID');
      return;
    }
    if (AsteroidID.toString().length < 7) {
      Alert.alert('Enter vaild Asteroid ID');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidID}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`,
        {method: 'GET'},
      );
      const responseData = await response.json();
      if (responseData) {
        navigation.navigate('AsteroidDetails', {AsteroidData: responseData});
      }
    } catch (err) {
      Alert.alert('Please Check Asteroid Id');
    } finally {
      setAsteroidID(0);
      setLoading(false);
    }
  };
  const handleRandomClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`,
        {method: 'GET'},
      );
      const response1 = await response.json();
      console.log(response1);
      const randomID: {id: string}[] = response1?.near_earth_objects.map(
        (item: any) => ({id: item.id}),
      );
      const ranid: number = Math.floor(Math.random() * randomID.length);
      const {id} = randomID[ranid];

      const respons2 = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`,
        {method: 'GET'},
      );
      const response2 = await respons2.json();
      if (response2) {
        navigation.navigate('AsteroidDetails', {AsteroidData: response2});
      }
    } catch (err) {
      Alert.alert('Error fetching random asteroid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (Loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={AsteroidID}
          onChangeText={setAsteroidID}
          placeholder="Enter Asteroid ID"
          inputMode="tel"
          maxLength={7}
        />
        <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRandomClick}>
            <Text style={styles.submitButtonText}>Random</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    width: 300,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btncontainer: {
    flexDirection: 'row',
    gap: 10,
    height: 50,
  },
});
