export const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

export function jobReducer(state, action) {
  switch (action.type) {

    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload.map(j => ({ ...j, id: j._id })),
      };

    case 'ADD_JOB_SUCCESS':
    case 'EDIT_JOB_SUCCESS':
    case 'MOVE_JOB_SUCCESS': {
      const incoming = { ...action.payload, id: action.payload._id };
      const exists = state.jobs.some(j => j._id === incoming._id);
      return {
        ...state,
        jobs: exists
          ? state.jobs.map(j => j._id === incoming._id ? incoming : j)
          : [...state.jobs, incoming],
      };
    }

    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(j => j.id !== action.payload),
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}