<template>
  <div>
    <h1>Article's page</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Search..."
    >
    </my-input>
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Create post
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      >

      </my-select>
    </div>
    <!--    <my-button @click="fetchPosts">Get posts</my-button>-->

    <my-dialog
        v-model:show="dialogVisible"
    >
      <post-form
          @create="createPost"
      />
    </my-dialog>
    

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading.......</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--      <div class="page__wrapper">-->
    <!--        <div-->
    <!--            v-for="pageNumber in totalPage"-->
    <!--            :key="pageNumber"-->
    <!--            class="page"-->
    <!--            :class="{-->
    <!--              'current-page': page === pageNumber-->
    <!--            }"-->
    <!--            @click="changePage(pageNumber)"-->
    <!--        >-->
    <!--          {{ pageNumber }}-->
    <!--        </div>-->
    <!--      </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import axios from 'axios';
import MyInput from "@/components/UI/MyInput";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        {value: 'title', name: 'On the name'},
        {value: 'body', name: 'On the description'},
      ],
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber; Current Pagination
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = response.data;
        }, 1000);

      } catch (e) {
        alert('Error');
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data];
        }, );
      } catch (e) {
        alert('Error');
      }
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);


  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])   // SORTIROVKA
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue])   // SORTIROVKA
  //     })
  //   },
  // }
}
</script>

<style>
/*<style scoped>*/

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid blue;
}

.observer {
  height: 30px;
  background: blue;
}

</style>