import { ActionTypes } from 'const';
import { UserAction } from 'actions';

const initialState = {
  name: '',
  win_count: 0,
//   lost_count: 0,
//   game: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER: {
        console.log('tam_ ', action);

      return Object.assign({}, state, {
        // If the name is not specified, do not change it
        // The places that will change the name is login
        // In that cases, the `win_count`, `lost_count`, `game` will be reset
        // name: typeof action.name === "undefined" ? state.name : action.name,
        // win_count: action.win_count || initialState.win_count,
        // lost_count: action.lost_count || initialState.lost_count,
        // game: action.game || initialState.game,    
      });
    }

    case ActionTypes.LOGIN:{
      console.log("tam_ ActionTypes.LOGIN", state);

      UserAction.demo("hoang");

      return Object.assign({}, state, {
        win_count: 5,
      });
    }
    default:
      return state;
  }
}
