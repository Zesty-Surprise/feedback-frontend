<script>
  import { goto } from "$app/navigation";
  import "iconify-icon";
</script>

<div class="header__container border-b-2 border-[#E6E8E8]">
  <a href="/" class="header__manager">
    <div class="w-6">
      <img src="/images/logo-small.svg" alt="Your Surprise" />
    </div>
    <div class="text-sm">Survey Manager</div>
  </a>
  <div class="header__logo">
    <a href="/dashboard">
      <img src="/images/logo.svg" alt="Your Surprise" />
    </a>
  </div>
  <div class="header__login">
    <div class="dropdown inline-block relative">
      <button
        class="inline-flex items-center"
        on:click={() => goto("/auth/logout")}
      >
        <iconify-icon
          icon="uil:exit"
          height="30"
          width="30"
          class="mt-1 text-color-black hover:text-color-accent"
        />
      </button>
    </div>
  </div>
</div>

<style>
  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .header__container {
    align-items: center;
    background-color: #fcf8f4;
    color: black;
    display: flex;
    height: fit-content;
    justify-content: space-between;
    padding: 8px 24px;
    width: 100%;
  }

  .header__manager {
    align-items: center;
    display: flex;
    gap: 14px;
  }

  .header__logo {
    width: 250px;
  }

  .header__login {
    width: 35px;
  }
</style>
