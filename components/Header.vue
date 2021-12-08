<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div
        class="
          d-flex
          flex-wrap
          align-items-center
          justify-content-center justify-content-lg-start
        "
      >
        <a class="navbar-brand" href="#">
          <img src="img/bootstrap-logo.svg" alt="" width="30" height="24" />
        </a>
        <ul
          class="
            nav
            col-12 col-lg-auto
            me-lg-auto
            mb-2
            justify-content-center
            mb-md-0
          "
        >
          <li>
            <nuxt-link to="/" class="nav-link px-2 link-secondary"
              >Home</nuxt-link
            >
          </li>
          <li><a href="#" class="nav-link px-2 link-dark">Categories</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div v-if="this.$auth === undefined || this.$auth.loggedIn === false" class="text-end">
          <nuxt-link to="/login" class="btn btn-light text-dark me-2">
            Login
          </nuxt-link>
          <button type="button" class="btn btn-primary">Sign-up</button>
        </div>

        <nuxt-link v-if="this.$auth !== undefined && this.$auth.loggedIn === true" to="/payment" class="nav-link">
            My Cart
        </nuxt-link>
        <div v-if="this.$auth !== undefined && this.$auth.loggedIn === true" class="dropdown text-end">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :title="this.$auth.user.first_name + ' ' + this.$auth.user.last_name"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <button class="dropdown-item" @click="logout">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    async logout () {
      try {
        await this.$auth.logout({
          data: { refresh_token: this.$auth.strategy.refreshToken.get() }
        });
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
