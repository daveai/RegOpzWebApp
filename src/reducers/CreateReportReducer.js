import {FETCH_REPORT_LIST,
        FETCH_COUNTRY_LIST
      } from '../actions/CreateReportAction';

  export default function(state={},action){

    switch(action.type){
      case FETCH_REPORT_LIST:
        return Object.assign({},state,{report_list:action.payload.data});

      case FETCH_COUNTRY_LIST:
        return Object.assign({},state,{country_list:action.payload.data});

      default:
        return state
    }


  }
