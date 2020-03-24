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
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews</p>
            <ul>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }} ({{ review.rating }})</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Recommend: {{ review.recommend }}</p>
                </li>
            </ul>
        </div>

        <product-review v-show="selectedTab === 1">
        </product-review>
    </div>
</template>

<script>
import ProductReview from './ProductReview.vue'

export default {
    name: 'review-tabs',
    components: {
        ProductReview
    },
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabs: ['Reviews', 'Make a review'],
            selectedTab: 0
        };
    }
}
</script>