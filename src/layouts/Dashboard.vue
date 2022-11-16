<template>
	<!-- Layout -->
	<div
		class="relative box-border grid w-full grid-cols-2 grid-rows-2 bg-primary"
		:style="{ height: `calc(100vh - ${props.headerHeight}px)` }"
	>
		<!-- 雙、四視窗 -->
		<template v-if="userStore.layout === 1 || userStore.layout === 4">
			<section
				v-for="(window, index) in userStore.windows"
				:key="window"
				class="col-span-1 m-1 rounded-md"
				:class="userStore.windows === 2 ? 'row-span-2' : 'row-span-1'"
			>
				<Suspense>
					<template #default>
						<component :is="currAppComps[index]" v-if="currAppComps[index]" :modelVisible="modelVisible" />
					</template>
					<template #fallback>
						<AppLoading />
					</template>
				</Suspense>
			</section>
		</template>
		<!-- 三視窗 -->
		<template v-else>
			<section class="col-span-2 m-1 rounded-md" :class="userStore.layout === 2 ? 'row-start-1' : 'row-start-2'">
				<Suspense>
					<template #default>
						<component :is="currAppCompsForThree[0][0]" v-if="currAppCompsForThree[0][0]" :modelVisible="modelVisible" />
					</template>
					<template #fallback>
						<AppLoading />
					</template>
				</Suspense>
			</section>
			<section v-for="(window, index) in userStore.windows - 1" :key="window" class="col-span-1 m-1 rounded-md">
				<Suspense>
					<template #default>
						<component :is="currAppCompsForThree[1][index]" v-if="currAppCompsForThree[1][index]" :modelVisible="modelVisible" />
					</template>
					<template #fallback>
						<AppLoading />
					</template>
				</Suspense>
			</section>
		</template>
		<!-- Modal btn -->
		<div class="absCenter h-10 w-10 cursor-pointer rounded-full bg-primary duration-100">
			<div
				class="flexCenter h-full w-full duration-100 hover:rotate-90 hover:scale-125 active:scale-95"
				@click="modelVisible = true"
			>
				<ep-HelpFilled color="#fff" />
			</div>
		</div>
		<!-- APPs modal -->
		<AppModal v-if="modelVisible" @close="modelVisible = false" />
	</div>
</template>

<script setup lang="ts">
import { UserStore } from '@/stores/user';
import type { Component } from 'vue';
import AppModal from '@/components/Modals/AppModal.vue';
import AppLoading from '@/components/Loadings/AppLoading.vue';

interface DashboardProps {
	headerHeight: number;
}

const props = withDefaults(defineProps<DashboardProps>(), {
	headerHeight: 0,
});
const userStore = UserStore();

const modelVisible = ref<boolean>(false);

/**
 * 當前已配置的 app components
 */
const currAppComps = computed<Array<Component | string>>(() => {
	return userStore.apps.map((app) => {
		return app[1] ? markRaw(defineAsyncComponent(() => import(`../components/Apps/${app[1]}.vue`))) : '';
	});
});

/**
 * 當前已配置的 app components（三視窗）
 */
const currAppCompsForThree = computed<Array<Array<Component | string>>>(() => {
	const comps = userStore.apps.map((app) => {
		return app[1] ? markRaw(defineAsyncComponent(() => import(`../components/Apps/${app[1]}.vue`))) : '';
	});
	return userStore.layout === 2 ? [[comps[0]], [...comps.slice(1)]] : [[comps[2]], [...comps.slice(0, 2)]];
});
</script>

<style lang="scss" scoped>
section {
	background: radial-gradient(#1b2446, #24283f);
}
</style>

<style lang="scss" scoped></style>
