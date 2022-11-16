<template>
	<div class="max-w-full">
		<Header ref="header" />
		<Dashboard :headerHeight="headerHeight" />
	</div>
</template>

<script setup lang="ts">
import Header from '@/layouts/Header.vue';
import Dashboard from '@/layouts/Dashboard.vue';

const header = ref();
const headerHeight = ref<number>(0);

onMounted(() => {
	headerHeight.value = header.value.headerRef.clientHeight;
});
</script>

<style lang="scss" scoped></style>
