import {FETCH_AUDIT_LIST,
        FETCH_RECORD_DETAIL
        } from '../actions/DefChangeAction';

export default function(state={},action){

  switch(action.type){

    case FETCH_AUDIT_LIST:
      return Object.assign({},{...state},{audit_list:action.payload.data});
    case FETCH_RECORD_DETAIL:
      return Object.assign({},{...state},{record_detail:action.payload.data});
    default:
      return state;
  }
}
