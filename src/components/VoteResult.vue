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
                <div class="card">
                    <DataTable :value="getVoterChoice">
                        <Column field="address" header="Address"></Column>
                        <Column field="choice" header="Choice"></Column>
                    </DataTable>
                </div>
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

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

const candidates = computed(() => {
    const res = {}

    props.electionData.candidates.forEach((candidate) => {
        res[candidate.value] = candidate
    })

    return res
})

const getChartData = computed(() => {
    if (props.electionData.hasEnded) {
        const chartLabels = props.electionData.candidates.map((candidate) => candidate.name)

        return [chartLabels, props.electionData.results]
    }

    return [[], []]
})

const getVoterChoice = computed(() => {
    const res = []

    for (let i = 0; i < props.electionData.voterList.length; i++) {
        const choice = props.electionData.voterChoices[i]

        res.push({
            address: props.electionData.voterList[i],
            choice: choice === 0 ? '-' : `${candidates.value[choice].name} (ID: ${candidates.value[choice].value})`
        })
    }

    return shuffle(res)
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
