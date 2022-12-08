import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';
import { openUserPhoneApp, openEmailApp } from '../../../helpers';
import config from '../../../config';

const Contact = () => {
  return (
    <>
      <ListItem onPress={() => openUserPhoneApp(config.callCentreNumber)} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Call Centre</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={styles.alignRight}>
          <ListItem.Subtitle>011 928 1000</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openEmailApp(config.appHelpEmail)} bottomDivider>
        <ListItem.Subtitle>Email</ListItem.Subtitle>
        <ListItem.Content style={styles.alignRight}>
          <ListItem.Subtitle>apphelp@peermont.com</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>
            Black Card Members, please contact your host for assistance.
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const styles = StyleSheet.create({
  alignRight: {
    alignItems: 'flex-end',
  },
});

export default Contact;
