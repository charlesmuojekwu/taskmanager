<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Bucket List</h1>
    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" class="input" v-model="description" placeholder="Go to Mars" required  />
      </div>
      <div class="control">
          <button class="button is-info" @click="addItem" :disabled="!description" >Add</button>
        </div>
    </div>

    <div class="notification" v-for="(item, i) in items" :key="item._id"> 
      <div class="columns">
        <input type="text" class="column input" v-if="isSelected(item)" v-model="editDescription"> 
        <p v-else class="column">
          <span class="tag is-primary"> {{ i+1}} </span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
            <span class="icon has-text-primary" @click="isSelected(item) ? unselect() : select(item) ">
              <i class="material-icons"> {{isSelected(item) ? 'close' : 'edit'}} </i>
            </span>

            <span class="icon has-text-info" @click="isSelected(item) ? updateItem(item,i) : removeItem(item,i)">
              <i class="material-icons">{{isSelected(item) ? 'save' : 'delete'}}</i>
            </span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'App',
  data() {
    return {
      items : [],
      description : "",
      editDescription : "",
      selected : {}
    }
  },
  async mounted(){
    const response = await axios.get("http://localhost:5000/api/bucketList/");
    this.items=response.data
  },

  methods : {
    async addItem() {
      const response = await axios.post("http://localhost:5000/api/bucketList/",{
        description:this.description
        })
      this.items.push(response.data)
      this.description = ""
    },

    async removeItem(item,i){
      await axios.delete("http://localhost:5000/api/bucketList/" + item._id)
      this.items.splice(i,1);
    },

    select(item){
      this.selected = item;
      this.editDescription = item.description
    },

    isSelected(item){
      return item._id == this.selected._id
    },

    unselect(){
      this.selected = {},
      this.editDescription = ""
    },

    async updateItem(item,i) {
      const response = await axios.put("http://localhost:5000/api/bucketList/" + item._id,{
        description:this.editDescription
        });
      this.items[i] = response.data
      this.unselect();
    }
  }
}
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
