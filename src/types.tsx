// types.tsx

export type ClusterStatusMapping = Record<string, string>;

export const UPDATE_CLUSTER_STATUS = 'UPDATE_CLUSTER_STATUS';

interface UpdateClusterStatusAction {
  type: typeof UPDATE_CLUSTER_STATUS;
  payload: ClusterStatusMapping;
}

export type ClusterStatusAction = UpdateClusterStatusAction;
