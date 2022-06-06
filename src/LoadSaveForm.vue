<template>
<v-dialog v-model="show" max-width="500px">
  <v-card>
    <v-text-field label="not implemented yet"
                  required></v-text-field>

    <v-card-actions>
      <v-btn color="primary" text @click.stop="show=false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
//import { getAParameters } from './RobotData';

export default {
  props: {
     value: Boolean
  },
  computed: {
    test: {
      get() {
          return "dummy";
//        return getAParameters();
      }
    },
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
}
</script>
