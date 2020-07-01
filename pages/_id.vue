<template>
  <table class="product-list">
    <thead class="product-list__item">
    <tr>
      <th class="product-list__head">ID</th>
      <th class="product-list__head">NAME</th>
      <th class="product-list__head">PRICE</th>
      <th class="product-list__head">DATE</th>
    </tr>
    </thead>
    <tbody>
    <tr class="product-list__item">
      <td>{{editProduct.id}}</td>
      <td>
        <input
          type="text"
          @keyup.enter="save()"
          v-model="editProduct.name">
      </td>
      <td>
        <input
          type="text"
          @keyup.enter="save()"
          v-model="editProduct.price">
      </td>
      <td>{{editProduct.date}}</td>
      <td class="product-list__control">
        <button @click="save()">Сохр.</button>
      </td>
      <td class="product-list__control">
        <button @click="remove()">УД.</button>
        <nuxt-link to="/">Назад</nuxt-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    async fetch({store, route}) {
      if (store.getters['products/get'].length === 0)
        await store.dispatch('products/getProducts')
    },
    data() {
      return {
        data: {
          name: '',
          price: 0
        }
      }

    },
    mounted() {

    },
    computed: {
      ...mapGetters({getProductById: 'products/getProductById'}),
      product() {
        return this.getProductById(+this.$route.params.id)
      },
      editProduct() {
        return Object.assign({}, this.product)
      },
    },
    methods: {
      save(product) {
        if (!+this.editProduct.price || !this.editProduct.name)
          return
        this.$store.commit('products/save', this.editProduct)

        this.$router.push('/')
      },
      remove() {
        this.$router.push('/')
        this.$store.commit('products/remove', this.product)
      }
    }
  }
</script>

<style scoped lang="scss">
  .product-list{
    &__head{
      cursor: pointer;
     }
  }
</style>
