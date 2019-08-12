<template lang="pug">
  .col-left
    .col-content
      .messages(v-for="member in list")
        li(@click="$emit('memberId', member.id)")
          .avatar
            .avatar-image
              Icon(name="ava2")
              .status.online
            h3 {{member.firstname}} {{member.lastname}}
            p Be there soon.
</template>
<script src="./list.ts" lang="ts"></script>