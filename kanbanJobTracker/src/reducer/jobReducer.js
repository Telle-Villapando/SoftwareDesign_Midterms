import { v4 as uuidv4 } from "uuid";

export const initialState = {
  jobs: [],
};

export function jobReducer(state, action) {
  switch (action.type) {
    case "ADD_JOB":
      return {
        ...state,
        jobs: [
          ...state.jobs,
          {
            ...action.payload,
            id: uuidv4(),
            dateApplied: action.payload.dateApplied || new Date().toISOString().split("T")[0],
            status: action.payload.status || "applied",
          },
        ],
      };

    case "EDIT_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? { ...job, ...action.payload } : job
        ),
      };

    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };

    case "MOVE_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id
            ? { ...job, status: action.payload.status }
            : job
        ),
      };

    default:
      return state;
  }
}
