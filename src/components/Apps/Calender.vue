<template>
	<div class="h-full w-full">
		<iframe
			frameborder="0"
			width="100%"
			height="100%"
			scrolling="yes"
			:class="props.modelVisible ? 'pointer-events-none' : ''"
			src="https://rili-d.jin10.com/open.php?fontSize=14px&backgroundColor=5A82E6"
		></iframe>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	modelVisible: boolean;
}>();

console.log(
	'%c ================= 以下來自 "金十數據" WebSocket 回傳訊息 (請忽略) ================= ',
	'background: #2C2C40; color: #e0e0e0',
);

onUnmounted(() => {
	console.log(
		'%c ================= 以上來自 "金十數據" WebSocket 回傳訊息 (請忽略) ================= ',
		'background: #2C2C40; color: #e0e0e0',
	);
});
</script>

<style lang="scss" scoped></style>
