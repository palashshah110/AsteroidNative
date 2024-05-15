import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

interface AsteroidDetailsProps {
  navigation: any;
  route: {
    params: {
      AsteroidData: {
        name: string;
        designation: string;
        id: number;
        estimated_diameter: {
          kilometers?: {
            estimated_diameter_max: number;
          };
          meters?: {
            estimated_diameter_max: number;
          };
          miles?: {
            estimated_diameter_max: number;
          };
        };
      };
    };
  };
}

const AsteroidDetails: React.FC<AsteroidDetailsProps> = ({
  navigation,
  route,
}) => {
  const {AsteroidData} = route.params;

  return (
    <>
      <ImageBackground
        source={{
          uri: 'https://w0.peakpx.com/wallpaper/107/636/HD-wallpaper-asteroid-espace-space.jpg',
        }}
        resizeMode="cover"
        style={styles.backgroundImg}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          testID="goBackTest">
          <Text style={styles.Goback}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.text}>Name: {AsteroidData?.name}</Text>
                <Text style={styles.text}>
                  Designation: {AsteroidData?.designation}
                </Text>
                <Text style={styles.text}>Id: {AsteroidData?.id}</Text>
                <Text style={styles.text}>
                  Kilometer:
                  {
                    AsteroidData?.estimated_diameter?.kilometers
                      ?.estimated_diameter_max
                  }
                </Text>
                <Text style={styles.text}>
                  Meter:
                  {
                    AsteroidData?.estimated_diameter?.meters
                      ?.estimated_diameter_max
                  }
                </Text>
                <Text style={styles.text}>
                  Miles:
                  {
                    AsteroidData?.estimated_diameter?.miles
                      ?.estimated_diameter_max
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {flex: 1, width: '100%', display: 'flex'},
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
});

export default AsteroidDetails;
