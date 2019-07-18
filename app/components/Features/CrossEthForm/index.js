/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import FoToEthCrossForm from './FoToEthCrossForm';
import EthToFoCrossForm from './EthToFoCrossForm';

const CrossEthForm = props => (
  <Tool>
    <ToolSection lg={8}>
      <FoToEthCrossForm {...props} />
      <EthToFoCrossForm {...props} />
    </ToolSection>
    <ToolSection lg={4}>
      <ToolBody color="info" header="Tutorial">
        <p>Tutorial coming soon</p>
      </ToolBody>
    </ToolSection>
  </Tool>
);

export default CrossEthForm;
