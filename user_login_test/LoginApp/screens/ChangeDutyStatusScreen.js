import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import User from '../user';

export default class ChangeDutyStatusScreen extends Component {

    onDutyButtonPress() {
        alert(`${User.userName} is now on duty!`);
    };

    offDutyButtonPress() {
        alert("Your duty status is now set to off duty");
    };

    drivingButtonPress() {
        alert("Your duty status is now set to driving");
    };



    render() {
        return (

            <SafeAreaView>

                <Logo />

                <Text style={styles.title}>Duty Status Change Screen</Text>

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
    },
    title: {
        fontSize: 22,
        color: "#009688",
        textAlign: 'center',
        marginBottom: 15
    }
});