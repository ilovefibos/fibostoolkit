import { createSelector } from 'reselect';

/**
 * Direct selector to the notification state domain
 */
const selectNotification = state => state.get('notification');

/**
 * Other specific selectors
 */

const makeSelectNotificationSuccess = () => createSelector(selectNotification, substate => substate.get('success'));

const makeSelectNotificationFailure = () => createSelector(selectNotification, substate => substate.get('failure'));

const makeSelectNotificationLoading = () => createSelector(selectNotification, substate => substate.get('loading'));

const makeSelectNotificationInfo = () => createSelector(selectNotification, substate => substate.get('info'));
/**
 * Default selector used by Notification
 */

const makeSelectNotificationMessage = () => createSelector(selectNotification, substate => substate.get('message'));

export default makeSelectNotificationMessage;
export {
  selectNotification,
  makeSelectNotificationMessage,
  makeSelectNotificationSuccess,
  makeSelectNotificationInfo,
  makeSelectNotificationFailure,
  makeSelectNotificationLoading,
};
