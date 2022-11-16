import { defineStore } from 'pinia';
import { UserState } from '@/stores/interface/index';

export const UserStore = defineStore({
	id: 'UserStore',
	state: (): UserState => ({
		// 1: 雙螢幕, 2: 三螢幕(上大下小), 3: 三螢幕(上小下大), 4: 四螢幕
		layout: 4,
		// [座標, appID]
		apps: [
			[1, ''],
			[2, ''],
			[3, ''],
			[4, ''],
		],
	}),
	getters: {
		// 視窗數
		windows: (state) => (state.layout === 1 || state.layout === 2 ? state.layout + 1 : state.layout),
	},
	actions: {
		setApps(appIDs: string[] = ['']) {
			if (appIDs[0] === '') {
				this.apps = new Array(this.windows).fill('').map((_, index) => [index + 1, '']);
			} else {
				this.apps = appIDs.map((id, index) => [index + 1, id]);
			}
		},
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
			},
		],
	},
});
