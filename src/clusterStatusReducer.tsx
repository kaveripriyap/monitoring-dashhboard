// clusterStatusReducer.ts

import { ClusterStatusAction, ClusterStatusMapping } from './types'; // Import any relevant types

const initialState: ClusterStatusMapping = {};

const clusterStatusReducer = (state: ClusterStatusMapping = initialState, action: ClusterStatusAction): ClusterStatusMapping => {
  switch (action.type) {
    case 'UPDATE_CLUSTER_STATUS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default clusterStatusReducer;
