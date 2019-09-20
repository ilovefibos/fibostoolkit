
import React from 'react';

import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import messages from './messages';
import Button from '../../CustomButtons/Button';

const ContributeTo = props => {
  const {
    className,
    intl,
  } = props;

  return (
    <Button color="success" target="_blank" href="https://github.com/ilovefibos/fibostoolkit" style={{ marginTop: '-3px' , marginLeft: '-10px'}}>
      {props.intl.formatMessage(messages.contributeTo)}
    </Button>
  );
};

export default compose(
  injectIntl,
)(ContributeTo);
