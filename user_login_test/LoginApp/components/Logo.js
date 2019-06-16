import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.welcomeContainer}>
                <Image
                    source={
                    __DEV__
                        ? require('../assets/images/robot-dev.png')
                        : require('../assets/images/robot-prod.png')
                    }
                    style={styles.welcomeImage}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
      },
      welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    }
});