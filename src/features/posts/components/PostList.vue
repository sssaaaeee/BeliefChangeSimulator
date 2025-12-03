<script setup>
import PostListItem from './PostListItem.vue';
// ダミーデータ
const posts = [{
    userName: 'User Name',
    userId: '@user_id',
    userImg: 'src/assets/user_icon.png',
    content: 'This is a sample post content.',
    like: 120,
    comment: 45,
    share: 30
  },
  {
    userName: 'Another User',
    userId: '@another_user',
    userImg: 'src/assets/user_icon.png',
    content: 'Another example of post content.',
    like: 85,
    comment: 20,
    share: 10
  },
  {
    userName: 'Third User',
    userId: '@third_user',
    userImg: 'src/assets/user_icon.png',
    content: 'Yet another post content example.',
    like: 200,
    comment: 60,
    share: 25
  },
  {
    userName: 'Fourth User',
    userId: '@fourth_user',
    userImg: 'src/assets/user_icon.png',
    content: 'More sample content for posts.',
    like: 150,
    comment: 35,
    share: 15
  },
  {
    userName: 'Fifth User',
    userId: '@fifth_user',
    userImg: 'src/assets/user_icon.png',
    content: 'Final example of post content.',
    like: 95,
    comment: 22,
    share: 8
  },
  {
    userName: 'Sixth User',
    userId: '@sixth_user',
    userImg: 'src/assets/user_icon.png',
    content: 'Last sample post content for testing.',
    like: 110,
    comment: 28,
    share: 12
  }];
</script>

<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.userId" :post="post" />
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
}
</style>
