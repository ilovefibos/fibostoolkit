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
    label: 'Quantity',
    placeholder: 'How many FOUSDT to cross transfer to ETH',
  },
  {
    id: 'ethAddress',
    label: 'Eth Address',
    placeholder: 'The Eth Address to cross transfer to',
    md: 12,
  },
];

const switchData = {
  id: 'central',
  label: 'Central Cross Chain',
  placeholder:
    'Central Cross Chain Off: Fee is 3 FOUSDT. ' +
    'Central Cross Chain On: Rely on central gateway. Fee is 0.51 FOUSDT.',
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
      {FormData.map(form => (
        <ToolInput key={form.id} {...form} {...props} />
      ))}
      <ToolSwitch {...switchData} {...props} />
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <InputLabel>
          {props.values.central ? 'FEE: 0.51 FOUSDT' : 'FEE: 3 FOUSDT'}
        </InputLabel>
      </GridItem>
    </ToolForm>
  );
};

export default FormObject;
