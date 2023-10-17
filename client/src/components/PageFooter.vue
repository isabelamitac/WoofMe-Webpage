<template>
     <div class="footer">
          <img class="footer-logo" src="../assets/woofme-white.png">
          <p>© 2023 Woof Me</p>
    </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style>
  .footer {
    background-color: #4B6F6F;
    color: #ffffff;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 3rem 0 0 0;
    font-size: 0.6rem;
    line-height: 3rem;
    font-weight: 400;
    margin-top: 5%;
  }

  .footer-logo {
    max-width: 100%;
    width: 6rem;
  }
</style>
