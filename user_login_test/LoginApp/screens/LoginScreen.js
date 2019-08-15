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
  KeyboardAvoidingView,
} from 'react-native';
import { WebBrowser } from 'expo';
import Logo from '../components/Logo';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  signup() {
		Actions.signup()
	};

// Create constructor() in your project and make 3 state named as FullName, UserEmail and UserPassword inside it.
  constructor() {
    
    super()

    // we're declaring the states in the UserLoginFunction function below, so no need to declare them before that
    this.state = {
      FullName: '~',
      UserEmail: '~',
      UserPassword: '~'
    }
  }
  

  // After inserting the data successfully it will print the response message coming form PHP file in Alert.
  UserLoginFunction = () =>{

    var { UserEmail, UserPassword } = this.state;

    if(UserEmail == ''){
      UserEmail = '~'
    }

    if(UserPassword == ''){
      UserPassword = '~'
    }

    // use the fetch() API to insert data into MySQL database
    // URL with the local IP address with the location of PHP file through XAMPP
    fetch('http://localhost:3003/user/'+UserEmail+'&'+UserPassword, {
      // method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
    
      //   name: this.state.FullName,
    
      //   email: this.state.UserEmail,
    
      //   password: this.state.UserPassword
    
      // })
    
    }).then((response) => {
      return response.json();

    }).then((responseJson) => {
      console.log(responseJson);

// Showing response message coming from server after inserting records.
      if (responseJson == false) {
        Alert.alert("Wrong credentials!");
        
        // if (responseJson == true)
      } else{
        this.setState({ FullName : responseJson[0].returnedFullName})
        // console.log(this.state);
        Alert.alert("Full Name: " + this.state.FullName, "Email: " + this.state.UserEmail);
        this.props.navigation.navigate('SettingsStack')
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  // Create 3 TextInput component and 1 Button component inside the render’s return block, Each TextInput will get a value from user and stores in State. We would call the UserLoginFunction() on button onPress event.
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" keyboardVerticalOffset={70}>

            <Logo/>

            <Text style= {styles.title}>User Login Form</Text>
     
            <TextInput
              placeholder="Enter User Email"
              onChangeText={email => this.setState({UserEmail : email})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              returnKeyType='next'
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="email-address"
              />
     
            <TextInput
              placeholder="Enter User Password"
              onChangeText={password => this.setState({UserPassword : password})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              secureTextEntry={true}
              returnKeyType='go'
              ref={(input) => this.passwordInput = input}
              />
     
            <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
            <TouchableOpacity onPress={() => navigate('ForgotPasswordStack')} style={styles.touchableText}><Text style={styles.alternativeButton}>Forgot Password</Text></TouchableOpacity>


            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Don't have an account yet?</Text>
              <TouchableOpacity onPress={() => navigate('RegisterStack')}><Text style={styles.alternativeButton}> Signup</Text></TouchableOpacity>
            </View>
                     
          </KeyboardAvoidingView>

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
    fontSize:16,
    justifyContent :'center',
  },
  touchableText: {
    justifyContent :'center',
    flexDirection:'row',
    marginTop: 10
  },
  alternativeButton: {
  	color:'#009688',
  	fontSize:16,
  	fontWeight:'500'
  }
});