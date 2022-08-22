import axios from "axios";


export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])   // SORTIROVKA
            )
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                    commit('setPosts', response.data);
                }, 1000);

            } catch (e) {
                alert('Error');
            } finally {
                commit('setLoading', false);
            }
        },

        async loadMorePosts({state, commit}) {
            try {
                state.page += 1;
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                    commit('setPosts', [...state.posts, ...response.data]);
                }, );
            } catch (e) {
                alert('Error');
            }
        },
    },
    namespaced: true, //для получение конкретного геттера или мутации и т.д указываем конкретно модуль какой в хранилище
}