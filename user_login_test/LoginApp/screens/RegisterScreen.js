import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Logo from '../components/Logo';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

// Create constructor() in your project and make 3 state named as FullName, UserEmail and UserPassword inside it.
  constructor() {
    
    super()

    this.state = {
      UserName: '',
      FullName: '',
      LicenseNumber: '',
      UserPassword: '',
      ConfirmPassword: ''
    }
  }

  // After inserting the data successfully it will print the response message coming form PHP file in Alert.
  UserRegistrationFunction = () =>{

    const { UserName, FullName, LicenseNumber, UserPassword } = this.state;

    // Alert.alert(FullName);

    // use the fetch() API to insert data into MySQL database
    // URL with the local IP address with the location of PHP file through XAMPP
    fetch('http://localhost:3003/user/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_username: UserName,
        user_fullname: FullName,
        user_license: LicenseNumber,
        user_password: UserPassword
    
      })
    
    }).then((response) => response.text())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
            console.log(responseJson)
    
          }).catch((error) => {
            console.error(error);
          });
  }

  _passwordConfirmation = () => {
    if (this.state.UserPassword !== this.state.ConfirmPassword){
      Alert.alert("Passwords don't match!")
    } else{
      this.UserRegistrationFunction()
    }
  }

  // Create 3 TextInput component and 1 Button component inside the render’s return block, Each TextInput will get a value from user and stores in State. We would call the UserRegistrationFunction() on button onPress event.
  render() {
    const {navigate} = this.props.navigation;
    return (
      
      <View style={styles.container}>
        
        <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" keyboardVerticalOffset={85}>

          <Logo/>

          <Text style= {styles.title}>User Registration</Text>
      
            <TextInput
              placeholder="Username"
              onChangeText={uName => this.setState({UserName : uName})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              returnKeyType='next'
              onSubmitEditing={() => this.nameInput.focus()}
              ref={(input) => this.usernameInput = input}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="default"
              maxLength={20}
            />

            <TextInput
              placeholder="Full Name"
              onChangeText={fName => this.setState({FullName : fName})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              returnKeyType='next'
              onSubmitEditing={() => this.licenseInput.focus()}
              ref={(input) => this.nameInput = input}
              autoCapitalize='words'
              autoCorrect={false}
              autoCompleteType="name"
              keyboardType="default"
            />

            <TextInput
              placeholder="License Number"
              onChangeText={licenseNum => this.setState({LicenseNumber : licenseNum})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              returnKeyType='next'
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={(input) => this.licenseInput = input}
              autoCorrect={false}
              keyboardType="default"
              keyboardType="name-phone-pad"
              autoCapitalize='characters'
              maxLength={14}
            />
      
            <TextInput
              placeholder="Password"
              onChangeText={password => this.setState({UserPassword : password})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              secureTextEntry={true}
              returnKeyType='next'
              onSubmitEditing={() => this.confirmpasswordInput.focus()}
              ref={(input) => this.passwordInput = input}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="default"
              selectTextOnFocus={true}
            />

            <TextInput
              placeholder="Confirm Password"
              onChangeText={confirmPassword => this.setState({ConfirmPassword : confirmPassword})}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              secureTextEntry={true}
              returnKeyType='go'
              ref={(input) => this.confirmpasswordInput = input}
              autoCapitalize='none'
              autoCorrect={false}
              eyboardType="default"
              selectTextOnFocus={true}
              onSubmitEditing={this._passwordConfirmation}
            />
          

          <Button title="REGISTER" onPress={this._passwordConfirmation} color="#2196F3" />

          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigate('LoginStack')}><Text style={styles.signupButton}> Login</Text></TouchableOpacity>
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
  	fontSize:16
  },
  signupButton: {
  	color:'#009688',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputsGroup : {
    justifyContent: 'center',
    flex:1,
    margin: 10,
    marginBottom: 50
  }
});
