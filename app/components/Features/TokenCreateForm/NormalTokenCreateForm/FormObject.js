import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'issuer',
    label: 'Issuer',
    placeholder: 'Issuer account name of theNormal Token ',
  },
  {
    id: 'symbol',
    label: 'Normal Token Symbol',
    placeholder: 'Symbol of the normal token ',
  },
  {
    id: 'maximum_supply',
    label: 'Maximum Supply',
    placeholder: 'Maximum Supply of the normal token',
  },
  {
    id: 'expiration',
    label: 'Lock Expiration Time',
    placeholder: 'Lock expiration time in seconds',
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Create',
  };
  return (
    <ToolForm {...formProps}>
      {FormData.map(form => {
        return <ToolInput key={form.id} {...form} {...props} />;
      })}
    </ToolForm>
  );
};

export default FormObject;
