<template>
  <div class="product">
    <div class="product-info">
      <review-tabs :reviews="reviews" />
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import ReviewTabs from '@/components/ReviewTabs.vue'

export default {
  name: 'ProductReviews',
  components: {
    ReviewTabs
  },
  data() {
    return {
      reviews: []
    }
  },
  mounted() {
    EventBus.$on('review-submitted', submittedProductReview => {
      this.reviews.push(submittedProductReview)
    })
  }
}
</script>

<style>
.product {
  display: flex;
  flex-flow: wrap;
  padding: 1rem;
}
img {
  border: 1px solid #d8d8d8;
  width: 70%;
  margin: 40px;
  box-shadow: 0px 0.5px 1px #d8d8d8;
}
.product-image {
  width: 80%;
}
.product-image,
.product-info {
  margin-top: 10px;
  width: 50%;
}
.color-box {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  display: inline-block;
  margin-right: 5px;
}

button {
  margin-top: 10px;
  border: none;
  background-color: #1e95ea;
  color: white;
  height: 40px;
  width: 130px;
  font-size: 14px;
  margin-right: 5px;
}
.disabledButton {
  background-color: #d8d8d8;
}
</style>