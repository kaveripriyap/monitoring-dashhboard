// clusterStatusActions.ts

import { ClusterStatusMapping } from './types'; // Import any relevant types

export const updateClusterStatus = (newStatusMapping: ClusterStatusMapping) => ({
  type: 'UPDATE_CLUSTER_STATUS' as const,
  payload: newStatusMapping,
});

// Assuming ClusterStatusMapping is defined in your 'types.ts' file
