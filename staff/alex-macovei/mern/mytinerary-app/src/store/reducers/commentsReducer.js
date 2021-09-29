export default function commentsReducer(state = {}, action) {
    switch (action.type) {
      case "RETRIEVE_COMMENTS": {
        return {
          ...state,
          comments: action.payload,
        };
      }
      case "RETRIEVE_COMMENTS_ERROR": {
        return {
          ...state,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  }