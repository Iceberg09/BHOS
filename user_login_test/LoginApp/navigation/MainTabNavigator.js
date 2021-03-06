import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangeDutyStatusScreen from '../screens/ChangeDutyStatusScreen';
import HOSScreen from '../screens/HOSScreen';

// Create a stack navigator with the "RegisterScreen.js file and call it RegisterStack"
const RegisterStack = createStackNavigator({
  Register: RegisterScreen,
});

// Create the visual tab that calls RegisterStack through a tab bar icon (tab button)
RegisterStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const ForgotPasswordStack = createStackNavigator({
  ForgotPassword: ForgotPasswordScreen,
});

ForgotPasswordStack.navigationOptions = {
  tabBarLabel: 'Forgot Password',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ChangeDutyStatusStack = createStackNavigator({
  ChangeDutyStatus: ChangeDutyStatusScreen,
});

ChangeDutyStatusStack.navigationOptions = {
  tabBarLabel: 'Change Duty Status',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const HOSStack = createStackNavigator({
  HOS: HOSScreen,
});

HOSStack.navigationOptions = {
  tabBarLabel: 'HOS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  RegisterStack,
  LoginStack,
  SettingsStack,
  ForgotPasswordStack,
  ChangeDutyStatusStack,
  HOSStack,
});
