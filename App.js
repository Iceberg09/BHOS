import React, { Component } from 'react';
import { AppRegistry, View, Dimensions, SafeAreaView, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: 'Enter Username Here', password: 'Enter Password Here' }
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image width={(Dimensions.get('window').width) - 20} source={require('./assets/images/image.jpg')} />
        </View>

        <View style={{ padding: 10, flex: 1 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <Button
            onPress={() => this.props.navigation.navigate('Home')}
            title="Submit"
          />
        </View>
      </SafeAreaView>


    );

  }

};

class ChangeDutyStatusScreen extends Component {

  onDutyButtonPress() {
    alert("Your duty status is now set to on duty");
  };

  offDutyButtonPress() {
    alert("Your duty status is now set to off duty");
  };

  drivingButtonPress() {
    alert("Your duty status is now set to driving");
  };



  render() {
    return (

      <SafeAreaView style={{ backgroundColor: '#005a9c' }}>

        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', paddingTop: 60 }}>Duty Status Change Screen</Text>

        <View style={styles.container}>

          <TouchableOpacity onPress={this.onDutyButtonPress}>

            <View
              style={styles.button}
              backgroundColor='#089946'
            >

              <Text style={styles.buttonText}>On Duty</Text>

            </View>

          </TouchableOpacity>

          <TouchableOpacity onPress={this.offDutyButtonPress}>

            <View
              style={styles.button}
              backgroundColor='#CB1B01'
            >

              <Text style={styles.buttonText}>Off Duty</Text>

            </View>

          </TouchableOpacity>

          <TouchableOpacity onPress={this.drivingButtonPress}>

            <View
              style={styles.button}
              backgroundColor='#006AFF'
            >

              <Text style={styles.buttonText}>Driving</Text>

            </View>

          </TouchableOpacity>

        </View>

      </SafeAreaView>

    )
  }
}

class HomeScreen extends Component {

  render() {

    return (

      <SafeAreaView>

        <View>

          <Text>You are now logged in!</Text>

        </View>

        <View style={styles.buttonContainer}>

          <Button
            title='Change Duty Status'
            onPress={() => this.props.navigation.navigate('ChangeDutyStatus')}
          />

        </View>



      </SafeAreaView>

    )

  }
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    ChangeDutyStatus: ChangeDutyStatusScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    margin: 20
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  changeScreenButton: {
    justifyContent: 'center'
  }
});

export default createAppContainer(AppNavigator);


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => createAppContainer);