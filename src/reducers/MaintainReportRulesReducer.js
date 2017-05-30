import {
  FETCH_REPORT_TEMPLATE_LIST,
  FETCH_BUSINESS_RULES_BY_SOURCE_ID,
  FETCH_SOURCES,
  FETCH_TABLE_COLUMNS_LIST
} from '../actions/MaintainReportRuleAction';
export default function(state=[],action){
  console.log("Action received in maintain report rules reducer: ",action);
  switch(action.type){
    case FETCH_REPORT_TEMPLATE_LIST:
      state = [];
      return state.concat(action.payload.data)
    case FETCH_BUSINESS_RULES_BY_SOURCE_ID:
		return Object.assign({},state,{
			business_rules:action.payload.data
		})
	case FETCH_SOURCES:
		return Object.assign({},state,{
			sources:action.payload.data
		})
  case FETCH_TABLE_COLUMNS_LIST:
  return Object.assign({},state,{
    source_table_columns:action.payload.data
  })
    default:
    	return state;
  }
}
