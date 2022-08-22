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

      />
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading.......</div>

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
import {ref} from 'vue';
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        {value: 'title', name: 'On the name'},
        {value: 'body', name: 'On the description'},
      ],
    }
  },
  setup: function (props) {
    const {posts, totalPage, isPostsLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPage,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
  }
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