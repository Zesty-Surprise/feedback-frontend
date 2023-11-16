<script>
  import 'iconify-icon'
</script>

<div class="header__container border-b-2 border-[#E6E8E8]">
    <div class="header__manager">
        <div class="header__left-logo-wrapper">
            <img src="/src/images/logo-small.svg" alt="Your Surprise"/>
        </div>
        <div class="header__survey-manager">
            Survey Manager
        </div>
    </div>
    <div class="header__logo">
        <a href="/">
            <img src="/src/images/logo.svg" alt="Your Surprise"/>
        </a>
    </div>
    <div class="header__login">
        <a href="/">
            <img src="/src/images/User.svg" alt="Login"/>
        </a>
    </div>  
</div>

<style>
    .header__container {
    align-items: center;
    background-color: #FCF8F4;
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
    gap: 8px;
}

.header__left-logo {
    height: 32px;
    width: 32px;
}
</style>