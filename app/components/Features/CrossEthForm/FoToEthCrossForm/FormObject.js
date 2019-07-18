import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'owner',
    label: 'Sender',
    placeholder: 'Account that sends the FOUSDT',
  },
  {
    id: 'quantity',
    label: 'Quantity (including 0.51 FOUSDT fee)',
    placeholder: 'How many FOUSDT to cross transfer to ETH',
  },
  {
    id: 'ethAddress',
    label: 'Eth Address',
    placeholder: 'The Eth Address to cross transfer to',
    md: 12,
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Cross Transfer',
  };
  return (
    <ToolForm {...formProps}>
      {FormData.map(form => (
        <ToolInput key={form.id} {...form} {...props} />
      ))}
    </ToolForm>
  );
};

export default FormObject;
