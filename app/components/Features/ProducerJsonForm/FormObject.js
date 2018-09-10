import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';


const FormData = [
  {
    id: 'json',
    label: 'Producer Json',
    placeholder: 'Write your producer json here',
    multiline: true,
    rows: 30,
    md: 12,
  },
  {
    id: 'owner',
    label: 'Owner',
    placeholder: 'Owner account of the producer node',
  },
];

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Set',
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
