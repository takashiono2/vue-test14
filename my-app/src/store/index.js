import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    lists: savedLists ? JSON.parse(savedLists): [
        {
          title: 'Backlog',
          cards: [
            { body: 'English' },
            { body: 'Mathematics' },
          ]
        },
        {
          title: 'Todo',
          cards: [
            { body: 'Science' }
          ]
        },
        {
          title: 'Doing',
          cards: []
        }
      ]
  },
  mutations: {
    addlist(state,payload){
      state.lists.push({
        title: payload.title,
        cards: []
      })
    },
    removelist(state,payload){
      state.lists.splice(payload.listIndex,1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].splice(payload.listIndex,1)//リストから削除
    },
  },
  actions: {
    addlist(context,payload){
      context.commit('addlist',payload)
    },
    removelist(context,payload){
      context.commit('removelist',payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})

store.subscribe((mutation, state) => { 
  localStorage.setItem('trello-lists',JSON.stringfy(state.lists))}
)

export default store
//mutationが全て終わったら、stateを受け取る。
//localStorageに保存するには、JSON形式の文字列型に変換する
//new Vuex.Storeをexportする

