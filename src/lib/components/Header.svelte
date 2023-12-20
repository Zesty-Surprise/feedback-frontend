<script>
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
      <a href="/auth/logout"> </a>
      <button class="inline-flex items-center">
        <img src="/images/User.svg" alt="Login" />
      </button>
      <ul class="dropdown-menu absolute hidden text-color-accent -left-14">
        <li class="">
          <a
            class="rounded-b bg-color-highlight hover:bg-color-hover py-2 px-4 block whitespace-no-wrap text-sm font-bold"
            href="/auth/logout">Log Out</a
          >
        </li>
      </ul>
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
