<template>

  <v-card v-if="purchase">

    <v-card-title>
      Purchase
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
      :items='purchase'
      :search='search'
    >
      <template slot='items' slot-scope='props'>
        <tr>
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.purchaseNo }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.purchaseNo'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>

          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.productId }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productId'
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
            > {{ props.item.purchaseItem }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.purchaseItem'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.quantity}}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.quantity'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.rate | currency}}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.rate'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.offer | currency}}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.offer'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{new Date(props.item.purchaseDate).getUTCDate() + '-' + (new
              Date(props.item.purchaseDate).getUTCMonth()+1) + '-' + new
              Date(props.item.purchaseDate).getUTCFullYear()}}

              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.purchaseDate"
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

  </v-card>
</template>
<script>
  import EditPurchase from './editPurchase.vue'

  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'purchase',
    components: {
      EditPurchase
    },
    created() {
      this.$store.dispatch('purchase/getPurchase')
      console.log('the store purchase   is', this.$store)
    },
    data() {
      return {
        dialog: false,
        purchaseDatePicker: false,
        search: '',
        pagination: {},
        headers: [
          {text: 'PurchaseNo', align: 'center', sortable: true, value: 'purchaseNo'},
          {text: 'ProductId', align: 'center', sortable: true, value: 'productId'},
          {text: 'CustomerName', align: 'center', sortable: true, value: 'customerName'},
          {text: 'PurchaseItem', align: 'center', sortable: true, value: 'purchaseItem'},
          {text: 'Quantity', align: 'center', sortable: true, value: 'quantity'},
          {text: 'Rate', align: 'center', sortable: true, value: 'rate'},
          {text: 'Offer', align: 'center', sortable: true, value: 'offer'},
          {text: 'PurchaseDate', align: 'center', sortable: true, value: 'purchaseDate'},
          {text: 'Action', align: 'center'}

        ],
        editedIndex: -1,
        // editedItem: {
        //   purchaseId: '',
        //   purchaseName: '',
        //   phoneNo: '',
        //   address: '',
        //   email: ''
        // },
      }
    },
    computed: {
      ...mapState('purchase',{
        purchase: state => state.purchase
      }),

      // ...mapGetters('purchase', {})
    },
    methods: {
      editItem(item) {
        // this.editedIndex = this.items.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.items.splice(item.index, 1, item)
        this.dialog = true
        console.log('updating  item', item)
        this.$store.dispatch('purchase/updatePurchase', item)

      },

      deleteItem(item) {
        // const index = this.items.indexOf(item)
        console.log('deleting  item', item)

        confirm('Are you sure you want to delete this item? ')  //&& this.items.splice(index, 1)
        this.$store.dispatch('purchase/deletePurchase', item)

      }


    }
  }
</script>
