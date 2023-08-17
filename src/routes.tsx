import { Icon } from '@chakra-ui/react';
import { MdBusinessCenter, MdCode, MdDashboard } from 'react-icons/md';

import Dashboard from 'views/dashboards/dashboard';
import HolidayCalendar from 'views/dashboards/calendar';
import PanelView from 'views/tech/panelView';
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
				path: '/dashboards/cluster-view',
				component: Dashboard
			},
			{
				name: 'Holiday Calendar',
				layout: '',
				path: '/dashboards/holiday-calendar',
				component: HolidayCalendar
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
	}
];

export default routes;
