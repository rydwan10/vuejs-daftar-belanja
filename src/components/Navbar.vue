<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-1">
    <img class="navbar-brand d-inline-block align-top" width="40px" height src="../assets/logo.png" />
    <a class="navbar-brand" href="#">Vue Kasir</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active px-1 py-1">
          <a class="btn btn-sm nav-link" href="#">Vue Router</a>
        </li>
        <li class="nav-item active px-1 py-1">
          <a class="btn btn-sm nav-link" href="#">Vue Router</a>
        </li>
        <li class="nav-item active px-1 py-1">
          <a class="btn btn-sm nav-link" href="#">Vue Router</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
nav {
  /* background: linear-gradient(90deg, rgba(71,112,255,1) 5%, rgba(91,158,96,1) 85%) !important; */
  background: linear-gradient(
    90deg,
    rgba(71, 180, 255, 1) 5%,
    rgba(101, 241, 111, 1) 85%
  ) !important;
}
ul > li > a {
  font-family: Arial, Helvetica, sans-serif;
  background: rgba(9, 156, 209, 0.877) !important;
  /* border-radius: 30px; */
}

@media (max-width: 995px) {
  ul {
    align-items: center;
  }
  ul > li {
    width: 90%;
  }
}
</style>