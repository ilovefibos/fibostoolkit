/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import NormalTokenCreate from './NormalTokenCreateForm';
import SmartTokenCreate from './SmartTokenCreateForm';

const TokenCreateForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <NormalTokenCreate {...props} />
        <SmartTokenCreate {...props} />
      </ToolSection>
      <ToolSection lg={4}>
        <ToolBody color="info" header="Information">
          <p>Tutorial coming soon</p>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default TokenCreateForm;
