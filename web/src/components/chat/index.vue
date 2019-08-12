<template lang="pug">
  .wrapper
    header
      .left(
          @click="$router.push({name: 'chat'})"
        )
        Icon(name="logo")
      .middle
        h3 {{ currentMember.firstname }} {{ currentMember.lastname }}
        p Messenger
      .right
        .username {{ adminMember.firstname }} {{ adminMember.lastname }}
          .avatar(
              @click="logout"
            )
            Icon(name="logout")

    main
      MemberList(
        @memberId="setMember"
      )
      .col
        .col-content
          MessagesList(
            :memberId="memberId"
          )

          .col-foot
            .compose
              input(
                v-model="text"
                placeholder="Type a message"
                @keyup.enter="submit"
                )

      .col-right
        .col-content
          .user-panel
            .avatar
              .avatar-image
                .status.online
                Icon(name="ava2")
              h3 {{ currentMember.firstname }} {{ currentMember.lastname }}
              p {{ currentMember.country }}

</template>

<script src="./index.ts" lang="ts"></script>
