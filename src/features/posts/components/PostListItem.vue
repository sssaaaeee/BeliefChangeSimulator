<script setup>
// 生成した投稿情報を取得して変数に入れる
console.log('PostListItem loaded')
// ダミーデータ
const post = {
  userName: 'User Name',
  userId: '@user_id',
  userImg: 'src/assets/user_icon.png',
  content: 'This is a sample post content.',
  like: 120,
  comment: 45,
  share: 30
}
</script>

<template>
  <div class="post-item">
    <!-- ユーザ情報 -->
    <div class="user-info">
      <!-- ユーザアイコン -->
      <img class="user-img" :src="post.userImg" alt="User Icon" />
      <!-- アカウント名・ID -->
      <div class="user-text">
        <div class="user-name">{{ post.userName }}</div>
        <div class="user-id">{{ post.userId }}</div>
      </div>
    </div>
    <!-- 投稿内容 -->
    <div class="post-content">
      {{ post.content }}
    </div>
    <!-- インプレッション -->
    <div class="post-actions">
      <div class="action">Like: {{ post.like }}</div>
      <div class="action">Comment: {{ post.comment }}</div>
      <div class="action">Share: {{ post.share }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
