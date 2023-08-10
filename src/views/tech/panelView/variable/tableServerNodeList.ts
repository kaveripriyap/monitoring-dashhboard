export type NodeObj = {
    name: string;
    type: 'MC' | 'AppD';
    asCode: string;
    error: string;
    time: string;
    status: 'Error' | 'Warning' | 'Working';
    link: string;
    component?: 'CPU' | 'APPL' | 'NBU' | 'DISK';
};

export const fetchTableNodeList = async () => {
    try {
      const response = await fetch('your-backend-api-url');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array or handle the error as needed
    }
  };
  
const tableNodeList: NodeObj[] = [
{
    name: 'Server 1',
    type: 'MC',
    asCode: 'AA1', // This asCode should match the asCode of the corresponding application
    error: 'CPU Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.mc.com/server1/cpu',
    component: 'CPU'
},
{
    name: 'Server 1',
    type: 'MC',
    asCode: 'AA1', // This asCode should match the asCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Error',
    link: 'https://www.mc.com/server1/disk',
    component: 'DISK'
},
{
    name: 'Node 1',
    type: 'AppD',
    asCode: 'AA1', // This asCode should match the asCode of the corresponding application
    error: '',
    time: 'July 11, 8:10 AM',
    status: 'Working',
    link: '',
},
{
    name: 'Server 2',
    type: 'MC',
    asCode: 'AA2', // This asCode should match the asCode of the corresponding application
    error: '',
    time: 'July 11, 8:10 AM',
    status: 'Working',
    link: '',
},
{
    name: 'Node 2',
    type: 'AppD',
    asCode: 'AA2', // This asCode should match the asCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.appd.com/node2',
},
{
    name: 'Server 3',
    type: 'MC',
    asCode: 'AA3', // This asCode should match the asCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.mc.com/server3',
},
{
    name: 'Node 3',
    type: 'AppD',
    asCode: 'AA3', // This asCode should match the asCode of the corresponding application
    error: 'Disk Overload',
    time: 'July 11, 8:10 AM',
    status: 'Warning',
    link: 'https://www.appd.com/node3',
},
// Add more server/node data here
// ...
];

export default tableNodeList;
  