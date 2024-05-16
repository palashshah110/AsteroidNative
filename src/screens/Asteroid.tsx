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
  ImageBackground,
} from 'react-native';

export default function Asteroid({navigation}) {
  const [AsteroidID, setAsteroidID] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const handleChange = (Id: any) => {
    if (/^[0-9]*$/.test(Id)) {
      setAsteroidID(Id);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidID}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`,
        {method: 'GET'},
      );
      if (response.ok) {
        navigation.navigate('AsteroidDetails', {
          AsteroidData: await response.json(),
        });
      } else {
        Alert.alert('Invalid Asteroid ID');
      }
    } catch (err) {
      Alert.alert('Invalid Asteroid ID');
    } finally {
      setLoading(false);
      setAsteroidID(0);
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

      const randomID: {id: string}[] = response1?.near_earth_objects.map(
        (item: any) => ({id: item.id}),
      );
      const ranid: number = Math.floor(Math.random() * randomID.length);
      const {id} = randomID[ranid];

      const response2 = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`,
        {method: 'GET'},
      );
      if (response2.ok) {
        navigation.navigate('AsteroidDetails', {
          AsteroidData: await response2.json(),
        });
      }
    } catch (err) {
      Alert.alert('Error fetching random asteroid. Please try again.');
    } finally {
      setLoading(false);
      setAsteroidID(0);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://w0.peakpx.com/wallpaper/107/636/HD-wallpaper-asteroid-espace-space.jpg',
      }}
      resizeMode="cover"
      style={{flex: 1, width: '100%', display: 'flex'}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            inputMode="tel"
            style={styles.input}
            value={AsteroidID}
            onChangeText={handleChange}
            placeholder="Enter Asteroid ID"
            maxLength={7}
          />
          <View style={styles.btncontainer}>
            <TouchableOpacity
              disabled={Loading || AsteroidID.toString().length < 7}
              style={
                Loading || AsteroidID.toString().length < 7
                  ? styles.submitDisButton
                  : styles.submitButton
              }
              onPress={handleSubmit}
              testID="submitbtn">
              {Loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" testID="loading-indicator" />
                </View>
              ) : (
                <Text style={styles.submitButtonText}>Search</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRandomClick}
              testID="randombtn">
              <Text style={styles.submitButtonText}>Random</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    width: 250,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
  },
  submitDisButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    opacity: 0.2,
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
