import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../../../theme/theme.colors';

const Footer = () => {
  return (
    <View>
      <View style={styles.goldBar} />
      <View style={styles.blackBar}>
        <Text style={styles.blackBarText}>
          Peermont supports the national responsible gambling programme. Problem Gambling Toll-Free
          Help Line 0860 006 008. Players must be 18 years or older. Winners know when to stop.
        </Text>
        <Text style={[styles.blackBarText, styles.copyright]}>
          Copyright Peermont Global Proprietary Limited. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blackBar: {
    padding: 15,
    paddingBottom: 21,
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
  },
  blackBarText: {
    color: colors.white,
    fontFamily: 'OpenSans-Bold',
    fontSize: 11,
    lineHeight: 20,
    textAlign: 'center',
  },
  copyright: {
    marginTop: 12,
  },
  goldBar: {
    backgroundColor: colors.gold,
    height: 5,
    marginTop: 30,
  },
});

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
