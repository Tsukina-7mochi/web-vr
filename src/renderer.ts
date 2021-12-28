import type { coord, rotation, line } from './types';

// 座標をワールド座標系からカメラ座標系に変換
const transformToCamCoord = (coord: coord, cameraCoord: coord, cameraRotation: rotation): coord => {
  const cosX = Math.cos(cameraRotation.x);
  const sinX = Math.sin(cameraRotation.x);
  const cosY = Math.cos(cameraRotation.y);
  const sinY = Math.sin(cameraRotation.y);
  const cosZ = Math.cos(cameraRotation.z);
  const sinZ = Math.sin(cameraRotation.z);

  // カメラ座標の逆向きに並進
  const transformed = {
    x: coord.x - cameraCoord.x * coord.c,
    y: coord.y - cameraCoord.y * coord.c,
    z: coord.z - cameraCoord.z * coord.c,
    c: coord.c
  };

  // x軸の周りにカメラの回転と逆向きに回転
  transformed.y =   cosX * transformed.y + sinX * transformed.z;
  transformed.z = - sinX * transformed.y + cosX * transformed.z;

  // y軸
  transformed.x =   cosY * transformed.x - sinY * transformed.z;
  transformed.z =   sinY * transformed.x + cosY * transformed.z;

  // z軸
  transformed.x =   cosZ * transformed.x + sinZ * transformed.y;
  transformed.y = - sinZ * transformed.x + cosZ * transformed.y;

  return transformed;
}

// カメラ座標をスクリーンに投影
const projectCoord = (coord: coord, focusDistance: number): coord => ({
  x: focusDistance * coord.x,
  y: focusDistance * coord.y,
  z: 0,
  c: coord.z,
});

// 直線と平面z=0との交点を計算
const calculateBoundaryIntersectionZ = (p1: coord, p2: coord): coord | null => {
  if(p1.c == 0 && p2.c == 0) {
    // 両方無限遠点
    return null;
  } else if(p1.c == 0) {
    // p1が無限遠点
    const t = - p2.z / p1.z;

    return {
      x: p2.x + p1.x * t,
      y: p2.y + p1.y * t,
      z: p2.z + p1.z * t,
      c: p2.c
    };
  } else if(p2.c == 0) {
    // p2が無限遠点
    const t = - p1.z / p2.z;

    return {
      x: p1.x + p2.x * t,
      y: p1.y + p2.y * t,
      z: p1.z + p2.z * t,
      c: p1.c
    };
  }

  const t = p2.z / (p2.z - p1.z * p1.c / p2.c);

  return {
    x: p1.x * t + p2.x * (1 - t),
    y: p1.y * t + p2.y * (1 - t),
    z: 0,
    c: p1.c * t + p2.c * (1 - t),
  }
};

class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  camera: {
    coord: coord,
    rotation: rotation,
    focusDistance: number,
  };
  screen: {
    width: number,
    height: number,
    // 斉次座標を無限遠とみなすときの、第4要素の絶対値のしきい値
    infiniteDividerThreshold: number;
  };

  constructor(rootElement: HTMLElement, width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', width + 'px');
    this.canvas.setAttribute('height', height + 'px');

    const ctx = this.canvas.getContext('2d');
    if(!ctx) {
      throw Error('Cannot get context of canvas');
    }
    this.ctx = ctx;

    this.camera = {
      coord: {
        x: 0,
        y: 0,
        z: 0,
        c: 1,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      focusDistance: -1,
    }

    this.screen = {
      width,
      height,
      infiniteDividerThreshold: 1 / (width + height),
    }

    rootElement.appendChild(this.canvas);
  }

  render(objects: line[], overwrite?: boolean): void {
    const ctx = this.ctx;

    if(!overwrite) {
      ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    }

    // 座標系を並進
    ctx.setTransform(1, 0, 0, -1, this.screen.width / 2, this.screen.height / 2);

    console.log('cam: ', this.camera);

    for(const obj of objects) {
      console.log(obj);

      if(obj.type === 'line') {
        ctx.strokeStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
        ctx.lineWidth = obj.width;

        let startCamCoord = transformToCamCoord(obj.start, this.camera.coord, this.camera.rotation);
        let endCamCoord   = transformToCamCoord(obj.end,   this.camera.coord, this.camera.rotation);

        console.log('transformed: ', startCamCoord, endCamCoord);

        if(startCamCoord.c < 0) {
          startCamCoord.x *= -1;
          startCamCoord.y *= -1;
          startCamCoord.z *= -1;
          startCamCoord.z *= -1;
        }
        if(endCamCoord.c < 0) {
          endCamCoord.x *= -1;
          endCamCoord.y *= -1;
          endCamCoord.z *= -1;
          endCamCoord.z *= -1;
        }

        if(startCamCoord.z <= 0 && endCamCoord.z <= 0) {
          // 両方の点が描画範囲外
          continue;
        } else if(startCamCoord.z <= 0) {
          // 始点が描画範囲外
          const bndCoord = calculateBoundaryIntersectionZ(startCamCoord, endCamCoord);
          if(bndCoord === null) continue;

          startCamCoord = bndCoord;
        } else if(endCamCoord.z <= 0) {
          // 終点が描画範囲外
          const bndCoord = calculateBoundaryIntersectionZ(startCamCoord, endCamCoord);
          if(bndCoord === null) continue;

          endCamCoord = bndCoord;
        }

        console.log('intersected: ', startCamCoord, endCamCoord);

        const projectedStart = projectCoord(startCamCoord, this.camera.focusDistance);
        const projectedEnd = projectCoord(endCamCoord, this.camera.focusDistance);

        console.log('projected: ', projectedStart, projectedEnd);

        // 斉次座標をユークリッド座標に変換
        // スクリーン上の点が無限遠とみなされるとき、その向きのスクリーン外の有限座標の点に変更
        const start = { x: 0, y: 0 };
        if(Math.abs(projectedStart.c) < this.screen.infiniteDividerThreshold) {
          start.x = projectedStart.x * (this.screen.width + this.screen.height);
          start.y = projectedStart.y * (this.screen.width + this.screen.height);
        } else {
          start.x = projectedStart.x / projectedStart.c;
          start.y = projectedStart.y / projectedStart.c;
        }

        const end = { x: 0, y: 0 };
        if(Math.abs(projectedEnd.c) < this.screen.infiniteDividerThreshold) {
          end.x = projectedEnd.x * (this.screen.width + this.screen.height);
          end.y = projectedEnd.y * (this.screen.width + this.screen.height);
        } else {
          end.x = projectedEnd.x / projectedEnd.c;
          end.y = projectedEnd.y / projectedEnd.c;
        }

        console.log('screen: ', start, end);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    }

    // 座標系の並進をもとに戻す
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Renderer;