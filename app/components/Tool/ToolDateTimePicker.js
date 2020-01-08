import React from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateMomentUtils from '@date-io/moment';
import moment from 'moment';
import GridItem from '../Grid/GridItem';
import CustomInput from '../CustomInput/CustomInput';

const ToolDateTimePicker = props => {
  const {
    xs,
    sm,
    md,
    lg,
    id,
    label,
    placeholder,
    type,
    multiline,
    rows,
    ...formProps
  } = props;
  const {
    setFieldValue,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = formProps;
  let picker = null;

  const handlePicker = e => {
    picker.open(e);
  };
  const onChangeDateTimePicker = () => date => {
    setFieldValue(id, moment(date).format('X'));
  };
  return (
    <GridItem xs={xs || 12} sm={sm || 12} md={md || lg || 6} lg={lg || md || 6}>
      <MuiPickersUtilsProvider utils={DateMomentUtils}>
        <DateTimePicker
          disablePast
          format="dddd DD, MMMM YYYY - h:mm:ss"
          ampm={false}
          onChange={onChangeDateTimePicker(id, setFieldValue)}
          ref={node => {
            picker = node;
          }}
          TextFieldComponent={({ helperText, InputProps, ...props }) => (
            <CustomInput
              labelText={label || id || 'Input'}
              id={id}
              error={errors[id]}
              touched={touched[id]}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: type || 'text',
                placeholder: placeholder || 'Input',
                value: values[id],
                onChange: handleChange,
                onClick: handlePicker,
                onBlur: handleBlur,
                multiline: false || multiline,
                rows: rows || '0',
              }}
            />
          )}
        />
      </MuiPickersUtilsProvider>
    </GridItem>
  );
};

export default ToolDateTimePicker;
