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

  export default class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'HOS',
    };
  
    // Create constructor() in your project and make 3 state named as FullName, UserEmail and UserPassword inside it.
  constructor() {
    
    super()

    this.state = {
      CurrentStatus: '',
      DriverID: '',
      TimeRemaining: '',
    }
}

render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" keyboardVerticalOffset={70}>

            

            <Text style= {styles.title}>Current Status:</Text>

            <Text style= {styles.title}>DriverID:</Text>

            <Text style= {styles.title}>Time Remaining:</Text>   
               
           
     
            <Button title="Click Here To Change Status" onPress={this.UserLoginFunction} color="#2196F3" />
            

                                 
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
      textAlign: 'left', 
      marginBottom: 75
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