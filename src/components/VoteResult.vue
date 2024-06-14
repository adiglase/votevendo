<template>
    <div class="card">
        <TabView>
            <TabPanel header="Vote Count Result">
                <div class="card flex justify-content-center">
                    <Chart
                        type="pie"
                        :data="chartData"
                        :options="chartOptions"
                        class="w-full md:w-30rem"
                    />
                </div>
            </TabPanel>
            <TabPanel header="Vote Choice List">
                <div>2</div>
            </TabPanel>
        </TabView>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps(['electionData'])

onMounted(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
})

const getChartData = computed(() => {
    if (props.electionData.hasEnded) {
        const chartLabels = props.electionData.candidates.map((candidate) => candidate.name)

        return [chartLabels, props.electionData.results]
    }

    return [[], []]
})

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
    return {
        labels: getChartData.value[0],
        datasets: [
            {
                data: getChartData.value[1]
            }
        ]
    }
}

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    }
}
</script>

<style></style>
