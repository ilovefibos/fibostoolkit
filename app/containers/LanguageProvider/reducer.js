/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import * as storage from "../../utils/storage"; // eslint-disable-line

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../App/constants';

const initialState = fromJS({
  locale: storage.get('locale') || DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
