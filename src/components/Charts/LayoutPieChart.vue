<template>
	<div v-if="isChartMounted">
		<v-chart
			ref="layoutPieChartRef"
			class="chart"
			:option="option"
			style="height: 288px; width: 288px"
			@click="setLayout"
			@mouseover.once="interruptHighlight"
		/>
	</div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { EChartsOption } from 'echarts/types/dist/shared.d';
import { CanvasRenderer } from 'echarts/renderers';
import { UserStore } from '@/stores/user';
import VChart from 'vue-echarts';

use([CanvasRenderer, PieChart]);

interface EChartsData {
	id: number;
	value: number;
	name: string;
}

const emit = defineEmits<{ (e: 'close'): void }>();
const userStore = UserStore();

const isChartMounted = ref<boolean>(false);
const interval = ref<NodeJS.Timer>();
const currentIndex = ref<number>(0);

const layoutPieChartRef = ref();
const option = ref<EChartsOption>({
	series: [
		{
			name: 'LayoutPieChart',
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['50%', '40%'],
			data: [
				{ id: 1, value: 25, name: '雙視窗' },
				{ id: 2, value: 25, name: '三視窗\r\n(上大下小)' },
				{ id: 3, value: 25, name: '三視窗\r\n(上小下大)' },
				{ id: 4, value: 25, name: '四視窗' },
			],
			label: {
				show: false,
				position: 'center',
			},
			emphasis: {
				label: {
					show: true,
					color: '#fff',
					fontSize: '20',
					fontWeight: 'bold',
				},
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2,
				},
			},
		},
	],
});

const showHighlight = () => {
	interval.value = setInterval(() => {
		dispatch('downplay', currentIndex.value - 1);
		dispatch('highlight', currentIndex.value);
		currentIndex.value === 4 ? clearInterval(interval.value) : false;
		currentIndex.value++;
	}, 850);
};

const interruptHighlight = () => {
	clearInterval(interval.value);
	currentIndex.value === 0 ? dispatch('downplay', currentIndex.value) : dispatch('downplay', currentIndex.value - 1);
};

/**
 * 控制 highlight & downplay
 */
const dispatch = (type: string, dataIndex: number) => {
	layoutPieChartRef.value.dispatchAction({
		type,
		seriesIndex: 0,
		dataIndex,
	});
};

const setLayout = ({ data }: { data: EChartsData }) => {
	userStore.layout = data.id;
	userStore.setApps();
	emit('close');
};

onMounted(() => {
	isChartMounted.value = true;
	setTimeout(() => showHighlight(), 1000);
});
</script>

<style lang="scss" scoped></style>
