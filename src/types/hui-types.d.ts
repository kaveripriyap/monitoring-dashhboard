export {};

declare global {
	interface RoutesType {
		// required props
		name: string;
		path: string;
		// optional props
		icon?: JSX.Element;
		secondary?: boolean;
		layout?: string;
		component?: () => JSX.Element;
		collapse?: boolean;
		items?: {
			// required props
			name: string;
			path: string;
			// optional props
			secondary?: boolean;
			layout?: string;
			component?: () => JSX.Element;
			collapse?: boolean;
			items?: {
				// required props
				name: string;
				layout: string;
				path: string;
				component: () => JSX.Element;
				// optional props
				secondary?: boolean;
			}[];
		}[];
	}
	interface NavbarCollapseType {
		name: string;
		path: string;
		secondary?: boolean;
		layout?: string;
		component?: () => JSX.Element;
		collapse?: boolean;
		items?: {
			name: string;
			layout: string;
			path: string;
			component: () => JSX.Element;
			secondary?: boolean;
		}[];
	}
	interface NavbarLinksType {
		// required props
		name: string;
		layout: string;
		path: string;
		component: () => JSX.Element;
		// optional props
		secondary?: boolean;
	}
	[];
}
