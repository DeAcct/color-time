<script lang="ts">
  export let color: string;
  function onDelete() {}
</script>

<li class="hex-theme-item">
  <i
    class="hex-theme-item__thumb"
    style="background-color:{color}"
    role="presentation"
  />
  <span class="hex-theme-item__value">
    {color}
  </span>
</li>

<style lang="scss">
  .hex-theme-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    background-color: var(--top-item);
    box-shadow: 0 1px 4px var(--depth-100);
    border-radius: 0.75rem;
    &__thumb {
      display: flex;
      width: 5rem;
      height: 5rem;
      border-radius: 0.375rem;
    }
    &__value {
      color: var(--text-900);
      font-size: 2rem;
      margin-left: 1rem;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
</style>
