import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import tableStyle from 'assets/jss/tableStyle';
import messages from './messages';

function ResourcesTable({ ...props }) {
  const { classes, account, intl } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {account ? (
          <TableBody>
            <TableRow className={`${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>FO</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.balances.find(b => b.account === 'eosio' && b.balance.indexOf('FO') !== -1)
                  ? account.balances.find(b => b.account === 'eosio' && b.balance.indexOf('FO') !== -1).balance
                  : intl.formatMessage(messages.none)}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>EOS</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.balances.find(b => b.account === 'eosio' && b.balance.indexOf('EOS') !== -1)
                  ? account.balances.find(b => b.account === 'eosio' && b.balance.indexOf('EOS') !== -1).balance
                  : intl.formatMessage(messages.none)}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.ram)}</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.ram_usage} bytes {intl.formatMessage(messages.used)} <br />
                {account.ram_quota} bytes {intl.formatMessage(messages.owned)}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.cpu)}</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.total_resources.cpu_weight}
                <br />({Number((account.cpu_limit.used / account.cpu_limit.max) * 100).toFixed(2)} %{' '}
                {intl.formatMessage(messages.used)})
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.net)}</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.total_resources.net_weight}
                <br />({Number((account.net_limit.used / account.net_limit.max) * 100).toFixed(2)} %{' '}
                {intl.formatMessage(messages.used)})
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.refunding)}</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account && account.refund_request ? (
                  <span>
                    CPU: {account.refund_request.cpu_amount}
                    <br />NET: {account.refund_request.net_amount}
                  </span>
                ) : (
                  <span>{intl.formatMessage(messages.none)}</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className={`${classes.tableStripedRow} ${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.smartTokens)}</h6>
              </TableCell>
              <TableCell className={classes.tableCell} colSpan={12}>
                <h6>
                  {account.balances
                    .filter(b => b.account !== 'eosio')
                    .map(bal => `${bal.balance}@${bal.account}`)
                    .join(', ')}
                </h6>
              </TableCell>
            </TableRow>
            <TableRow className={`${classes.tableStripedRow} ${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.contractWallet)}</h6>
              </TableCell>
              <TableCell className={classes.tableCell} colSpan={12}>
                <h6>
                  {account.contractWalletBalances
                    .map(bal => `${bal.balance}@${bal.account}`)
                    .join(', ')}
                </h6>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            <TableRow className={`${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>{intl.formatMessage(messages.loadAccount)}</h6>
              </TableCell>
            </TableRow>
            <TableRow className={`${classes.tableStripedRow} ${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <p>{intl.formatMessage(messages.selectOne)}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default withStyles(tableStyle)(ResourcesTable);
