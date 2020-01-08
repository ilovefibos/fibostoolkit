import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';
import ToolDateTimePicker from '../../../Tool/ToolDateTimePicker';

const FormData = [
  {
    id: 'nissuer',
    label: 'Issuer',
    placeholder: 'Issuer account name of theNormal Token ',
  },
  {
    id: 'nsymbol',
    label: 'Normal Token Symbol',
    placeholder: 'Symbol of the normal token ',
  },
  {
    id: 'nprecision',
    label: 'Smart Token Precision',
    placeholder: 'Precision of the Smart Token ',
  },
  {
    id: 'nmaximum_supply',
    label: 'Maximum Supply',
    placeholder: 'Maximum Supply of the normal token',
  },
];

const pickerData = {
  id: 'nexpiration',
  label: 'Lock Expiration Time',
  placeholder: 'Lock expiration time in seconds',
};

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Create',
  };
  return (
    <ToolForm {...formProps}>
      {FormData.map(form => (
        <ToolInput key={form.id} {...form} {...props} />
      ))}
      <ToolDateTimePicker key={pickerData.id} {...pickerData} {...props} />
    </ToolForm>
  );
};

export default FormObject;
