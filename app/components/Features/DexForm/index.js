/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolBody from 'components/Tool/ToolBody';

import Payment from '@material-ui/icons/Payment';

const DexForm = props => (
  <Tool>
    <ToolBody
      color="warning"
      icon={Payment}
      header="Go To Official Dex"
      subheader=""
    >
      <a href="https://dex.fo/exchange" target="new">
        Click Here To Go To Official Dex.
      </a>
    </ToolBody>
  </Tool>
);

export default DexForm;
