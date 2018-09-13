import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'components/CustomButtons/Button';

import tableStyle from 'assets/jss/tableStyle';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';

function NetworksTable({ ...props }) {
  const { classes, networks, active, selectNetwork, intl } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead className={classes.successRow}>
          <TableRow className={classes.tableRow}>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableName)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableNetwork)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableType)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableApi)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableHost)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableFailures)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tablePing)}
            </TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              {intl.formatMessage(messages.tableSelect)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {networks && networks.length > 0 ? (
            networks.map(network => {
              return network.endpoints.map(endpoint => {
                return (
                  <TableRow className={classes.tableRowHover} key={endpoint.name}>
                    <TableCell className={classes.tableCell}>{network.name}</TableCell>
                    <TableCell className={classes.tableCell}>{network.network.toUpperCase()}</TableCell>
                    <TableCell className={classes.tableCell}>{network.type.toUpperCase()}</TableCell>
                    <TableCell className={classes.tableCell}>{endpoint.name}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {endpoint.protocol}
                      {'://'}
                      {endpoint.url}:{endpoint.port}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{endpoint.failures}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {endpoint.ping === -1 ? intl.formatMessage(messages.unknown) : `${endpoint.ping} ms`}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {active && active.network === network && active.endpoint.name === endpoint.name ? (
                        intl.formatMessage(messages.currentNetwork)
                      ) : (
                        <Button onClick={() => selectNetwork(network, endpoint)} color="info">
                          {intl.formatMessage(messages.select)}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              });
            })
          ) : (
            <TableRow className={classes.tableRowHover}>
              <TableCell className={classes.tableCell} colSpan={6}>
                {intl.formatMessage(messages.loading)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default compose(
  withStyles(tableStyle),
  injectIntl
)(NetworksTable);
