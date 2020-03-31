import { mount } from '@vue/test-utils'
import ProductReview from '@/components/ProductReview.vue'

test('renders correctly', () => {
    const wrapper = mount(ProductReview)
    expect(wrapper.find('form')).toMatchSnapshot()
})