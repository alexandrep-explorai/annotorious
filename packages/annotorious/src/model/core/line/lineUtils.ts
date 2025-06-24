import { ShapeType } from '../Shape';
import { distance, registerShapeUtil, type ShapeUtil } from '../shapeUtils';
import type { Line } from './Line';

const LineUtil: ShapeUtil<Line> = {

  area: (_: Line): number => 0,

  intersects: (l: Line, x: number, y: number, buffer: number = 2): boolean => {
    // See https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
    const points = l.geometry.points;
    let minimumDistance = Infinity;

    // Get minimum distance to any segments in the line
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];

      // Twice the area of the triangle formed by connecting the three points
      const segmentArea = Math.abs(((y2 - y1) * x) - ((x2 - x1) * y) + (x2 * y1) - (y2 * x1));
    
      const segmentLength = distance([x1, y1], [x2, y2]);

      minimumDistance = Math.min(minimumDistance, segmentArea / segmentLength);
    }

    return minimumDistance <= buffer;
  }
  
};

registerShapeUtil(ShapeType.LINE, LineUtil);