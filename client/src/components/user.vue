<template>
  <div v-if="user">
    <v-toolbar flat color="white">
      <v-toolbar-title>User</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.first" label="first name"
                                :counter="10" required :rules="nameRules"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.last"
                                :counter="10" required :rules="nameRules"
                                label="last name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email"
                                required :rules="emailRules"
                                @change='checkEmpty($event, "email")'
                                label="email "></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.password"
                                v-bind:rules="passwordRules"
                                v-bind:type="'editedItem.password'" label="password "></v-text-field>
                </v-flex>
                <!--                  <v-flex xs12 sm6 md4>-->
                <!--                    <v-text-field v-model="editedItem.isActive" label="isactive "></v-text-field>-->
                <!--                  </v-flex>-->
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn :disabled =" editedItem.email == '' || (editedItem.first == '' || editedItem.last == '' || editedItem.password == '') " color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="user"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-edit-dialog lazy>
            {{ props.item._id }}
            <v-text-field
              slot='input'
              label='Edit'
              v-model='props.item._id'
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">
          {{ props.item.first }}
        </td>
        <td class="text-xs-right">{{ props.item.last }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.password }}</td>
        <td class="text-xs-right">{{ props.item.isActive }}</td>

        <td class="text-xs-right">{{new Date(props.item.createdOn).getUTCDate() + '-' + (new
          Date(props.item.createdOn).getUTCMonth()+1) + '-' + new
          Date(props.item.createdOn).getUTCFullYear()}}
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

      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>


<script>
  import EditCustomer from './EditCustomer.vue'

  import {mapState, mapGetters} from 'vuex'

  export default {
    created() {
      this.$store.dispatch('user/getUser')
      console.log('the store user   is', this.$store)
    },
    data() {
      return {
        dialog: false,
        search: '',
        clicked:[],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
          // v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required'
        ],
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        headers: [
          {
            text: 'id ',
            align: 'left',
            sortable: false,
            value: '_id'
          },
          {text: 'first', value: 'first'},
          {text: 'last ', value: 'last'},
          {text: 'email ', value: 'email'},
          {text: 'password ', value: 'password'},
          {text: 'isActive', value: 'isActive', sortable: false},
          {text: 'createdOn', value: 'createdOn', sortable: false},
          {text: 'Action', align: 'center'}

        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {

          first: '',
          last: '',
          email: '',
          password: ''
          // isActive:'',
          // createdOn: ''
        },
        defaultItem: {

          first: '',
          last: '',
          email: '',
          password: ''
          // isActive:'',
          // createdOn: ''
        }
      }
    },

    computed: {
      ...mapState('user', {
        user: state => state.user
      }),

      // ...mapGetters('customer', {})

      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },


         methods: {
           checkEmpty(value, field) {
             if (!value.trim().includes('@')|| !value.trim().includes('.com')) {
               this.editedItem[field] = '';
             }
           },
        editItem(item) {
          console.log('the index of', this.item)
          this.editedIndex = this.user.indexOf(item)
          this.editedItem = Object.assign({}, item)
          // this.items.splice(item.index, 1, item)
          this.dialog = true
        },

        deleteItem(item) {
          const index = this.user.indexOf(item)
          console.log('deleting  item', item)

          confirm('Are you sure you want to delete this item? ')  //&& this.items.splice(index, 1)
          this.$store.dispatch('user/deleteUser', item)

        },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
           Object.assign(this.user[this.editedIndex], this.editedItem)
          this.$store.dispatch('user/updateUser', this.editedItem)

        } else {
          console.log('Saving customer record:', this.editedItem)
          this.$store.dispatch('user/saveUser', this.editedItem)
          // this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

