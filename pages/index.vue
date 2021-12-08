<template>
  <main class="flex-shrink-0">
    <div v-if="error !== null">
      {{ error }}
    </div>
    <div class="container pb-4">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        <div v-for="item in products" :key="item.id" class="col">
          <div class="card shadow-sm">
            <div class="align-items-center bg-dark py-xl-5 text-center">
              <span class="text-white">Thumbnail</span>
            </div>
            <div class="card-body">
              <h5>{{ item.name }}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="text-black-50">Rp.</h6>
                <h6 class="text-black-50">{{ item.price }}</h6>
              </div>
              <div
                class="d-flex justify-content-between align-items-center pt-3"
              >
                <button type="button" class="btn btn-sm btn-success flex-fill" @click="addtoCart(item)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: "base",
  async asyncData({ $axios }) {
    // mengambil daftar products
    try {
      const items = await $axios.$get("/items/products");
      return { products: items.data, error: null };
    } catch (e) {
      return { products: [], error: e };
    }
  },
  methods: {
    addtoCart(product) {
      if (this.$auth.loggedIn === false) {
        alert('Silahkan login terlebih dahulu untuk pemesanan')
        return
      }
      // Membaca data yang dipilih
      // alert(JSON.stringify(product))

      // Menghubungi store untuk menyimpan data yang dipilih
      const qty = 1
      const newitem = {
        id: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: qty,
        total: product.price * qty
      }
      this.$store.dispatch('addOrderItem', newitem)

      // mengambil data dari store
      const details = this.$store.getters['orderItems']
      const amount = details.length
      // Memberikan konfirmasi
      alert('TOTAL PESANAN: ' + amount + '\n' + JSON.stringify(details))
    }
  }
};
</script>
