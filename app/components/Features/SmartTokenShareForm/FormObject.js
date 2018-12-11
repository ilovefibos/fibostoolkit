import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'fromquantity',
    label: 'From Quantity (in Tokens)',
    placeholder: 'How many Tokens to share',
  },
  {
    id: 'fromsymbol',
    label: 'From Symbol',
    placeholder: 'Symbol of the From Token',
  },
  {
    id: 'fromissuer',
    label: 'From Issuer',
    placeholder: 'Issuer of the From Token',
  },
  {
    id: 'tosymbol',
    label: 'To Symbol',
    placeholder: 'Symbol of the To Token',
  },
  {
    id: 'toissuer',
    label: 'To Issuer',
    placeholder: 'Issuer of the To Token',
  },
  {
    id: 'memo',
    label: 'Memo',
    placeholder: 'A memo to attach to share',
    md: 12,
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Share',
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
