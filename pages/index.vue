<template>
  <div class="container">
    <add-product @addProduct="update"/>
    <product-list ref="productList" :products="productList" :limit="2"/>
  </div>
</template>

<script>
import AddProduct from "../components/product-list/AddProduct";
import ProductList from "../components/product-list/ProductList";
import { mapGetters } from 'vuex';
export default {
  components: {ProductList, AddProduct},
  async fetch({store}){
    if (store.getters['products/get'].length === 0)
      await store.dispatch('products/getProducts')
  },
  computed:{
    ...mapGetters({productList: 'products/get'})
  },
  methods:{
    update(){
      this.$refs.productList.calcData()
    }
  }
}
</script>

<style lang="scss">

</style>
