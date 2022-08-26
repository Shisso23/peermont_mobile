import React from 'react';
import { StyleSheet, Dimensions, View, Platform } from 'react-native';
import { SearchBar, Text, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import colors from '../../../../theme/theme.colors';
import { casinoSchema, machineSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { custom } from '../../../../theme/theme.styles';
import PaddedContainer from '../../containers/buttons-container/buttons.container';
import { dropDownCasinoList } from '../../../helpers/casino-dropdown-helper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const JackpotListForm = ({ submitForm, initialValues }) => {
  const casinos = dropDownCasinoList;

  const validationSchema = Yup.object().shape({
    machine: machineSchema,
    casino: casinoSchema,
  });

  const _handleSubmission = (formData) => {
    submitForm(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, errors, touched, status, setFieldValue }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <View style={styles.searchWidth}>
              <ModalDropdown
                options={casinos}
                style={[styles.searchWidth, styles.casinoSelector]}
                textStyle={custom.casinoSelectorText}
                dropdownStyle={styles.casinoSelectorDropdown}
                dropdownTextStyle={custom.casinoSelectorDropdownOptions}
                defaultValue="Please select a casino"
                onSelect={(index) => setFieldValue('casino', index)}
                value={values.casino}
              />
              {error('casino') ? (
                <Text style={[custom.errorStyle, styles.errorStyle]}>{error('casino')}</Text>
              ) : null}
              <SearchBar
                placeholder="Type machine number here..."
                onChangeText={handleChange('machine')}
                value={values.machine}
                round
                containerStyle={custom.searchContainer}
                inputStyle={custom.searchContainer}
                inputContainerStyle={custom.searchContainer}
                lightTheme
                clearIcon
              />
              {error('machine') ? (
                <Text style={[custom.errorStyle, styles.errorStyle]}> {error('machine')}</Text>
              ) : null}
              <View style={custom.rangeMargin}>
                <PaddedContainer>
                  <MultiSlider
                    values={values.range}
                    min={20000}
                    max={5000000}
                    step={10000}
                    enableLabel
                    snapped
                    onValuesChangeFinish={(array) => setFieldValue('range', array)}
                  />
                </PaddedContainer>
              </View>
              <View style={styles.submit}>
                <Button title="Filter" onPress={handleSubmit} />
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  casinoSelector: {
    alignSelf: 'center',
    backgroundColor: colors.grey,
    borderRadius: 12,
    marginTop: 5,
    opacity: 0.5,
    padding: 10,
    width: screenWidth * 0.7,
  },
  casinoSelectorDropdown: {
    backgroundColor: colors.lightGrey,
    borderRadius: 12,
    borderWidth: 5,
    ...Platform.select({
      ios: {
        height: screenHeight * 0.4,
      },
      android: {
        height: screenHeight * 0.55,
      },
    }),
    marginLeft: 0,
    marginTop: 20,
    width: screenWidth * 0.65,
  },
  errorStyle: {
    paddingLeft: 50,
  },
  submit: {
    alignSelf: 'center',
    width: screenWidth * 0.5,
  },
});

JackpotListForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

JackpotListForm.defaultProps = {};

export default JackpotListForm;
