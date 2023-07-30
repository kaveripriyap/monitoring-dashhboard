type NodeObj = {
    name: string;
    type: 'MC' | 'AppD';
    aaCode: string;
    error: string;
    time: string;
    status: 'Error' | 'Warning' | 'Working';
    link: string;
    component?: 'CPU' | 'APPL' | 'NBU' | 'DISK';
};
  
const tableNodeList: NodeObj[] = [
{
    name: 'Server 1',
    type: 'MC',
    aaCode: 'AA1', // This aaCode should match the aaCode of the corresponding application
    error: 'CPU Overload',
    time: 'July 11, 8:10 AM',
    status: 'Error',
    link: 'https://www.mc.com/server1/cpu',
    component: 'CPU'
},
{
    name: 'Server 1',
    type: 'MC',
    aaCode: 'AA1', // This aaCode should match the aaCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Error',
    link: 'https://www.mc.com/server1/disk',
    component: 'DISK'
},
{
    name: 'Node 1',
    type: 'AppD',
    aaCode: 'AA1', // This aaCode should match the aaCode of the corresponding application
    error: '',
    time: 'July 11, 8:10 AM',
    status: 'Working',
    link: '',
},
{
    name: 'Server 2',
    type: 'MC',
    aaCode: 'AA2', // This aaCode should match the aaCode of the corresponding application
    error: '',
    time: 'July 11, 8:10 AM',
    status: 'Working',
    link: '',
},
{
    name: 'Node 2',
    type: 'AppD',
    aaCode: 'AA2', // This aaCode should match the aaCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.appd.com/node2',
},
{
    name: 'Server 3',
    type: 'MC',
    aaCode: 'AA3', // This aaCode should match the aaCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.mc.com/server3',
},
{
    name: 'Node 3',
    type: 'AppD',
    aaCode: 'AA3', // This aaCode should match the aaCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.appd.com/node3',
},
// Add more server/node data here
// ...
];

export default tableNodeList;
  