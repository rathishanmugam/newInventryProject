<template>
  <div>


    <v-content>
      <v-container fluid>
        <v-layout>
          <purchase></purchase>
        </v-layout>
      </v-container>
    </v-content>
    <editPurchase></editPurchase>
  </div>
</template>

<script>
  import purchase from './purchase.vue'
  import editPurchase from './editPurchase.vue'

  export default {
    name: 'purchaseDetail',
    components: {
      purchase,
      editPurchase

    },
    computed: {

      data: () => ({
        dialog: false,
      })
    }
  }
</script>
