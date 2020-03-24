<template>
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">Please correct the following error(s)</p>
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                <p>{{ error }}</p>
            </li>
        </ul>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
            Would you recommend this product?
            <label for="recommend-yes">Yes</label>
            <input
                id="recommend-yes"
                type="radio"
                v-model="recommend"
                value="yes">
            <label for="recommend-no">No</label>
            <input
                id="recommend-no"
                type="radio"
                v-model="recommend"
                value="no">
        </p>
        <p>
            <input type="submit" id="submit">
        </p>
    </form>
</template>
    
<script>
import { EventBus } from '../event-bus.js';

export default {
    name: 'product-review',
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.rating && this.review && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                EventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            }
            else {
                if (!this.name)
                    this.errors.push("Name is required");
                if (!this.rating)
                    this.errors.push("Rating is required");
                if (!this.review)
                    this.errors.push("Review is required");
                if (!this.recommend)
                    this.errors.push("Recommend is required");
            }
        }
    }
}
</script>