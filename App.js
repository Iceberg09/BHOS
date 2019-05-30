import React, { Component } from 'react';
import { AppRegistry, View, Dimensions, SafeAreaView, TextInput, Button, Alert, Text } from 'react-native';
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

class HomeScreen extends Component {

  render() {

    return (

      <SafeAreaView>

      <View>

        <Text>You are now logged in!</Text>

      </View>

      </SafeAreaView>

    )

  }
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(AppNavigator);


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => createAppContainer);