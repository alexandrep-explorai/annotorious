<script lang="ts">
  import { isTouch } from '../utils';

  /** props **/
  export let x: number;
  export let y: number;
  export let scale: number;
  export let selected: Boolean | undefined = undefined;

  let touched = false;

  const onPointerDown = (evt: PointerEvent) => {
    if (evt.pointerType === 'touch')
      touched = true;
  }

  const onPointerUp = () =>
    touched = false;

  $: handleRadius = 4 / scale;
</script>

{#if isTouch}
  <g class="a9s-touch-handle">
    <circle 
      cx={x} 
      cy={y} 
      r={handleRadius * 10}
      class="a9s-touch-halo"
      class:touched={touched} />
   
    <circle 
      cx={x} 
      cy={y} 
      r={handleRadius + 10 / scale}
      class="a9s-handle-buffer"
      on:pointerdown
      on:pointerup
      on:pointerdown={onPointerDown} 
      on:pointerup={onPointerUp} /> 

    <circle 
      class="a9s-handle-dot"
      cx={x}
      cy={y}
      r={handleRadius + 2 / scale} />
  </g>
{:else}
  <g class={`a9s-handle ${$$props.class || ''}`.trim()}>
    <circle 
      class="a9s-handle-buffer"
      cx={x}
      cy={y}
      r={handleRadius + (6 / scale)} 
      on:pointerenter
      on:pointerleave
      on:pointerdown
      on:pointerdown={onPointerDown}
      on:pointerup
      on:pointerup={onPointerUp} />

    {#if selected}
      <circle 
        class="a9s-handle-selected"
        cx={x} 
        cy={y} 
        r={handleRadius + (8 / scale)} />
    {/if}

    <circle 
      class={`a9s-handle-dot${selected ? ' selected': ''}`}
      cx={x}
      cy={y}
      r={handleRadius} />
  </g>
{/if}