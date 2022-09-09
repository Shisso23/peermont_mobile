import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import { FieldArray, Formik } from 'formik';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { custom } from '../../../../theme/theme.styles';
import { carDetailsFormApiModel, formDetailApiModel } from '../../../models';
import { PaddedContainer } from '../../containers';

const CarDetailsForm = ({ submitForm, initialValues }) => {
  const [fieldDetails, setfieldDetails] = useState([]);
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const setChecked = (index, fieldId, option) => {
    setCheckedIndex(index);
    _handleChange(fieldId, option);
  };

  const _handleSubmission = () => {
    const carDetails = formDetailApiModel({ fieldDetails });
    submitForm(carDetails);
  };

  const _handleChange = (fieldId, answers) => {
    const carDetail = carDetailsFormApiModel({ fieldId, answers });
    const fieldDetailsCopy = _.cloneDeep(fieldDetails);

    _.remove(fieldDetailsCopy, (item) => item?.fieldId === carDetail?.fieldId);
    fieldDetailsCopy.push(carDetail);
    const orderedFiledDetails = _.orderBy(fieldDetailsCopy, 'fieldId');
    setfieldDetails(orderedFiledDetails);
  };

  const inputField = (value, fieldId, label) => {
    return (
      <>
        <Input
          name="textField"
          style={custom.addPadding}
          value={value}
          onChangeText={(answers) => _handleChange(fieldId, answers)}
          keyboardType="email-address"
          blurOnSubmit
          label={label}
          autoCapitalize="none"
        />
      </>
    );
  };

  const multipleChoice = (values, fieldId, label) => {
    const options = values.split(',');
    return (
      <View style={custom.checkboxMargin}>
        <Text style={custom.checkboxLabel}>{label}</Text>
        {_.map(options, (option, index) => (
          <View key={index}>
            <CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={option}
              checked={checkedIndex === index}
              onPress={() => setChecked(index, fieldId, option)}
            />
          </View>
        ))}
      </View>
    );
  };

  const generateFormData = (item) => {
    if (item.field.isTextField) {
      return inputField(item.field, item.fieldId, item.field.label);
    }
    if (item.field.isOptionField && !item.field.isMultiple) {
      return multipleChoice(item.field.optionsList, item.fieldId, item.field.label);
    }
    return <Text>{item.fieldId}</Text>;
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
    >
      {({ values }) => {
        return (
          <PaddedContainer>
            <FieldArray
              name="fields"
              render={() => {
                const _array = _.map(values.fields, (item) => generateFormData(item));
                return _array;
              }}
            />
            <PaddedContainer style={custom.center}>
              <Button title="SUBMIT" type="solid" onPress={_handleSubmission} />
            </PaddedContainer>
          </PaddedContainer>
        );
      }}
    </Formik>
  );
};

CarDetailsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

CarDetailsForm.defaultProps = {};

export default CarDetailsForm;
