<template>
  <div>
    <table class="product-list"  v-if="products.length">
      <thead class="product-list__item">
      <tr>
        <th class="product-list__head">ID</th>
        <th class="product-list__head">NAME</th>
        <th class="product-list__head" @click="filterByDate('price')">PRICE</th>
        <th class="product-list__head" @click="filterByDate('date')">DATE</th>
      </tr>
      </thead>
      <tbody>
      <tr class="product-list__item" v-for="product in paginatedData" :key="product.index" @click="editProduct(product)">
        <td>{{product.id}}</td>
        <td>
          <span v-if="product !== editingProduct">{{product.name}}</span>
          <input
            type="text"
            v-if="product === editingProduct"
            @keyup.enter="save(editData)"
            v-model="editData.name">
        </td>
        <td>
          <span v-if="product !== editingProduct">{{product.price}}</span>
          <input
            type="text"
            v-if="product === editingProduct"
            @keyup.enter="save(editData)"
            v-model="editData.price">
        </td>
        <td>{{product.date}}</td>
        <td class="product-list__control">
          <button v-if="product === editingProduct" @click="save(editData)">Сохр.</button>
        </td>
        <td class="product-list__control">
          <button @click="remove(product)">УД.</button>
          <nuxt-link :to="`/${product.id}`">Подробнее</nuxt-link>
        </td>
      </tr>
      </tbody>

    </table>
    <div v-else style="text-align: center">Nothing =((</div>
    <div class="product-list__pagination">
      <div class="product-list__pagination-item" v-for="page in pageCount" :key="page.index"
           @click="pageNumber = page-1">
        {{page}}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: "ProductList",
    props: {
      products: Array,
      limit: Number
    },
    data() {
      return {
        editingProduct: {},
        editData: null,
        pageNumber: 0,
        paginatedData: []
      }
    },
    computed: {
      pageCount() {
        return Math.ceil(this.products.length / this.limit)
      },

    },
    methods: {
      ...mapMutations({orderBy:'products/orderBy'}),
      remove(product) {
        this.$store.commit('products/remove', product)
        this.calcData()
        if (this.paginatedData.length === 0){
          this.pageNumber--
        }
      },
      editProduct(product) {
        this.editingProduct = product
        this.editData = Object.assign({}, product)
      },
      save(product) {
        if (!+product.price)
          return
        this.$store.commit('products/save', product)
        this.editingProduct = {}
          this.calcData()

      },
      calcData(){
        const start = this.pageNumber * this.limit,
          end = start + this.limit;
        return this.paginatedData = this.products.slice(start, end);
      },
      filterByDate(order){
        this.orderBy(order)
        this.calcData()

      }
    },
    created() {
      this.$on("addProduct", ()=>{
        this.calcData()
      });
      this.calcData()
    },
    watch: {
      pageNumber(){
        this.calcData()
      }
    },
  }
</script>

<style scoped lang="scss">
  .product-list {
    margin-top: 20px;
    width: 100%;

    &__item {
      width: 100%;

      th {
        text-align: left;
      }
    }
    &__head{
      cursor: pointer;
    }
    &__pagination {
      justify-content: center;

      display: flex;
    }

    &__pagination-item {
      margin: 15px;
      cursor: pointer;
    }
  }
</style>
