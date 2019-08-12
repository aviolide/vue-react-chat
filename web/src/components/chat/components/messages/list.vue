<template lang="pug">
  section
    .message
      .grid-message
        .div(v-for="message in list")
          .col-message-received(
              v-if="!message.isSent"
              )
            .message-received
              p {{ message.text }}

          .col-message-sent(v-else)
            .message-sent
              p {{ message.text }}
</template>
<script src="./list.ts" lang="ts"></script>