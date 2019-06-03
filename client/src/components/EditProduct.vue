<template>
  <div>
    <v-btn
      fab
      bottom
      right
      color="orange"
      dark
      fixed
      @click.stop="showProductDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          New Product
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter product Id"
                v-model.number="product.productId"
                :counter="3" required :rules="nameRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                prepend-icon="credit_card"
                placeholder="Select product Id"
                v-bind:items="productname"
                :rules="[(v) => !!v || 'Product Name is required']"
                required
                v-model="product.productName"
                single-line
                bottom
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter product Model"
                :counter="3" required :rules="nameRules"

                v-model="product.productModel"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="select product Offer"
                v-model="product.productOffer"
                :counter="3" required :rules="nameRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="remove_circle"
                label="cost"
                v-model.number="product.cost"
                type="number"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="stock"
                v-model.number="product.stock"
                type="number"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="sold"
                v-model.number="product.sold"
                type="number"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="balance"
                v-model.number="product.balance"
                type="number"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="saveProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditProduct',
    data: () => ({
      dialog: false,
      product: {
        productId: '',
        productName: '',
        productModel: '',
        productOffer: '',
        cost: 0.0,
        stock: 0,
        sold: 0,
        balance: 0
      },
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
      ],
      productname: [
        {text: 'LG', value: 'LG'},
        {text: 'Sony', value: 'Sony'},
        {text: 'Viedocon', value: 'Viedocon'},
        {text: 'Samsang', value: 'Samgsang'}
      ],
      transactionDatePicker: false
    }),
    methods: {
      saveProduct: function () {
        console.log('Saving product record:', this.product)
        this.$store.dispatch('product/saveProduct', this.product)
        this.dialog = false
      },
      showProductDialog: function () {
        this.dialog = true
      }
    }
  }
</script>

<style>

</style>
