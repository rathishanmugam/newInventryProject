<template>
  <div>
    <v-btn
      fab
      bottom
      right
      color="orange"
      dark
      fixed
      @click.stop="showEditTransactionDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          New Purchase
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-menu
                ref="datePicker"
                lazy
                :close-on-content-click="false"
                v-model="purchaseDatePicker"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Select Purchase Date"
                  v-model="purchase.purchaseDate"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="purchase.purchaseDate"
                  v-on:input="$refs.datePicker.save(purchase.purchaseDate)"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="purchase No"
                v-model="purchase.purchaseNo"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Product Id"
                v-model="purchase.productId"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Customer Name"
                v-model="purchase.customerName"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Purchase Item"
                v-model="purchase.purchaseItem"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="remove_circle"
                label="quantity"
                v-model="purchase.quantity"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="add_circle"
                label="rate "
                v-model="purchase.rate"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="message"
                label="offer"
                v-model="purchase.offer"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="saveTransaction">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditTransaction',
    data: () => ({
      dialog: false,
      purchase: {
        purchaseNo: null,
        purchaseDate: null,
        productId: null,
        purchaseItem: '',
        customerName: '',
        rate: 0.0,
        offer: 0.0,
        quantity: 0
      },
      purchaseTypes: [
        {text: 'Credit Card', value: 'Credit Card'},
        {text: 'Debit Card', value: 'Debit Card'},
        {text: 'Check', value: 'Check'},
        {text: 'Deposit', value: 'Deposit'}
      ],
      purchaseDatePicker: false
    }),
    methods: {
      saveTransaction: function () {
        console.log('Saving purchase record:', this.purchase)
        this.$store.dispatch('purchase/savePurchase', this.purchase)

        this.dialog = false
      },
      showEditTransactionDialog: function () {
        this.purchase.purchaseDate = this.getCurrentDate()
        this.dialog = true
      },
      getCurrentDate: function () {
        const dt = new Date(Date.now())
        let month = '' + (dt.getMonth() + 1)
        let day = '' + dt.getDate()
        let year = dt.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      }
    }
  }
</script>

<style>

</style>

