import './style.scss';
import { color, coord, line } from './types';
import Renderer from './renderer';
import { calculateRotMatrixFromEulerAngleZXY, calculateRotMatrixFromFixedAngleXYZ } from './rotationUtils';

const createCube = (centerPos: coord, edgeLength: number, color: color, width: number): line[] => {
  const len = edgeLength * centerPos.c / 2;

  return [
    {
      type: 'line',
      start: { x: centerPos.x - len, y: centerPos.y - len, z: centerPos.z - len, c: centerPos.c },
      end:   { x: centerPos.x + len, y: centerPos.y - len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x + len, y: centerPos.y - len, z: centerPos.z - len, c: centerPos.c },
      end:   { x: centerPos.x + len, y: centerPos.y + len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x + len, y: centerPos.y + len, z: centerPos.z - len, c: centerPos.c },
      end:   { x: centerPos.x - len, y: centerPos.y + len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x - len, y: centerPos.y + len, z: centerPos.z - len, c: centerPos.c },
      end:   { x: centerPos.x - len, y: centerPos.y - len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x - len, y: centerPos.y - len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x + len, y: centerPos.y - len, z: centerPos.z + len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x + len, y: centerPos.y - len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x + len, y: centerPos.y + len, z: centerPos.z + len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x + len, y: centerPos.y + len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x - len, y: centerPos.y + len, z: centerPos.z + len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x - len, y: centerPos.y + len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x - len, y: centerPos.y - len, z: centerPos.z + len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x - len, y: centerPos.y - len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x - len, y: centerPos.y - len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x + len, y: centerPos.y - len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x + len, y: centerPos.y - len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x + len, y: centerPos.y + len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x + len, y: centerPos.y + len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
    {
      type: 'line',
      start: { x: centerPos.x - len, y: centerPos.y + len, z: centerPos.z + len, c: centerPos.c },
      end:   { x: centerPos.x - len, y: centerPos.y + len, z: centerPos.z - len, c: centerPos.c },
      color,
      width
    },
  ]
}

const worldGrid: line[] = [
  {
    type: 'line',
    start: { x:  1, y: 0, z: 0, c: 0 },
    end:   { x:  0, y: 0, z: 0, c: 1 },
    color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
    width: 1,
  },
  {
    type: 'line',
    start: { x: -1, y: 0, z: 0, c: 0 },
    end:   { x:  0, y: 0, z: 0, c: 1 },
    color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
    width: 1,
  },
  {
    type: 'line',
    start: { x: 0, y: 0, z:  1, c: 0 },
    end:   { x: 0, y: 0, z:  0, c: 1 },
    color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
    width: 1,
  },
  {
    type: 'line',
    start: { x: 0, y: 0, z: -1, c: 0 },
    end:   { x: 0, y: 0, z:  0, c: 1 },
    color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
    width: 1,
  }
];

const cube = [
  ...createCube({ x: 0, y: 0, z: 50, c: 1 }, 10, { r: 0xFF, g: 0, b: 0, a: 1 }, 1),
  ...createCube({ x: 50, y: 0, z: 0, c: 1 }, 10, { r: 0, g: 0, b: 0xFF, a: 1 }, 1)
];

window.addEventListener('load', () => {
  const outputScreen = document.querySelector<HTMLDivElement>('div#screen');
  if(!outputScreen) {
    throw Error('no output element');
  }
  const renderer = new Renderer(outputScreen, 720, 480);

  console.log(worldGrid);
  console.log(cube);

  renderer.camera.coord.y = 10;
  renderer.camera.coord.z = 0;
  renderer.camera.focusDistance = 510;

  const render = function(): void {
    renderer.render(worldGrid);
    renderer.render(cube, true);
  }

  render();

  // DOMの設定
  const elCamX = document.querySelector<HTMLInputElement>('input#cam_x');
  const elCamY = document.querySelector<HTMLInputElement>('input#cam_y');
  const elCamZ = document.querySelector<HTMLInputElement>('input#cam_z');
  const elRotX = document.querySelector<HTMLInputElement>('input#rot_x');
  const elRotY = document.querySelector<HTMLInputElement>('input#rot_y');
  const elRotZ = document.querySelector<HTMLInputElement>('input#rot_z');

  if(elCamX === null) {
    throw Error('elCamX is null');
  }
  if(elCamY === null) {
    throw Error('elCamY is null');
  }
  if(elCamZ === null) {
    throw Error('elCamZ is null');
  }
  if(elRotX === null) {
    throw Error('elRotx is null');
  }
  if(elRotY === null) {
    throw Error('elRotY is null');
  }
  if(elRotZ === null) {
    throw Error('elRotZ is null');
  }

  elCamX.addEventListener('change', () => {
    renderer.camera.coord.x = parseFloat(elCamX.value);
    render();
  });
  elCamY.addEventListener('change', () => {
    renderer.camera.coord.y = parseFloat(elCamY.value);

    render();
  });
  elCamZ.addEventListener('change', () => {
    renderer.camera.coord.z = parseFloat(elCamZ.value);
    render();
  });
  elRotX.addEventListener('input', () => {
    renderer.camera.rotation = calculateRotMatrixFromFixedAngleXYZ({
      x: parseFloat(elRotX.value) * Math.PI,
      y: parseFloat(elRotY.value) * Math.PI,
      z: parseFloat(elRotZ.value) * Math.PI
    });
    render();
  });
  elRotY.addEventListener('input', () => {
    renderer.camera.rotation = calculateRotMatrixFromFixedAngleXYZ({
      x: parseFloat(elRotX.value) * Math.PI,
      y: parseFloat(elRotY.value) * Math.PI,
      z: parseFloat(elRotZ.value) * Math.PI
    });
    render();
  });
  elRotZ.addEventListener('input', () => {
    renderer.camera.rotation = calculateRotMatrixFromFixedAngleXYZ({
      x: parseFloat(elRotX.value) * Math.PI,
      y: parseFloat(elRotY.value) * Math.PI,
      z: parseFloat(elRotZ.value) * Math.PI
    });
    render();
  });

  // デバイスの姿勢の検出
  const elUseAbsolute = document.querySelector<HTMLInputElement>('#device_orientation_use_absolute') ;
  const elDeviceOrientationAvailable = document.querySelector<HTMLDivElement>('#device_orientation_available');
  const elDeviceOrientationDetected = document.querySelector<HTMLDivElement>('#device_orientation_detected');
  const elDeviceOrientationAlpha = document.querySelector<HTMLTableCellElement>('#device_orientation_alpha');
  const elDeviceOrientationBeta  = document.querySelector<HTMLTableCellElement>('#device_orientation_beta');
  const elDeviceOrientationGamma = document.querySelector<HTMLTableCellElement>('#device_orientation_gamma');

  if(elUseAbsolute === null) {
    throw Error('elUseAbsolute is null');
  }
  if(elDeviceOrientationAvailable === null) {
    throw Error('elDeviceOrientationAvailable is null');
  }
  if(elDeviceOrientationDetected === null) {
    throw Error('elDeviceOrientationDetected is null');
  }
  if(elDeviceOrientationAlpha === null) {
    throw Error('elDeviceOrientationAlpha is null');
  }
  if(elDeviceOrientationBeta === null) {
    throw Error('elDeviceOrientationBeta is null');
  }
  if(elDeviceOrientationGamma === null) {
    throw Error('elDeviceOrientationGamma is null');
  }

  if(!window.DeviceOrientationEvent) {
    elDeviceOrientationAvailable.textContent = 'The device orientation is not available.';
  } else {
    elDeviceOrientationAvailable.textContent = 'The device orientation is available.';


    window.addEventListener('deviceorientation', (e) => {
      const useAbsoluteAngle = elUseAbsolute.checked;
      elDeviceOrientationDetected.textContent = 'The device orientation event detected' + (e.absolute ? '(absolute)' : '(relative)');
      elDeviceOrientationAlpha.textContent = '' + e.alpha;
      elDeviceOrientationBeta. textContent = '' + e.beta;
      elDeviceOrientationGamma.textContent = '' + e.gamma;

      if(typeof(e.alpha) === 'number' && typeof(e.beta) === 'number' && typeof(e.gamma) === 'number') {
        const alpha = e.alpha / 180 * Math.PI;
        const beta  = (e.beta - 90)  / 180 * Math.PI;
        const gamma = e.gamma / 180 * Math.PI;

        if(useAbsoluteAngle) {
          renderer.camera.rotation = calculateRotMatrixFromFixedAngleXYZ({
            x: -beta,
            y: -gamma,
            z: -alpha * (beta >= 0 ? 1 : -1)
          });
        } else {
          renderer.camera.rotation = calculateRotMatrixFromEulerAngleZXY({
            x: beta,
            y: -gamma,
            z: -alpha * (beta >= 0 ? 1 : -1)
          });
        }

        render();

        console.log(e);
      }
    });
  }
});