import React from 'react';
import {
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
import User from '../user';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  signup() {
		Actions.signup()
	};

// Create constructor() in your project and make 3 state named as FullName, UserName and UserPassword inside it.
  constructor() {
    
    super()

    // we're declaring the states in the UserLoginFunction function below, so no need to declare them before that
    this.state = {
      UserName: '~',
      FullName: '~',
      LicenseNumber: '~',
      UserPassword: '~',
    }
  }
  

  // After inserting the data successfully it will print the response message coming form PHP file in Alert.
  UserLoginFunction = () =>{

    var { UserName, UserPassword } = this.state;

    if(UserName == ''){
      UserName = '~'
    }

    if(UserPassword == ''){
      UserPassword = '~'
    }

    // use the fetch() API to insert data into MySQL database
    // URL with the local IP address with the location of PHP file through XAMPP
    fetch('http://localhost:3003/user/'+UserName+'&'+UserPassword, {
      // method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
    
      //   name: this.state.FullName,
    
      //   email: this.state.UserName,
    
      //   password: this.state.UserPassword

      //   license: this.state.Userlicense
    
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
        this.setState({ LicenseNumber : responseJson[0].returnedLicense})
        User.userName=this.state.UserName;
        console.log(User.userName);

        Alert.alert(User.userName);


        // console.log(this.state);
        //Alert.alert("Full Name: " + this.state.FullName, "UserName: " + this.state.UserName + "\nLicense Number: " + this.state.LicenseNumber);
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

            <Text style= {styles.title}>User Login</Text>
     
            <TextInput
              placeholder="Enter Username"
              onChangeText={username => this.setState({UserName : username})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              returnKeyType='next'
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="default"
              />
     
            <TextInput
              placeholder="Enter Password"
              onChangeText={password => this.setState({UserPassword : password})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              secureTextEntry={true}
              returnKeyType='go'
              ref={(input) => this.passwordInput = input}
              />
     
            <Button title="LOGIN" onPress={this.UserLoginFunction} color="#2196F3" />
            <TouchableOpacity onPress={() => navigate('ForgotPasswordStack')} style={styles.touchableText}><Text style={styles.alternativeButton}>Forgot Password</Text></TouchableOpacity>


            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Don't have an account yet?</Text>
              <TouchableOpacity onPress={() => navigate('RegisterStack')}><Text style={styles.alternativeButton}> Signup</Text></TouchableOpacity>
            </View>
                     
          </KeyboardAvoidingView>

      </View>
    );
  }

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
    borderRadius: 5,
    marginVertical: 3
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