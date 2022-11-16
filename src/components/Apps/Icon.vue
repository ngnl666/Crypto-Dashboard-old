<template>
	<img v-if="props.file === 'Bitcoin'" src="../../assets/appIcon/bitcoin.png" alt="比特幣" loading="lazy" />
	<img v-if="props.file === 'Calender'" src="../../assets/appIcon/calender.png" alt="財經日曆" loading="lazy" />
	<img v-if="props.file === 'Candle'" src="../../assets/appIcon/candle.png" alt="幣價" loading="lazy" />
	<img v-if="props.file === 'Coinglass'" src="../../assets/appIcon/coinglass.png" alt="多空比" loading="lazy" />
	<img v-if="props.file === 'News'" src="../../assets/appIcon/news.png" alt="財經新聞" loading="lazy" />
	<img v-if="props.file === 'Youtube'" src="../../assets/appIcon/youtube.png" alt="Youtube" loading="lazy" />
</template>

<script setup lang="ts">
const props = defineProps<{
	file: string;
}>();
</script>

<style lang="scss" scoped></style>
