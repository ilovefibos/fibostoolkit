/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolBody from 'components/Tool/ToolBody';

import Payment from '@material-ui/icons/Payment';

const CrossForm = props => (
  <Tool>
    <ToolBody
      color="warning"
      icon={Payment}
      header="Go To Official Cross Chain Transfer"
      subheader=""
    >
      <a href="https://cross.fo/transfer" target="new">
        Click Here To Go To Official Support for Cross Chain Transfer.
      </a>
    </ToolBody>
  </Tool>
);

export default CrossForm;
