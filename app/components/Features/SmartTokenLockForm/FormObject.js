import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'from',
    label: 'From',
    placeholder: 'Account that sends the Token',
  },
  {
    id: 'to',
    label: 'To',
    placeholder: 'Account that receives the Token',
  },
  {
    id: 'quantity',
    label: 'Quantity (in Tokens)',
    placeholder: 'How many Tokens to Lock',
  },
  {
    id: 'symbol',
    label: 'Symbol',
    placeholder: 'Symbol of the Token',
  },
  {
    id: 'issuer',
    label: 'Issuer',
    placeholder: 'Issuer of the Token',
  },
  {
    id: 'expiration',
    label: 'Expiration',
    placeholder: 'Lock expiration time in seconds for transferring out',
  },
  {
    id: 'expiration_to',
    label: 'Expiration To',
    placeholder: 'Lock expiration time in seconds for transferring in',
  },
  {
    id: 'memo',
    label: 'Memo',
    placeholder: 'A memo to attach to transfer',
    md: 12,
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Lock Transfer',
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
