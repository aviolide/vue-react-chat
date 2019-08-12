<template lang="pug">
  .limiter
    .container-login100
      .wrap-login100
        form.login100-form
          span.login100-form-title Welcome
          .wrap-input100.validate-input
            input(
              v-model="username"
              class="input100"
              placeholder="Username"
              )
            span.focus-input100

          .wrap-input100
            .validate-input
              input(
                v-model="firstname"
                class="input100"
                placeholder="First name"
                )
              span.focus-input100

          .wrap-input100
            .validate-input
              input(
                v-model="lastname"
                class="input100"
                placeholder="Last name"
              )
              span.focus-input100

          .wrap-input100
            .validate-input
              input(
                v-model="country"
                class="input100"
                placeholder="Country"
              )
              span.focus-input100

          .container-login100-form-btn
            button.login100-form-btn(
              @click="check()"
              ) Login


</template>
<script src="./auth.ts" lang="ts"></script>