import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'owner',
    label: 'Sender',
    placeholder: 'Account that withdrawl the EOS(FIBOS) from',
  },
  {
    id: 'quantity',
    label: 'Quantity (in EOS(FIBOS))',
    placeholder: 'How many EOS to withdrawl to EOS mainnet',
  },
  {
    id: 'memo',
    label: 'EOS mainnet account',
    placeholder: 'EOS mainnet account you want to withdrawl to',
    md: 12,
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Withdrawl',
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
