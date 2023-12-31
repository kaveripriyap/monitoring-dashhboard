import { Portal, Box, useDisclosure } from '@chakra-ui/react';

import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';

export default function Dashboard(props: { [x: string]: any }) {
	const { ...rest } = props;

	const [ fixed ] = useState(false);
	const [ toggleSidebar, setToggleSidebar ] = useState(false);

	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes: RoutesType[]): string => {
		let activeRoute = 'Random Dashboard';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].items);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes: RoutesType[]): boolean => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbar(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondary;
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes: RoutesType[]): any => {
		return routes.map((route: RoutesType, key: number) => {
			if (route.layout === '') {
				return <Route path={route.layout + route.path} component={route.component} key={key} />;
			}
			if (route.collapse) {
				return getRoutes(route.items);
			} else {
				return null;
			}
		});
	};

	document.documentElement.dir = 'ltr';
	const { onOpen } = useDisclosure();
	return (
		<Box>
			<SidebarContext.Provider
				value={{
					toggleSidebar,
					setToggleSidebar
				}}>
				<Sidebar routes={routes} display='none' {...rest} />
				<Box
					float='right'
					minHeight='100vh'
					height='100%'
					overflow='auto'
					position='relative'
					maxHeight='100%'
					w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
					<Portal>
						<Box>
							<Navbar
								onOpen={onOpen}
								logoText={'Meeow!'}
								brandText={getActiveRoute(routes)}
								secondary={getActiveNavbar(routes)}
								fixed={fixed}
								{...rest}
							/>
						</Box>
					</Portal>

					{getRoute() ? (
						<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
							<Switch>
								{getRoutes(routes)}
								<Redirect from='/' to='/dashboards/cluster-view' />
							</Switch>
						</Box>
					) : null}
				</Box>
			</SidebarContext.Provider>
		</Box>
	);
}
