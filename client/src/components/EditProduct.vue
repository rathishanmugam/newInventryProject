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
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                prepend-icon="credit_card"
                placeholder="Select product Id"
                v-bind:items="productname"
                v-model="product.productName"
                single-line
                bottom
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter product Model"
                v-model="product.productModel"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="select product Offer"
                v-model="product.productOffer"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="remove_circle"
                label="cost"
                v-model.number="product.cost"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="stock"
                v-model.number="product.stock"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="sold"
                v-model.number="product.sold"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="balance"
                v-model.number="product.balance"
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
