import type { coord, rotation, line } from './types';

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

  /** 三次元斉次座標をカメラ状態に基づいて二次元斉次座標に変換(投影) */
  #projectCoord(coord: coord): coord {
    // カメラ座標の逆向きに並進
    const transformed = {
      x: coord.x - this.camera.coord.x * coord.c,
      y: coord.y - this.camera.coord.y * coord.c,
      z: coord.z - this.camera.coord.z * coord.c,
      c: coord.c
    };

    // x軸の周りにカメラの回転と逆向きに回転
    const cosX = Math.cos(this.camera.rotation.x);
    const sinX = Math.sin(this.camera.rotation.x);
    transformed.y =   cosX * transformed.y + sinX * transformed.z;
    transformed.z = - sinX * transformed.y + cosX * transformed.z;

    // y軸
    const cosY = Math.cos(this.camera.rotation.y);
    const sinY = Math.sin(this.camera.rotation.y);
    transformed.x =   cosY * transformed.x - sinY * transformed.z;
    transformed.z =   sinY * transformed.x + cosY * transformed.z;

    // z軸
    const cosZ = Math.cos(this.camera.rotation.z);
    const sinZ = Math.sin(this.camera.rotation.z);
    transformed.x =   cosZ * transformed.x + sinZ * transformed.y;
    transformed.y = - sinZ * transformed.x + cosZ * transformed.y;

    // 投影
    return {
      x: this.camera.focusDistance * transformed.x,
      y: this.camera.focusDistance * transformed.y,
      z: 0,
      c: transformed.z
    };
  }

  render(objects: line[]): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.screen.width, this.screen.height);

    // 座標系を並進
    ctx.setTransform(1, 0, 0, -1, this.screen.width / 2, this.screen.height / 2);

    for(const obj of objects) {
      console.log(obj);

      if(obj.type === 'line') {
        ctx.strokeStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
        ctx.lineWidth = obj.width;

        const projectedStart = this.#projectCoord(obj.start);
        const projectedEnd = this.#projectCoord(obj.end);

        console.log(projectedStart, projectedEnd);

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

        console.log(start, end);

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