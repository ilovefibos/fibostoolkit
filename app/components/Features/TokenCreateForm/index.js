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
          <a
            href="https://dev.fo/zh-cn/guide/token-card.html#%E5%8F%91%E8%A1%8C%E9%80%9A%E8%AF%81"
            target="new"
          >
            Dev.fo Documentation
          </a>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default TokenCreateForm;
