import { shallowMount } from '@vue/test-utils'
import Product from '@/components/Product.vue'

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('Product', () => {
  const premium = true
  const wrapper = getMountedComponent(Product, { premium })

  function expectContent(selector, value) {
    expect(wrapper.find(selector).text()).toEqual(value)
  }

  it('updates the selected product', () => {
    wrapper.vm.updateProduct(0)
    expect(wrapper.vm.selectedVariant).toBe(0)
  })

  it('renders out of stock message if there are no products', (done) => {
    wrapper.findAll('.color-box').at(1).trigger('mouseover')
    wrapper.vm.$nextTick(() => {
      expectContent('.stock', 'Out of Stock')
      done()
    })
  })

  it('renders in stock message if there are products', (done) => {
    wrapper.findAll('.color-box').at(0).trigger('mouseover')
    wrapper.vm.$nextTick(() => {
      expectContent('.stock', 'In Stock')
      done()
    })
  })
})
