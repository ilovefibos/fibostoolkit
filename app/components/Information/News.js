import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const News = () => (
  <div>
    <h3>Feel free to contribute !!!!</h3>
    <h4>
      The fibostoolkit is open source at{' '}
      <a href="https://github.com/ilovefibos/fibostoolkit" target="new">
        [ilovefibos/fibostoolkit]
      </a>
      , feel free to contribute.
    </h4>
  </div>
);

export default withStyles(withStyles)(News);
