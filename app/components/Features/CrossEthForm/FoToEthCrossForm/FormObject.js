import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';
import ToolSelect from '../../../Tool/ToolSelect';

const FormData = [
  {
    id: 'owner',
    label: 'Sender',
    placeholder: 'Account that sends the FOUSDT',
    md: 4,
  },
  {
    id: 'quantity',
    label: 'Quantity',
    placeholder: 'How many FOUSDT to cross transfer to ETH',
    md: 4,
  },
  {
    id: 'ethAddress',
    label: 'Eth Address',
    placeholder: 'The Eth Address to cross transfer to',
    md: 12,
  },
];

export const tokenData = {
  id: 'symbol',
  placeholder: 'Token to cross transfer',
  md: 4,
  selections: [
    {
      label: 'FOETH',
      value: 'FOETH',
      precision: 8,
      hint: 'Miner Fee: 0.01-0.1 FOETH',
    },
    {
      label: 'FOUSDT',
      value: 'FOUSDT',
      precision: 6,
      hint: 'Miner Fee: 3-20 FOUSDT',
    },
    {
      label: 'FODAI',
      value: 'FODAI',
      precision: 6,
      hint: 'Miner Fee: 3-20 DAI',
    },
  ],
};

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Cross Transfer',
  };

  return (
    <ToolForm {...formProps}>
      <ToolInput key={FormData[0].id} {...FormData[0]} {...props} />
      <ToolInput key={FormData[1].id} {...FormData[1]} {...props} />
      <ToolSelect key={tokenData.id} {...tokenData} {...props} />
      <ToolInput key={FormData[2].id} {...FormData[2]} {...props} />
    </ToolForm>
  );
};

export default FormObject;
