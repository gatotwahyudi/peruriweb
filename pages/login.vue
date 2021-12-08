<template>
  <main class="flex-shrink-0 text-center">
    <div style="max-width: 330px; padding: 15px; margin: auto; width: 100%">
      <form @submit.prevent="userLogin" class="mb-3">
        <img
          class="mb-4"
          src="img/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating mb-2">
          <input
            v-model="login.email"
            type="email"
            class="form-control"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-2">
          <input
            v-model="login.password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3" style="display: none">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  layout: "base",
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        // alert("FORM DATA: " + JSON.stringify(this.login))
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
        // alert(JSON.stringify(response))
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>
