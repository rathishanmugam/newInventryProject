<template>
  <v-card v-if="productItem">
    <v-card-title>
      Products

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
      :items='productItem'
      :search='search'
    >
      <template slot='items' slot-scope='props'>
        <tr>
          <!--        <tr @click='showAlert(props.item)'>-->
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.productId }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productId'
                :counter="3" required :rules="nameRules"

                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>

            <v-select

              v-bind:items='productname'
              v-model='props.item.productName'


              single-line
              bottom
            ></v-select>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.productModel }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productModel'
                :counter="3" required :rules="nameRules"

                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.productOffer }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productOffer'
                :counter="10" required :rules="nameRules"

                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.cost | currency }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model.number='props.item.cost'
                type="number"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.stock }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model.number='props.item.stock'
                type="number"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.sold | currency }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model.number='props.item.sold'
                type="number"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.balance | currency }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model.number='props.item.balance'
                type="number"
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
          <EditProduct></EditProduct>
        </v-layout>
      </v-container>
    </v-content>
  </v-card>

</template>
<script>
  import EditProduct from './EditProduct.vue'

  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'product',
    components: {
      EditProduct
    },
    created() {
      this.$store.dispatch('product/getCustomer')
      console.log('the store product   is', this.$store)
    },
    data() {
      return {
        dialog: false,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        search: '',
        pagination: {},
        headers: [
          {text: 'ProductId', align: 'center', sortable: true, value: 'productId'},
          {text: 'ProductName', align: 'center', sortable: true, value: 'productName'},
          {text: 'ProductModel', align: 'center', sortable: true, value: 'productModel'},
          {text: 'ProductOffer', align: 'center', sortable: true, value: 'productOffer'},
          {text: 'Cost', align: 'center', sortable: true, value: 'cost'},
          {text: 'Stock', align: 'center', sortable: true, value: 'stock'},
          {text: 'Sold', align: 'center', sortable: true, value: 'sold'},
          {text: 'Balance', align: 'center', sortable: true, value: 'balance'},
          {text: 'Action', align: 'center'}

        ],
        productname: [
          {text: 'LG', value: 'LG'},
          {text: 'Sony', value: 'Sony'},
          {text: 'Viedocon', value: 'Viedocon'},
          {text: 'Samsang', value: 'Samsang'}
        ]
      }
    },
    computed: {
      ...mapState('product',{
        productItem: state => state.product
      }),

      ...mapGetters('product', {})
    },
    methods: {

      editItem(item) {
        // this.editedIndex = this.items.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.items.splice(item.index, 1, item)
        console.log('updating item', item)

        this.dialog = true
        this.$store.dispatch('product/updateProduct', item)

      },

      deleteItem(item) {
        console.log('deleting item', item)

        // const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item? ') //&& this.items.splice(index, 1)
        this.$store.dispatch('product/deleteProduct', item)

      },

      showAlert(a) {
        if (event.target.classList.contains('btn__content')) return
        alert('Alert! \n' + a.productName)
      }
    }
  }
</script>
<!--{{ new Date(props.item.purchaseDate).getUTCMonth()+1) + '-' + new Date(props.item.purchaseDate).getUTCFullYear()}}</td>-->
