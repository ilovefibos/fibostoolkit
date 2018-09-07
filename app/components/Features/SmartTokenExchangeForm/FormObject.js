import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'owner',
    label: 'Owner',
    placeholder: 'Account that receives the exchange token',
  },
  {
    id: 'fromSymbol',
    label: 'From Token Symbol',
    placeholder: 'Symbol of token you exchange from',
  },
  {
    id: 'fromSymbolIssuer',
    label: 'From Token Issuer',
    placeholder: 'Issuer of the token you exchange from',
  },
  {
    id: 'quantity',
    label: 'Quantity (of From Token)',
    placeholder: 'How many token to exchange from',
  },
  {
    id: 'toSymbol',
    label: 'To Token Symbol',
    placeholder: 'Symbol of the token you exchange to',
  },
  {
    id: 'toSymbolIssuer',
    label: 'To Token Issuer',
    placeholder: 'Issuer of the token you exchange to',
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Exchange',
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
