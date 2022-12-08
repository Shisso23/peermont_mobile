import React, { useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import colors from '../../../../theme/theme.colors';
import { JackpotListFilter } from '../..';
import { custom } from '../../../../theme/theme.styles';

const FilterHeader = () => {
  const [visible, setVisible] = useState(false);

  const _closeModal = () => {
    setVisible(false);
  };

  const showFilter = () => {
    setVisible(true);
  };

  const showJackpotModal = useMemo(() => {
    return visible ? <JackpotListFilter visible={visible} closeModal={_closeModal} /> : null;
  }, [visible]);

  return (
    <>
      <TouchableOpacity onPress={showFilter}>
        <Icon
          type="font-awesome-5"
          name="filter"
          size={20}
          color={colors.white}
          containerStyle={custom.iconContainerStyle}
        />
      </TouchableOpacity>
      {showJackpotModal}
    </>
  );
};

FilterHeader.propTypes = {};

FilterHeader.defaultProps = {};

export default FilterHeader;
