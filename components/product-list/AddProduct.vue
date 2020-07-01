<template>
  <form @submit.prevent="add">
    <label>
      <input v-model="name" type="text" minlength="3" placeholder="Название">
    </label>
    <label>
      <input v-model="price" min="0" minlength="1" placeholder="Цена">
    </label>
    <button type="submit">Добавить</button>
  </form>
</template>

<script>
  export default {
    name: "AddProduct",
    data() {
      return {
        name: '',
        price: 0
      }
    },
    methods: {
      add() {
        this.price = +this.price
        if (!this.name || !this.price) return
        this.$store.commit('products/add', {
          id: this.$store.getters['products/get'].length + 1,
          name: this.name,
          price: +this.price,
          date: this.formatDate(new Date())
        })
        this.name = this.price = null
        this.$emit('addProduct')
      },
      formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
      }
    }
  }
</script>

<style scoped>

</style>
