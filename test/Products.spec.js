import {shallowMount, createLocalVue, RouterLinkStub, mount} from '@vue/test-utils'
import ProductList from "../components/product-list/ProductList";
import Vuex from 'vuex'

const products = [
  {
    "id": 1,
    "name": "milk",
    "price": 2,
    "date": "30.07.2020"
  },
  {
    "id": 2,
    "name": "bread",
    "price": 1,
    "date": "30.06.2020"
  },
  {
    "id": 3,
    "name": "chocolate",
    "price": 3,
    "date": "30.06.2020"
  },
  {
    "id": 4,
    "name": "sausage",
    "price": 2,
    "date": "1.07.2020"
  },
]

const factory = (values = {}) => {
  return mount(ProductList, {
    ...values,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
}

describe('ProductList', () => {
  it('render correctly with different props', () => {
    const wrapper = factory({
      propsData: {
        products,
        limit: 2
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
  it('correct visible empty list', () => {
    const wrapper = factory({
      propsData: {
        products: [],
        limit: 2
      },
    })
    expect(wrapper.find('.product-list').exists()).toBeFalsy()
  });
  it('correct visible filled list', () => {
    const wrapper = factory({
      propsData: {
        products,
        limit: 2
      },
    })
    expect(wrapper.find('.product-list').exists()).toBeTruthy()
  });


})


describe('ProductControl', () => {
  it('page data pagination', () => {
    const wrapper = factory({
      propsData: {
        products,
        limit: 2
      },
    })

    expect(wrapper.vm.calcData()).toStrictEqual(products.slice(0, 2))
    wrapper.vm.pageNumber = 1
    expect(wrapper.vm.calcData()).toStrictEqual(products.slice(2, 4))
    wrapper.vm.pageNumber = 2
    expect(wrapper.vm.calcData()).toStrictEqual([])

  });

  it('pagination control', () => {
    const wrapper = factory({
      propsData: {
        products,
        limit: 2
      },
    })
    expect(wrapper.vm.calcData()).toStrictEqual(products.slice(0, 2))
    let button = wrapper.find('.product-list__pagination-item:last-child')
    button.trigger('click')
    expect(wrapper.vm.calcData()).toStrictEqual(products.slice(2))
    button = wrapper.find('.product-list__pagination-item')
    button.trigger('click')
    expect(wrapper.vm.calcData()).toStrictEqual(products.slice(0, 2))
  })
})

