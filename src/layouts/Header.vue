<template>
	<!-- Header -->
	<div ref="headerRef" class="w-full bg-primary py-2">
		<ul class="grid grid-cols-12 items-center px-6 text-white">
			<!-- Home title -->
			<li class="col-start-1">
				<div class="dropdown box-border cursor-pointer border-b-2 border-gray-500 duration-100 hover:opacity-70">
					<h1 class="text-xl">Crypto Dashboard</h1>
				</div>
				<!-- Menu dropdown -->
				<div
					class="menu absolute left-6 top-16 z-0 translate-y-1/2 pt-6 opacity-0 duration-300 hover:z-10 hover:translate-y-0 hover:opacity-100"
				>
					<div class="flex w-[300px] flex-wrap justify-center">
						<el-button type="primary" class="w-[90px]"> <ep-HomeFilled /><span class="ml-2">首頁</span></el-button>
						<el-button type="primary" class="w-[90px] hover:bg-slate-100"
							><ep-Odometer /><span class="ml-2">儀表板</span></el-button
						>
						<el-button type="primary" class="w-[90px]"><ep-PictureRounded /><span class="ml-2">NFT</span></el-button>
					</div>
				</div>
			</li>
			<!-- Layout Button -->
			<li class="left-1 col-start-6 ml-auto -mr-3">
				<el-icon :size="24" class="cursor-pointer duration-300 hover:scale-125" @click="modelVisible = true"><ep-menu /></el-icon>
			</li>
			<!-- Gas -->
			<li class="col-start-[11]">3</li>
			<!-- User dropdown -->
			<li class="col-start-[12] h-1/2">
				<div class="cursor-pointer rounded-md border bg-white text-primary" @click="handleDropDown">
					<p class="text-center text-lg">
						<el-icon :size="20" class="pb-1 align-middle"><ep-user /></el-icon>
						<span class="ml-1">Hi User</span>
					</p>
				</div>
				<el-dropdown
					ref="userDropdownRef"
					trigger="contextmenu"
					class="item-end"
					size="large"
					@visible-change="changeUserDropdownState"
				>
					<span class="ml-12 h-0"></span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item disabled>登入</el-dropdown-item>
							<el-dropdown-item>登出</el-dropdown-item>
							<el-dropdown-item>註冊</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</li>
		</ul>
	</div>
	<!-- Layout modal -->
	<el-dialog v-model="modelVisible" title="選擇畫面呈現樣式" :center="true">
		<div class="mx-auto h-72 w-72 cursor-pointer"><LayoutPieChart @close="modelVisible = false" /></div>
	</el-dialog>
</template>

<script setup lang="ts">
import LayoutPieChart from '@/components/Charts/LayoutPieChart.vue';

const headerRef = ref();
const userDropdownRef = ref();
const userDropdownVisible = ref<boolean>(false);
const modelVisible = ref<boolean>(false);

const handleDropDown = async () => {
	if (!userDropdownVisible.value) userDropdownRef.value.handleOpen();
	else userDropdownRef.value.handleClose();
};

const changeUserDropdownState = (value: boolean) => {
	userDropdownVisible.value = value;
};

defineExpose({ headerRef });
</script>

<style lang="scss" scoped>
.el-dialog__title {
	color: #191970;
	letter-spacing: 0.25rem;
	font-family: 'Noto Sans CJK TC', 'Microsoft JhengHei', PingFang;
}

.dropdown:hover {
	+ .menu {
		opacity: 1;
		z-index: 10;
		transform: translateY(0);
	}
}
</style>
