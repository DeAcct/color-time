<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let state = false;
  function onChange() {
    console.log(state);
    dispatch("toggleChange", state);
  }
</script>

<label class="invert-toggle">
  <input
    type="checkbox"
    bind:checked={state}
    class="invert-toggle__skell"
    on:change={onChange}
  />
  <div class="invert-toggle__rail">
    <div class="invert-toggle__car">
      <span class="blind">
        {state ? "켜짐" : "꺼짐"}
      </span>
    </div>
  </div>
  <slot name="label" />
</label>
