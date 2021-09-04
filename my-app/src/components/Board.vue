<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <div class="list-index">
        <list v-for="(item, index) in lists"
              :key="item.id"
              :title="item.title"
              :cards="item.cards"
              :listIndex="index"
        />
        <ListAdd/> 
      </div>
    </main>
  </div>
</template>

<script>
import ListAdd from './ListAdd.vue'
import List from './List'
import { mapState } from 'vuex'

export default {
  components: {
    ListAdd,
    List,//Listへ送っている
  },
  // computed: {
  //   lists : function(){
  //     return this.$store.state.lists
  //   }
  // }
  computed: {
    ...mapState(['lists']),
    
    totalCardCount() {
      return this.$store.getters.totalCardCount//gettersで計算処理
    }
  }
}
</script>