<template>
  <div>
    <v-btn
      fab
      bottom
      right
      color="orange"
      dark
      fixed
      @click.stop="showEditCustomerDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          New Customer
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter customer Id"
                v-model="customer.customerId"
                :counter="3" required :rules="nameRules"

                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter Customer Name"
                v-model="customer.customerName"
                :counter="10" required :rules="nameRules"

                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter Customer Phone No"
                v-model="customer.phoneNo"
                type="number"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Enter Customer Address"
                v-model="customer.address"
                :counter="10" required :rules="nameRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="remove_circle"
                label="E-mail"
                v-model="customer.email"
                :rules="emailRules"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="saveCustomer">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditCustomer',
    data: () => ({
      dialog: false,
      customer: {
        customerId: '',
        customerName: '',
        phoneNo: '',
        email: ''
      },
      email: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    }),
    methods: {
      saveCustomer: function () {
        console.log('Saving customer record:', this.customer)
        this.$store.dispatch('customer/saveCustomer', this.customer)
        this.dialog = false
      },
      showEditCustomerDialog: function () {
        // this.transaction.transactionDate = this.getCurrentDate()
        this.dialog = true
      }

    }
  }
</script>

<style>

</style>
