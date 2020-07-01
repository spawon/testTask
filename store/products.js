export const state = () => ({
  list: [],
  order: ''
})

export const getters = {
  get: s => s.list,
  getProductById: state => id => state.list.find(product => product.id === id),

}


export const mutations = {
  set: (s, p) => s.list.push(...p),
  setProduct: (s, p) => s.currentProduct = p,
  add: (s, p) => s.list.push(p),
  remove: (s, p) => s.list.splice(s.list.indexOf(p), 1),
  save: (s, p) => s.list[s.list.findIndex(product => product.id === p.id)] = p,
  orderBy: (s, o) => {

    if (o === s.order) {
      s.list.reverse()
      return
    }

    let sortFunc
    switch (o) {
      case 'date': {
        sortFunc = (a, b) => {
          let dateA = new Date(a.date.split(".").reverse().join("-")),
            dateB = new Date(b.date.split(".").reverse().join("-"))
          return dateA - dateB
        }
        break
      }
      case 'price': {
        sortFunc = (a, b) => {
          return a.price - b.price
        }
        break
      }
    }
    s.list = s.list.sort(sortFunc)
    s.order = o
  }

}

export const actions = {
  async getProducts({commit}) {
    const payload = await this.$axios.$get('/api/data.json')
    commit('set', payload)
  }
}
