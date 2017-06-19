import {
  FETCH_SOURCE_FEED_LIST,
  FETCH_SOURECE_FEED_COLUMNS_LIST,
  INSERT_MAINTAIN_SOURCE_DATA,
  UPDATE_MAINTAIN_SOURCE_DATA
} from '../actions/MaintainSourcesAction';
export default function(state=[],action){
  console.log("Action received in maintain report rules reducer: ",action);
  switch(action.type){
    case FETCH_SOURCE_FEED_LIST:
      return Object.assign({},state,{
        sources:action.payload.data
      })
    case FETCH_SOURECE_FEED_COLUMNS_LIST:
      return Object.assign({},state,{
        source_table_columns:action.payload.data
      })
    default:
    	return state;
  }
}
