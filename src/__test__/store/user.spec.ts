import { setActivePinia, createPinia } from 'pinia';
import { UserStore } from '@/stores/user';

describe('UserStore', () => {
	setActivePinia(createPinia());
	const store = UserStore();

	it('should calc windows', () => {
		store.layout = 1;
		expect(store.windows).toBe(2);
	});

	it('should set apps', () => {
		store.setApps(['bitcoin', 'candle', 'coinglass']);
		expect(store.apps).toStrictEqual([
			[1, 'bitcoin'],
			[2, 'candle'],
			[3, 'coinglass'],
		]);
	});

	it('should reset apps', () => {
		store.layout = 3;
		store.setApps(['']);
		expect(store.apps).toStrictEqual([
			[1, ''],
			[2, ''],
			[3, ''],
		]);
	});
});
