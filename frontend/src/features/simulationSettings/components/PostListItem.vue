<script setup>
// 生成した投稿情報を取得して変数に入れる
console.log('PostListItem loaded')
// ダミーデータ
const props = defineProps({
  // 投稿データ
  post: {
    userName: String,
    userId: String,
    userImg: String,
    content: String,
    like: Number,
    comment: Number,
    share: Number
  }
})
</script>

<template>
  <div class="post-item">
    <!-- ユーザ情報 -->
    <div class="user-info">
      <!-- ユーザアイコン -->
      <img class="user-img" :src="post.userImg" alt="User Icon" />
      <!-- アカウント名・ID -->
      <div class="user-text">
        <div class="user-name">{{ props.post.userName }}</div>
        <div class="user-id">{{ props.post.userId }}</div>
      </div>
    </div>
    <!-- 投稿内容 -->
    <div class="post-content">
      {{ props.post.content }}
    </div>
    <!-- インプレッション -->
    <div class="post-actions">
      <div class="action">Like: {{ props.post.like }}</div>
      <div class="action">Comment: {{ props.post.comment }}</div>
      <div class="action">Share: {{ props.post.share }}</div>
    </div>
  </div>
</template>

<style scoped>
.post-item {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}
.user-info {
  display: flex;
  align-items: left;
  margin-bottom: 8px;
}
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}
.user-text {
  display: flex;
  align-items: left;
  flex-direction: column;
}
.user-name {
  font-weight: bold;
  font-size: 16px;
}
.user-id {
  color: gray;
  font-size: 14px;
}
.post-content {
  margin-bottom: 12px;
  font-size: 15px;
}
.post-actions {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
}
.action {
  font-size: 14px;
  color: #555;
}
</style>
