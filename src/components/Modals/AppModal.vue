<template>
	<teleport to="body">
		<div class="absolute inset-0 bg-black/50">
			<transition name="fadeOut">
				<div v-show="showModal" class="modal-container absCenter h-[400px] w-[600px] rounded-lg bg-primary">
					<!-- App Icons -->
					<div class="modal-header border-b-2 border-gray-500 py-3">
						<ul class="flex justify-around">
							<li
								v-for="icon in appIcons"
								:key="icon"
								class="h-10 w-10 cursor-move rounded-lg duration-200 hover:mx-4 hover:scale-125"
								draggable="true"
								@dragstart="targetAppName = icon"
							>
								<Icon :file="icon" />
							</li>
						</ul>
					</div>
					<!-- App layout -->
					<div class="modal-body h-full py-5 px-4" :class="isAnimated ? 'opacity-1' : 'opacity-0'">
						<div class="flex justify-start">
							<p class="basis-1/3 cursor-pointer pl-2 hover:text-gray-300" @click="clearApps">重置</p>
							<p class="basis-1/3 tracking-wide text-gray-300">將上方 APP 拖曳至方格內</p>
						</div>
						<!-- 雙、四視窗 -->
						<template v-if="userStore.layout === 1 || userStore.layout === 4">
							<div class="grid h-4/5 w-full cursor-move grid-cols-2 grid-rows-2 rounded-xl bg-primary">
								<section
									v-for="item in apps"
									:key="item.id"
									class="flexCenter col-span-1 m-1 rounded-md"
									:class="userStore.windows === 2 ? 'row-span-2' : 'row-span-1'"
									draggable="true"
									@dragstart="onDragStart(item)"
									@dragover="onDragOver"
									@drop="configureApp(item.id)"
								>
									<div class="h-16 w-16" :class="item.name ? '' : 'flexCenter rounded-full bg-slate-400'">
										<Icon v-if="item.name" :file="item.name" />
										<ep-Notification v-else color="#fff" class="text-xl" />
									</div>
								</section>
							</div>
						</template>
						<!-- 三視窗 -->
						<template v-else>
							<div class="grid h-4/5 w-full cursor-move grid-cols-2 grid-rows-2 rounded-xl bg-primary">
								<section
									class="flexCenter col-span-2 m-1 rounded-md"
									:class="userStore.layout === 2 ? 'row-start-1 pb-3' : 'row-start-2 pt-3'"
									draggable="true"
									@dragstart="onDragStart(upperApp)"
									@dragover="onDragOver"
									@drop="configureApp(upperApp.id)"
								>
									<div class="h-16 w-16" :class="upperApp.name ? '' : 'flexCenter rounded-full bg-slate-400'">
										<Icon v-if="upperApp.name" :file="upperApp.name" />
										<ep-Notification v-else color="#fff" class="text-xl" />
									</div>
								</section>
								<section
									v-for="item in splitApps"
									:key="item.id"
									class="flexCenter col-span-1 m-1 rounded-md"
									draggable="true"
									@dragstart="onDragStart(item)"
									@dragover="onDragOver"
									@drop="configureApp(item.id)"
								>
									<div class="h-16 w-16" :class="item.name ? '' : 'flexCenter rounded-full bg-slate-400'">
										<Icon v-if="item.name" :file="item.name" />
										<ep-Notification v-else color="#fff" class="text-xl" />
									</div>
								</section>
							</div>
						</template>
						<!-- Confirm btn -->
						<div v-show="isBtnShow" class="absCenter !top-[62.5%] h-10 w-10 cursor-pointer rounded-full bg-primary duration-100">
							<div class="flexCenter h-full w-full duration-300 hover:scale-125">
								<ep-CircleCheckFilled v-if="appsAllSettled" color="#fff" class="text-xl" @click="setApps(true)" />
								<ep-CircleCloseFilled v-else color="#ec8884" class="text-xl" @click="setApps(false)" />
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { UserStore } from '@/stores/user';
import Icon from '@/components/Apps/Icon.vue';

interface app {
	id: number;
	name: string;
}

const emit = defineEmits<{ (e: 'close'): void }>();
const userStore = UserStore();

const isAnimated = ref<boolean>(false);
const isBtnShow = ref<boolean>(false);
const showModal = ref<boolean>(true);
const targetAppId = ref<number | null>(null);
const targetAppName = ref<string>('');
// 三螢幕大方塊
const upperApp = ref<app>({ id: 0, name: '' });
const apps = ref<Array<app>>([]);
const appIcons = ref<string[]>(['Bitcoin', 'Calender', 'Candle', 'Coinglass', 'News', 'Youtube']);

const appsAllSettled = computed(() => apps.value.every((app) => app.name !== ''));
const splitApps = computed(() => (userStore.layout === 2 ? unref(apps).slice(1) : unref(apps).slice(0, 2)));

const setApps = (status: boolean) => {
	if (status) {
		const appsName = apps.value.map((app) => app.name);
		userStore.setApps(appsName);
	}
	showModal.value = false;
	setTimeout(() => emit('close'), 750);
};

/**
 *  配置 apps
 */
const configureApp = (id: number) => {
	if (targetAppId.value !== null) {
		// 交換 app 位置
		const source = apps.value.find((app) => app.id === targetAppId.value);
		const des = apps.value.find((app) => app.id === id);
		if (source && des) [source.name, des.name] = [des.name, source.name];
		targetAppId.value = null;
	}

	if (targetAppName.value) {
		// 尋找有無重複 app
		const duplicateAppIndex = apps.value.find((app) => app.name === targetAppName.value);
		if (duplicateAppIndex) duplicateAppIndex.name = '';
		// 配置 app
		const target = apps.value.find((app) => app.id === id);
		if (target) target.name = targetAppName.value;
		targetAppName.value = '';
	}
};

const clearApps = () => {
	apps.value = new Array(userStore.windows).fill('').map((_, index) => Object.assign({}, { id: index, name: '' }));
	upperApp.value = userStore.layout === 2 ? apps.value[0] : apps.value[2];
};

/**
 *  取得拖曳當下的 app
 */
const onDragStart = (targetApp: app) => {
	targetAppId.value = targetApp.id;
	targetAppName.value = targetApp.name;
};

/**
 *  確保 ondrop 順利觸發
 */
const onDragOver = (e: Event) => {
	e.preventDefault();
};

/**
 * 控制動畫
 */
setTimeout(() => (isAnimated.value = true), 780);
setTimeout(() => (isBtnShow.value = true), 1500);

onMounted(() => {
	if (userStore.apps.every(([, name]) => name !== '')) {
		apps.value = userStore.apps.map(([id, name]) => Object.assign({}, { id, name }));
	} else {
		apps.value = new Array(userStore.windows).fill('').map((_, index) => Object.assign({}, { id: index, name: '' }));
	}
	upperApp.value = userStore.layout === 2 ? apps.value[0] : apps.value[2];
});
</script>

<style lang="scss" scoped>
section {
	background: radial-gradient(#1b2446, #24283f);
}

.modal {
	&-container {
		animation: expendOut 0.75s cubic-bezier(0.57, 0.36, 0.55, 1.01);
	}

	&-body {
		animation: fadeIn 0.5s cubic-bezier(0.57, 0.36, 0.55, 1.01) 0.75s;
	}
}

.fadeOut-leave-active {
	transition: all 0.75s ease;
}

.fadeOut-leave-from {
	opacity: 1;
}

.fadeOut-leave-to {
	opacity: 0;
	transform: translate(-50%, -100%);
}

@keyframes expendOut {
	0% {
		width: 0px;
		height: 0px;
		opacity: 0;
	}
	100% {
		width: 600px;
		height: 400px;
		opacity: 1;
	}
}

@keyframes fadeIn {
	0% {
		transform: translateY(20%);
		opacity: 0;
	}
	100% {
		transform: translateY(0%);
		opacity: 1;
	}
}
</style>
