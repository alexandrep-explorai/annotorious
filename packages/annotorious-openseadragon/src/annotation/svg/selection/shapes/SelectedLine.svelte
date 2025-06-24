<script lang="ts">
  import type { ImageAnnotation, LineGeometry } from '@annotorious/annotorious';

  export let annotation: ImageAnnotation;

  $: geom = annotation.target.selector.geometry as LineGeometry;
</script>

<polyline points={geom.points.map(xy => xy.join(',')).join(' ')} />