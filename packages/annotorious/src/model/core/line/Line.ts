import type { Bounds, Geometry, Shape } from '../Shape';

export interface Line extends Shape {

  geometry: LineGeometry;

}

export interface LineGeometry extends Geometry {

  points: Array<Array<number>>;

  bounds: Bounds;
  
}