import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: 'symbol',
    label: 'Symbol',
    placeholder: 'Symbol of the Token',
  },
  {
    id: 'precision',
    label: 'Token Precision',
    placeholder: 'Precision of the Token',
  },
  {
    id: 'issuer',
    label: 'Issuer',
    placeholder: 'Issuer of the Token',
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Destroy',
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
