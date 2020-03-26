import { shallowMount } from '@vue/test-utils'
import Product from '@/components/Product.vue'

describe('Product.vue', () => {
  it('updates the selected product', () => {
    const premium = true
    const wrapper = shallowMount(Product, {
      propsData: { premium }
    })
    wrapper.vm.updateProduct(0);
    expect(wrapper.vm.selectedVariant).toBe(0)
  })
})
