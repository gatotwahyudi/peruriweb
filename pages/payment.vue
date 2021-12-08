<template>
  <main>
    <div class="container mb-3">
      <h3>Payment</h3>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key='item.id'>
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.quatity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="col" class="text-right" colspan="4">Invoice Amount</th>
            <th scope="col">{{ amount }}</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="container mb-3">
      <button class="btn btn-danger" @click="clearCart">Empty Cart</button>
      <button class="btn btn-primary" @click="checkout">Checkout</button>
    </div>
  </main>
</template>

<script>
export default {
  layout: "base",
  async asyncData ({ store }) {
    const data = store.getters['orderItems']
    const total_amount = store.getters['invoiceAmount']
    return { items: data, amount: total_amount }
  },
  data () {
    return {
      items: [],
      amount: 0
    }
  },
  methods: {
    clearCart() {
      this.$store.dispatch('clearOrderItems')
      const data = this.$store.getters['orderItems']
      const total_amount = this.$store.getters['invoiceAmount']
      this.data = { items: data, amount: total_amount }
      // merefresh page bila kita melakukan perubahan data()
      this.$nuxt.refresh()
      alert("Cart is now empty")
    },
    async checkout() {
      try {
        // alert("TODO - Call back end to create Order and Order Details")
        const data = this.$store.getters['orderItems']
        const total_amount = this.$store.getters['invoiceAmount']
        // TODO membuat/menyimpan order terlebih dahulu
        var today = new Date();
        var sec = Math.floor( today / 1000 ); // invoice number generator
        const order = {
          trx_date: today,
          invoice_number: 'INV' + sec,
          invoice_amount: total_amount
        }
        let resOrder = await this.$axios.post('/items/orders', order)
        // console.log(resOrder.data)
        const record = resOrder.data.data
        // TODO menyimpan order details
        data.forEach(async element => {
          const item = {
            quantity: element.quantity,
            total_price: element.total,
            order: record.id,
            product: element.id
          }
          let resDetail = await this.$axios.post('/items/order_details', item)
          // console.log(resDetail.data.data)
          alert("Pesanan sudah dibuat")
        });
      } catch(e) {
        console.log(e)
      }
    }
  }
};
</script>
