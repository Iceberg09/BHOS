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
import Logo from '../components/Logo';

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'ForgotPassword',
  };

// Create constructor() in your project and make 3 state named as FullName, UserName and UserPassword inside it.
  constructor() {
    
    super()

    this.state = {
      UserName: '',
      FullName: '',
      LicenseNumber: '',
      UserPassword: '',
    }
    // console.log(this.state.FullName);
  }

  // buttonClickListener = () => {
  //   const { FullName } = this.state;
  //   Alert.alert(FullName);
  // }

  // After inserting the data successfully it will print the response message coming form PHP file in Alert.
  UserRecoveryFunction = () =>{

    var { UserName, LicenseNumber } = this.state;

    if(UserName == ''){
      UserName = '~'
    }

    if(LicenseNumber == ''){
      LicenseNumber = '~'
    }

    // use the fetch() API to insert data into MySQL database
    // URL with the local IP address with the location of PHP file through XAMPP
    fetch('http://localhost:3003/user/recover/'+UserName+'&'+LicenseNumber, {
      // method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
    
      //   name: this.state.FullName,
    
      //   username: this.state.UserName,
    
      //   password: this.state.UserPassword
    
      // })
    
    }).then((response) => {
      return response.json();

    }).then((responseJson) => {
      console.log(responseJson);

// Showing response message coming from server after inserting records.
      if (responseJson == '~') {
        Alert.alert("Please make sure to fill out all the fields!");
        // if (responseJson == true)
      }else if(responseJson == false){
        Alert.alert("There is no account with the inputted information!")
      
      }else{
        this.setState({ FullName : responseJson[0].returnedFullName, UserPassword : responseJson[0].returnedUserPassword})
        // console.log(this.state);
        Alert.alert(
            "User Found!",
            "Would you like to reset the password for " + this.state.FullName + "?",
            [
              {text: 'No, nevermind', onPress: () => console.log('No Pressed')},
              {
                text: 'Yes!',
                onPress: () => {
                  
                    console.log('Confirm Pressed')
                    Alert.alert("Your password has been reset to " + this.state.UserPassword)
                    this.props.navigation.navigate('LoginStack')
                }
              },
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'),  style: 'cancel'},
            ]
        );
        // this.props.navigation.navigate('SettingsStack')
      }

    }).catch((error) => {
      console.error(error);
    });

  }

  // Create 3 TextInput component and 1 Button component inside the render’s return block, Each TextInput will get a value from user and stores in State. We would call the UserRecoveryFunction() on button onPress event.
  render() {
    const {navigate} = this.props.navigation;
    return (
      
      <View style={styles.container}>
        
        <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" keyboardVerticalOffset={85}>

          <Logo/>

          <Text style= {styles.title}>Account Recovery</Text>
     
          <TextInput
            placeholder="Username"
            onChangeText={username => this.setState({UserName : username})}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            returnKeyType='next'
            onSubmitEditing={() => this.licenseInput.focus()}
            ref={(input) => this.usernameInput = input}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType="default"
          />

          <TextInput
            placeholder="Last 4 Digits of CDL"
            onChangeText={license => this.setState({LicenseNumber : license})}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            returnKeyType='next'
            onSubmitEditing={() => this.UserRecoveryFunction()}
            ref={(input) => this.licenseInput = input}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType="default"
          />
          
          <Button title="RECOVER" onPress={this.UserRecoveryFunction} color="#2196F3" />

          <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={() => navigate('LoginStack')}><Text style={styles.signupButton}> Back to the Login Screen</Text></TouchableOpacity>
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