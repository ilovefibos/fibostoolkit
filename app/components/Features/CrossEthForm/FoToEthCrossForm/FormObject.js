import React from 'react';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';
import TableCell from '@material-ui/core/TableCell';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import ToolSwitch from '../../../Tool/ToolSwitch';
import GridItem from '../../../Grid/GridItem';
import messages from '../../../Summary/messages';
import CardText from '../../../Card/CardText';

const FormData = [
  {
    id: 'owner',
    label: 'Sender',
    placeholder: 'Account that sends the FOUSDT',
  },
  {
    id: 'quantity',
    label: 'Quantity (including 3 FOUSDT fee)',
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
