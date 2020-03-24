<template>
    <div>
        <span
            class="tab"
            :class="{activeTab: selectedTab === index}"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = index">
            {{ tab }}
        </span>

        <div v-show="selectedTab === 0">
            <p>Shipping: {{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 1">
            <ul>
                <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-tabs',
    props: {
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 0
        };
    }
}
</script>