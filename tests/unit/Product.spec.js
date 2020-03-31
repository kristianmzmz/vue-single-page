import { shallowMount } from '@vue/test-utils'
import Product from '@/components/Product.vue'

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

const premium = true
const wrapper = getMountedComponent(Product, { premium })

describe('Product selection', () => {

  function expectContent(selector, value) {
    expect(wrapper.find(selector).text()).toEqual(value)
  }

  it('renders out of stock message if there are no products', async () => {
    wrapper.findAll('.color-box').at(1).trigger('mouseover')
    await wrapper.vm.$nextTick()
    expectContent('.stock', 'Out of Stock')
  })

  it('renders in stock message if there are products', async () => {
    wrapper.findAll('.color-box').at(0).trigger('mouseover')
    await wrapper.vm.$nextTick()
    expectContent('.stock', 'In Stock')
  })

  it('updates the image of the product', async () => {
    wrapper.findAll('.color-box').at(1).trigger('mouseover')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.product-image img').attributes().src).toEqual('./assets/blue-socks.jpg')
  })

})

describe('Product cart', () => {

  it('Adds product to cart', async () => {
    wrapper.findAll('.color-box').at(0).trigger('mouseover')
    await wrapper.vm.$nextTick()
    wrapper.find('.add-to-cart').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().addToCart).toBeTruthy()
  })

  it('Removes product to cart', async () => {
    wrapper.find('.remove-from-cart').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().removeFromCart).toBeTruthy()
  })

  it('Button is disabled if not in stock', async () => {
    wrapper.findAll('.color-box').at(1).trigger('mouseover')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.add-to-cart').classes()).toContain('disabledButton')
  })
})


describe('Product shipping', () => {
  it('Premium get free shipping', () => {
    expect(wrapper.vm.shipping).toBe('free')
  })

  it('Not premium users get shipping costs', () => {
    const premium = false
    const wrapper = getMountedComponent(Product, { premium })
    expect(wrapper.vm.shipping).toBe('$2.99')
  })
})
