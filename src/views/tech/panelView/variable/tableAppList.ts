import { NodeObj } from '../variable/tableServerNodeList';

const getOverallStatus = (mcStatus: string, appdStatus: string, guiStatus: string) => {
    const statuses = [mcStatus, appdStatus, guiStatus];
    if (statuses.includes('Error')) {
      return 'Error';
    } else if (statuses.includes('Warning')) {
      return 'Warning';
    } else if (statuses.includes('Working')) {
	  return 'Working';
	} else {
      return 'Undefined';
    }
  };

const calculateDerivedStatuses = (nodes: NodeObj[], appList: AppObj[]): AppObj[] => {
	return appList.map((app) => {
		const mcNodes = nodes.filter((node) => node.type === 'MC' && node.aaCode === app.aaCode);
		const appdNodes = nodes.filter((node) => node.type === 'AppD' && node.aaCode === app.aaCode);

		const mcStatus = mcNodes.some((node) => node.status === 'Error')
		? 'Error'
		: mcNodes.some((node) => node.status === 'Warning')
		? 'Warning'
		: mcNodes.some((node) => node.status === 'Working')
		? 'Working'
		: 'Undefined';

		const appdStatus = appdNodes.some((node) => node.status === 'Error')
		? 'Error'
		: appdNodes.some((node) => node.status === 'Warning')
		? 'Warning'
		: appdNodes.some((node) => node.status === 'Working')
		? 'Working'
		: 'Undefined';

		const overallStatus = getOverallStatus(mcStatus, appdStatus, app.guiStatus);
		console.log(overallStatus);

		return { ...app, mcStatus, appdStatus, overallStatus };
	});
};

export const getAppListWithDerivedStatuses = (appList: AppObj[], nodes: NodeObj[]): AppObj[] => {
	return calculateDerivedStatuses(nodes, tableAppList);
};

type AppObj = {
	name: string;
	aaCode: string;
	overallStatus: string;
	mcStatus: string,
    appdStatus: string,
    guiStatus: string,
};

const tableAppList: AppObj[] = [
	{
		name: 'App 1',
		aaCode: 'AA1',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Working',
	},
	{
		name: 'App 2',
		aaCode: 'AA2',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: '',
	},
	{
		name: 'App 3',
		aaCode: 'AA3',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Error',
	},
	{
		name: 'App 4',
		aaCode: 'AA4',
		overallStatus: 'Undefined',
		mcStatus: 'Undefined',
        appdStatus: 'Undefined',
        guiStatus: 'Undefined',
	},
	{
		name: 'App 5',
		aaCode: 'AA5',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Working',
	},
	{
		name: 'App 6',
		aaCode: 'AA6',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Warning',
	},
	{
		name: 'App 7',
		aaCode: 'AA7',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Warning',
	},
	{
		name: 'App 8',
		aaCode: 'AA8',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Working',
	},
	{
		name: 'App 9',
		aaCode: 'AA9',
		overallStatus: '',
		mcStatus: '',
        appdStatus: '',
        guiStatus: 'Error',
	}
];

export default tableAppList;
