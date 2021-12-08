// Definisi properties yang dimiliki store
export const state = () => ({
    orderDetails: [], // menyimpan order detail
    totalAmount: 0 // total invoice amount
})

// Fungsi-fungsi pengambilan data di store yang diekspos ke luar
export const getters = {
    orderItems($state) {
        return $state.orderDetails
    },
    invoiceAmount($state) {
        return $state.totalAmount
    }
}

// Fungsi-fungsi untuk penanganan perubahan data di store yang tidak diekspos ke luar
export const mutations = {
    ADD_ITEM(state, obj) {
        state.orderDetails.push(obj)
        state.totalAmount += obj.total
    },
    CLEAR_ITEMS(state) {
        state.orderDetails = []
        state.totalAmount = 0
    }
}

// Fungsi-fungsi untuk penanganan aksi perubahan data di store yang diekspos ke luar
export const actions = {
    addOrderItem({ commit }, obj) {
        commit('ADD_ITEM', obj)
    },
    clearOrderItems({ commit }) {
        commit('CLEAR_ITEMS')
    }
}

