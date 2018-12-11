import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';
import ToolSwitch from "../../Tool/ToolSwitch";

const FormData = [
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
    id: 'memo',
    label: 'Memo',
    placeholder: 'A memo to attach to retire',
    md: 12,
  },
];
const switchData = {
  id: 'position',
  label: 'Position',
  placeholder: 'Position status (Open for exchange or not)',
};

const FormObject = props => {
  const { handleSubmit } = props;
  const formProps = {
    handleSubmit,
    submitColor: 'rose',
    submitText: 'Set Position',
  };
  return (
    <ToolForm {...formProps}>
      {FormData.map(form => {
        return <ToolInput key={form.id} {...form} {...props} />;
      })}
      <ToolSwitch {...switchData} {...props} />
    </ToolForm>
  );
};

export default FormObject;
