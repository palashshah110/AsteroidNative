import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function AstroidDetails({navigation, route}) {
  const AsteroidData = route.params.AsteroidData;
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.Goback}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.text}>Name: {AsteroidData.name}</Text>
              <Text style={styles.text}>
                Designation: {AsteroidData.designation}
              </Text>
              <Text style={styles.text}>Id: {AsteroidData.id}</Text>
              <Text style={styles.text}>
                Kilometer:{' '}
                {
                  AsteroidData.estimated_diameter.kilometers
                    .estimated_diameter_max
                }
              </Text>
              <Text style={styles.text}>
                Meter:{' '}
                {AsteroidData.estimated_diameter.meters.estimated_diameter_max}
              </Text>
              <Text style={styles.text}>
                Miles:{' '}
                {AsteroidData.estimated_diameter.miles.estimated_diameter_max}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    marginVertical: 10,
  },
  text: {
    marginBottom: 10,
    color: '#000',
  },
  Goback: {
    color: '#000',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
});
