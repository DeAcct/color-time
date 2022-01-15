<script lang="ts">
  export let show: boolean;
</script>

<div class="toast {show ? 'toast--show' : ''}">
  <slot name="text" />
</div>

<style lang="scss">
  .toast {
    position: fixed;
    z-index: 100;
    bottom: 0;
    transform: translateY(-3rem);
    padding: 1rem 1.5rem;
    border-radius: 5rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1.2rem;
    opacity: 0;
    transition: 150ms ease-out;
    &--show {
      opacity: 1;
      transform: translateY(-5rem);
    }
  }
  @media screen and (min-width: 1024px) {
    .toast {
      background-color: var(--depth-800);
      color: var(--text-900);
      font-size: 1.5rem;
    }
  }
</style>
