<script lang="ts">
  import type { DrawingStyleExpression } from '@annotorious/core';
  import type { Geometry, LineGeometry, ImageAnnotation } from '../../model';
  import { computeStyle } from '../utils/styling';

  /** Props */
  export let annotation: ImageAnnotation;
  export let geom: Geometry;
  export let style: DrawingStyleExpression<ImageAnnotation> | undefined;

  $: computedStyle = computeStyle(annotation, style);

  const { points } = geom as LineGeometry;
</script>

<g class="a9s-annotation" data-id={annotation.id}>
  <polyline
    class="a9s-outer"
    style={computedStyle ? 'display:none;' : undefined}
    points={points.map(xy => xy.join(',')).join(' ')} />

  <polyline
    class="a9s-inner"
    style={computedStyle}
    points={points.map(xy => xy.join(',')).join(' ')} />
</g>
