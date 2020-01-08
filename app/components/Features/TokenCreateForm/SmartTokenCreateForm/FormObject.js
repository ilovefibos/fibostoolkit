import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'issuer',
    label: 'Issuer',
    placeholder: 'Issuer account name of the smart Token ',
  },
  {
    id: 'symbol',
    label: 'Smart Token Symbol',
    placeholder: 'Symbol of the Smart Token ',
  },
  {
    id: 'precision',
    label: 'Smart Token Precision',
    placeholder: 'Precision of the Smart Token ',
  },
  {
    id: 'maximum_supply',
    label: 'Maximum Supply',
    placeholder: 'Maximum Supply of the Smart Token',
  },
  {
    id: 'connector_weight',
    label: 'Connector Weight',
    placeholder: 'Connector Weight of the Smart Token',
  },
  {
    id: 'maximum_exchange',
    label: 'Maximum Exchange',
    placeholder: 'Maximum Exchange of the Smart Token',
  },
  {
    id: 'reserve_supply',
    label: 'Reserve Supply',
    placeholder: 'Reserve Supply of the Smart Token',
  },
  {
    id: 'exchange_symbol',
    label: 'Exchange Symbol',
    placeholder: 'Symbol of the token to exchange your Smart Token',
  },
  {
    id: 'connector_balance_issuer',
    label: 'Exchange Symbol Issuer',
    placeholder:
      'Issuer of the symbol of the token to exchange your Smart Token',
  },
  {
    id: 'reserve_connector_balance',
    label: 'Reserve Connector Balance',
    placeholder: 'Reserve Connector Balance of the Smart Token',
  },
  {
    id: 'expiration',
    label: 'Lock Expiration Time',
    placeholder: 'Lock expiration time in seconds',
  },
  {
    id: 'buy_fee',
    label: 'Buy Fee',
    placeholder: 'Smart token buy fee',
  },
  {
    id: 'sell_fee',
    label: 'Sell Fee',
    placeholder: 'Smart token sell fee',
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
      {FormData.map(form => (
        <ToolInput key={form.id} {...form} {...props} />
      ))}
    </ToolForm>
  );
};

export default FormObject;
