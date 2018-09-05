/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import EosToFoForm from './EosToFoForm';
import FoToEosForm from './FoToEosForm';

const ExchangeForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <EosToFoForm {...props} />
        <FoToEosForm {...props} />
      </ToolSection>
      <ToolSection lg={4}>
        <ToolBody color="info" header="Information">
          <p>Tutorial coming soon</p>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default ExchangeForm;
