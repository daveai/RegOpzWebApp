import {FETCH_CAPTURED_REPORT} from '../actions/CaptureReportAction';
export default function(state=[],action){
  console.log("Action received in captured report reducer: ",action);
  switch(action.type){
    case FETCH_CAPTURED_REPORT:
      state=[];
      return state.concat(action.payload.data)
    default:
      return state

  }
}
