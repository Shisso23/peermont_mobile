import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ScrollContainer } from '../../../components/containers';
import { contactUs } from '../../../assets';
import { openUserPhoneApp, openEmailApp } from '../../../helpers';
import config from '../../../config';
import { custom } from '../../../../theme/theme.styles';

const ContactUsScreen = () => {
  return (
    <ScrollContainer>
      <Text style={custom.centerTitleConactUs}>Contact Us</Text>

      <Image source={contactUs} style={custom.contactUsImage} />

      <Text style={custom.labelContactUs}>Call Centre</Text>
      <TouchableOpacity
        style={custom.buttonContactUs}
        onPress={() => openUserPhoneApp(config.callCentreNumber)}
      >
        <View style={custom.textContainerContactUs}>
          <Icon name="phone" size={25} color="black" style={custom.leftIconStyleContactUs} />
          <Text style={custom.textCallCentre}>011 928 1000</Text>
          <Icon
            name="arrow-forward"
            size={20}
            color="black"
            style={custom.rightIconStyleContactUs}
          />
        </View>
      </TouchableOpacity>

      <Text style={custom.labelContactUs}>Email</Text>
      <TouchableOpacity
        style={custom.buttonContactUs}
        onPress={() => openEmailApp(config.customerCareEmail)}
      >
        <View style={custom.textContainerContactUs}>
          <Icon name="email" size={25} color="black" style={custom.leftIconStyleContactUs} />
          <Text style={custom.textEmail}>customercare@peermont.com</Text>
          <Icon
            name="arrow-forward"
            size={20}
            color="black"
            style={custom.rightIconStyleContactUs}
          />
        </View>
      </TouchableOpacity>

      <Text style={custom.labelContactUs}>Black Card Members</Text>
      <View style={custom.buttonContactUs}>
        <Text style={custom.buttonTextContactUs}>Please contact your host for assistance</Text>
      </View>
    </ScrollContainer>
  );
};

export default ContactUsScreen;
