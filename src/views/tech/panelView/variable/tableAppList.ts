type AppObj = {
	name: string;
	aaCode: string;
	status: string;
	mcStatus: string,
    appdStatus: string,
    guiStatus: string,
};

const tableAppList: AppObj[] = [
	{
		name: 'App 1',
		aaCode: 'AA1',
		status: 'Error',
		mcStatus: 'Green',
        appdStatus: 'Green',
        guiStatus: 'Green',
	},
	{
		name: 'App 2',
		aaCode: 'AA2',
		status: 'Error',
		mcStatus: 'Amber',
        appdStatus: 'Green',
        guiStatus: 'Amber',
	},
	{
		name: 'App 3',
		aaCode: 'AA3',
		status: 'Error',
		mcStatus: 'Green',
        appdStatus: 'Amber',
        guiStatus: 'Red',
	},
	{
		name: 'App 4',
		aaCode: 'AA4',
		status: 'Warning',
		mcStatus: 'Amber',
        appdStatus: 'Green',
        guiStatus: 'Amber',
	},
	{
		name: 'App 5',
		aaCode: 'AA5',
		status: 'Warning',
		mcStatus: 'Green',
        appdStatus: 'Green',
        guiStatus: 'Green',
	},
	{
		name: 'App 6',
		aaCode: 'AA6',
		status: 'Warning',
		mcStatus: 'Amber',
        appdStatus: 'Amber',
        guiStatus: 'Amber',
	},
	{
		name: 'App 7',
		aaCode: 'AA7',
		status: 'Warning',
		mcStatus: 'Red',
        appdStatus: 'Red',
        guiStatus: 'Amber',
	},
	{
		name: 'App 8',
		aaCode: 'AA8',
		status: 'Warning',
		mcStatus: 'Green',
        appdStatus: 'Green',
        guiStatus: 'Green',
	},
	{
		name: 'App 9',
		aaCode: 'AA9',
		status: 'Working',
		mcStatus: 'Green',
        appdStatus: 'Green',
        guiStatus: 'Red',
	}
];

export default tableAppList;
