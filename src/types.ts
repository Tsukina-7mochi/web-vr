/** 右手座標系の斉次座標 */
interface coord {
  x: number,
  y: number,
  z: number,
  c: number,
}

/** 各軸について反時計回りの回転(rad) */
interface rotation {
  x: number,
  y: number,
  z: number,
}

type rotMatrix = [[number, number, number], [number, number, number], [number, number, number]];

interface color {
  r: number,
  g: number,
  b: number,
  a: number,
}

interface line {
  type: 'line',

  start: coord,
  end: coord,

  color: color,
  width: number,
}

export type {
  coord,
  rotation,
  color,
  line,
  rotMatrix,
}