<template>

  <v-card  v-if="customer">

    <v-card-title>
      Customer
      <v-spacer></v-spacer>
      <v-text-field
        append-icon='search'
        label='Search'
        single-line
        hide-details
        v-model='search'
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers='headers'
      :items='customer'
      :search='search'
    >
      <template slot='items' slot-scope='props'>
        <tr>
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.customerId }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.customerId'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>

          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.customerName }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.customerName'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.phoneNo }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.phoneNo'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.address }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.address'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.email}}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.email'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              save
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>


      <v-alert slot='no-results' :value='true' color='error' icon='warning'>
        Your search for '{{ search }}' found no results.
      </v-alert>
    </v-data-table>
    <v-content>
      <v-container>
        <v-layout>
          <EditCustomer></EditCustomer>
        </v-layout>
      </v-container>
    </v-content>
  </v-card>
</template>
<script>
  import EditCustomer from './EditCustomer.vue'

  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'customer',
    components: {
      EditCustomer
    },
    created() {
      this.$store.dispatch('customer/getCustomer')
      console.log('the store customer   is', this.$store)
    },
    data() {
      return {
        dialog: false,
        search: '',
        pagination: {},
        headers: [
          {text: 'CustomerId', align: 'center', sortable: true, value: 'customerId'},
          {text: 'CustomerName', align: 'center', sortable: true, value: 'customerName'},
          {text: 'PhoneNo', align: 'center', sortable: true, value: 'phoneNo'},
          {text: 'Address', align: 'center', sortable: true, value: 'address'},
          {text: 'Email', align: 'center', sortable: true, value: 'email'},
          {text: 'Action', align: 'center'}

        ],
        editedIndex: -1,
        editedItem: {
          customerId: '',
          customerName: '',
          phoneNo: '',
          address: '',
          email: ''
        },
      }
    },
    computed: {
      ...mapState('customer',{
        customer: state => state.customer
      }),

      // ...mapGetters('customer', {})
    },
    methods: {
      editItem(item) {
        // this.editedIndex = this.items.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.items.splice(item.index, 1, item)
        this.dialog = true
        console.log('updating  item', item)
        this.$store.dispatch('user/updateCustomer', item)

      },

      deleteItem(item) {
        // const index = this.items.indexOf(item)
        console.log('deleting  item', item)

        confirm('Are you sure you want to delete this item? ')  //&& this.items.splice(index, 1)
        this.$store.dispatch('user/deleteCustomer', item)

      }


    }
  }
</script>
