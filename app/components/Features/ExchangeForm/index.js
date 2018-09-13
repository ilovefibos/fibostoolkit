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
          <div>
            <h5>Exchange Rate</h5>
            <h3>1 EOS = {props.rate.rate} FO</h3>
          </div>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default ExchangeForm;
