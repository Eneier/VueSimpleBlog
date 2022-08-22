<template>
  <div>

    <h1>Article's page</h1>
    <my-input
        :model="searchQuery"
        @update:model-value="SetSearchQuery"
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
          :model="selectedSort"
          @update:model-value="setSelectedSort"
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
<!--          <div class="page__wrapper">-->
<!--            <div-->
<!--                v-for="pageNumber in totalPage"-->
<!--                :key="pageNumber"-->
<!--                class="page"-->
<!--                :class="{-->
<!--                  'current-page': page === pageNumber-->
<!--                }"-->
<!--                @click="changePage(pageNumber)"-->
<!--            >-->
<!--              {{ pageNumber }}-->
<!--            </div>-->
<!--          </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import axios from "axios";
import MyInput from "@/components/UI/MyInput";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex"
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
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      SetSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  watch: {

  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPage: state => state.post.totalPage,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
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