type RowObj = {
	name: string;
	error: string;
	solution: string;
	time: string;
	status: string;
};

const tableAppList: RowObj[] = [
	{
		name: 'Server 1',
		error: 'CPU Overload',
		solution: 'Solution 1',
		time: 'July 11, 8:10 AM',
		status: 'Error',
	},
	{
		name: 'Server 2',
		error: 'Disk Overload',
		solution: 'Solution 2',
		time: 'July 11, 8:53 AM',
		status: 'Error',
	},
	{
		name: 'Server 3',
		error: 'Health Rule Violation',
		solution: 'Solution 1',
		time: 'July 11, 9:32 AM',
		status: 'Error',
	},
	{
		name: 'Server 4',
		error: 'APPL Issue',
		solution: 'Solution 3',
		time: 'July 11, 10:47 AM',
		status: 'Warning',
	},
	{
		name: 'Server 5',
		error: 'Certificate Expired',
		solution: 'Solution 4',
		time: 'July 11, 11:02 AM',
		status: 'Warning',
	},
	{
		name: 'Server 6',
		error: 'Health Rule Violation',
		solution: 'Solution 3',
		time: 'July 11, 11:25 AM',
		status: 'Warning',
	},
	{
		name: 'Server 7',
		error: 'Health Rule Violation',
		solution: 'Solution 1',
		time: 'July 11, 12:31 PM',
		status: 'Warning',
	},
	{
		name: 'Server 8',
		error: 'Disk Overload',
		solution: 'Solution 2',
		time: 'July 11, 2:49 PM',
		status: 'Warning',
	},
	{
		name: 'Server 9',
		error: 'CPU Overload',
		solution: 'Solution 4',
		time: 'July 11, 3:16 PM',
		status: 'Warning',
	}
];

export default tableAppList;
