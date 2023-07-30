import { Icon } from '@chakra-ui/react';
import { MdBusinessCenter, MdCode, MdDashboard } from 'react-icons/md';

import Dashboard from 'views/dashboards/dashboard';
import PanelView from 'views/tech/panelView';
import ApplicationStatus from 'views/business/applicationStatus';
import ApplicationList from 'views/tech/listView';

const routes = [
	// --- Management View ---
	{
		name: 'Management',
		path: '/dashboards',
		icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
		collapse: true,
		items: [
			{
				name: 'Dashboard View',
				layout: '',
				path: '/dashboards/view',
				component: Dashboard
			}
		]
	},

	// --- Tech Support View ---
	{
		name: 'Tech Support',
		path: '/tech',
		icon: <Icon as={MdCode} width='20px' height='20px' color='inherit' />,
		collapse: true,
		items: [
			{
				name: 'List View',
				layout: '',
				path: '/tech/list-view',
				exact: false,
				component: ApplicationList
			},
			{
				name: 'Panel View',
				layout: '',
				path: '/tech/panel-view',
				component: PanelView,
				secondary: true
			}
		]
	},

	// --- Business Support View ---
	// {
	// 	name: 'Business Support',
	// 	path: '/business',
	// 	icon: <Icon as={MdBusinessCenter} width='20px' height='20px' color='inherit' />,
	// 	collapse: true,
	// 	items: [
	// 		{
	// 			name: 'Application Status',
	// 			layout: '',
	// 			path: '/business/app-status',
	// 			exact: false,
	// 			component: ApplicationStatus
	// 		}
	// 	]
	// }
];

export default routes;
