import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';

import colors from '../../../../theme/theme.colors';
import { casinoSelectSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { custom } from '../../../../theme/theme.styles';
import { dropDownCasinoList } from '../../../helpers/casino-dropdown-helper';

const { width: screenWidth } = Dimensions.get('window');

const PredictionsForm = ({ submitForm, initialValues }) => {
  const casinos = dropDownCasinoList;

  const validationSchema = Yup.object().shape({
    casino: casinoSelectSchema,
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
      {({ handleSubmit, values, errors, touched, status, setFieldValue }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <View style={[custom.row, custom.predictionsFilterView]}>
              <ModalDropdown
                options={casinos}
                style={[styles.casinoSelector, custom.predictionsModal]}
                textStyle={custom.casinoSelectorText}
                dropdownStyle={styles.casinoSelectorDropdown}
                dropdownTextStyle={custom.casinoSelectorDropdownOptions}
                defaultValue="Please select a casino"
                onSelect={(index) => setFieldValue('casino', index)}
                value={values.casino}
              />
              <Button
                containerStyle={custom.predictionsFilterButtonContainer}
                buttonStyle={custom.predictionsFilterButton}
                titleStyle={custom.predictionsButtonTitle}
                title="Filter"
                onPress={handleSubmit}
              />
            </View>
            {error('casino') ? (
              <Text style={[custom.errorStyle, styles.errorStyle]}>{error('casino')}</Text>
            ) : null}
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
    width: screenWidth * 0.45,
  },
  casinoSelectorDropdown: {
    borderRadius: 12,
    borderWidth: 5,
    height: 120,
    marginLeft: -10,
    marginTop: 20,
    width: screenWidth * 0.45,
  },
  errorStyle: {
    alignSelf: 'center',
  },
});

PredictionsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

PredictionsForm.defaultProps = {};

export default PredictionsForm;
