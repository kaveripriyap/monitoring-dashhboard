type RowObj = {
	name: string;
	status: string;
	date: string;
	error: string;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'Solution 1',
		error: 'Applications 5, 6 down',
		status: 'Approved',
		date: 'July 11, 8:10 AM'
	},
	{
		name: 'Solution 2',
		error: 'Applications 1, 4 down',
		status: 'Disable',
		date: 'July 11, 9:32 AM'
	},
	{
		name: 'Solution 3',
		error: 'Applications 8 down',
		status: 'Error',
		date: 'July 11, 11:02 AM'
	},
	{
		name: 'Solution 4',
		error: 'Applications 23, 26 down',
		status: 'Approved',
		date: 'July 11, 3:16 PM'
	}
];
export default tableDataComplex;
