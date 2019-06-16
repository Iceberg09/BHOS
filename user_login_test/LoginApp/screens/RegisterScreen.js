import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Logo from '../components/Logo';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

// Create constructor() in your project and make 3 state named as FullName, UserEmail and UserPassword inside it.
  constructor() {
    
    super()

    this.state = {
      FullName: 'meh name',
      UserEmail: 'meh email',
      UserPassword: 'meh password'
    }
    // console.log(this.state.FullName);
  }

  // After inserting the data successfully it will print the response message coming form PHP file in Alert.
  UserRegistrationFunction = () =>{

    // use the fetch() API to insert data into MySQL database
    // URL with the local IP address with the location of PHP file through XAMPP
    fetch('http://localhost:3003/user/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: 'hi mom!',
        user_email: 'this.state.UserEmail',
        user_password: 'this.state.UserPassword'
    
      })
    
    }).then((response) => response.text())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
  }

  // Create 3 TextInput component and 1 Button component inside the render’s return block, Each TextInput will get a value from user and stores in State. We would call the UserRegistrationFunction() on button onPress event.
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

          <View style={styles.MainContainer}>

            <Logo/>

            <Text style= {styles.title}>User Registration Form</Text>
      
            <TextInput
              placeholder="Enter Full Name"
              onChangeText={name => this.setState({FullName : name})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              />
     
            <TextInput
              placeholder="Enter User Email"
              onChangeText={email => this.setState({UserEmail : email})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              />
     
            <TextInput
              placeholder="Enter User Password"
              onChangeText={password => this.setState({UserPassword : password})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              secureTextEntry={true}
              />
     
            <Button title="Click Here To Register" onPress={this.UserRegistrationFunction} color="#2196F3" />

            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigate('LoginStack')}><Text style={styles.signupButton}> Login</Text></TouchableOpacity>
            </View>
          
          </View>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10
  },
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5 ,
  },
  title:{
    fontSize: 22, 
    color: "#009688", 
    textAlign: 'center', 
    marginBottom: 15
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'#009688',
  	fontSize:16
  },
  signupButton: {
  	color:'#009688',
  	fontSize:16,
  	fontWeight:'500'
  }
});
