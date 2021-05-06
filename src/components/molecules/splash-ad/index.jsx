import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Linking } from 'react-native';
import { Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import Modal from '../../atoms/modal';
import { advertSelector } from '../../../reducers/advert-reducer/advert.reducer';
import colors from '../../../../theme/theme.colors';

const { width: screenWidth } = Dimensions.get('window');

const SplashAdvert = () => {
  const [hasSplashAdvert, setHasSplashAdvert] = useState(false);
  const { splashAdvert } = useSelector(advertSelector);

  const _checkIfSplashAdIsAvailable = () => {
    const hasImage = !_.isUndefined(_.get(splashAdvert, 'image'));
    setHasSplashAdvert(hasImage);
  };

  const _toggleSplash = () => setHasSplashAdvert(!hasSplashAdvert);

  const Loader = () => (
    <View style={styles.loadingStyle}>
      <ActivityIndicator color={colors.gold} size={40} />
    </View>
  );

  useEffect(() => {
    _checkIfSplashAdIsAvailable();
  }, [splashAdvert]);

  return (
    <Modal
      hasCloseButton
      closeButtonColor={colors.gold}
      closeButtonSize={22}
      setModalVisible={_toggleSplash}
      visible={hasSplashAdvert}
      transparent
      backgroundFade
      backgroundFadeColor={colors.white}
    >
      <Image
        source={{
          uri: splashAdvert.image,
        }}
        style={styles.imageStyle}
        resizeMode="stretch"
        PlaceholderContent={<Loader />}
        onPress={() => Linking.openURL(splashAdvert.advertLink).then(setHasSplashAdvert(false))}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    aspectRatio: 1,
    flex: 1,
    maxWidth: screenWidth,
  },
  loadingStyle: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    width: screenWidth,
  },
});

SplashAdvert.propTypes = {};
SplashAdvert.defaultProps = {};

export default SplashAdvert;
