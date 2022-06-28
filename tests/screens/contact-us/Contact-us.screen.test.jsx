import 'react-native';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import ContactUsScreen from '../../../src/screens/app/contact-screen/contact-us.screen';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('Screen - Contact Us', () => {
  test('renders Contact Us', () => {
    render(<ContactUsScreen />);

    expect(screen.getByText('011 928 1000')).toBeTruthy();
    expect(screen.getByText('apphelp@peermont.com')).toBeTruthy();
  });

  test('onPress trigger openUserPhoneApp', () => {
    jest.mock('react-native/Libraries/Linking/Linking', () => ({
      openURL: jest.fn(() => Promise.resolve('success')),
    }));

    render(<ContactUsScreen />);
    fireEvent.press(screen.getByText('011 928 1000'));
    expect(screen.getByText('011 928 1000')).toBeTruthy();
  });

  test('onPress trigger openEmailApp', () => {
    jest.mock('react-native/Libraries/Linking/Linking', () => ({
      openURL: jest.fn(() => Promise.resolve('success')),
    }));

    render(<ContactUsScreen />);
    fireEvent.press(screen.getByText('apphelp@peermont.com'));
    expect(screen.getByText('apphelp@peermont.com')).toBeTruthy();
  });
});
