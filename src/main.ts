import './style.scss';
import { color, coord, line } from './types';
import Renderer from './renderer';

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
  ...createCube({ x: 50, y: 0, z: 0, c: 1 }, 10, { r: 0xFF, g: 0, b: 0, a: 1 }, 1)
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
    // renderer.render(cube, true);
  }

  const elCamX = document.querySelector<HTMLInputElement>('div#control input#cam_x');
  const elCamY = document.querySelector<HTMLInputElement>('div#control input#cam_y');
  const elCamZ = document.querySelector<HTMLInputElement>('div#control input#cam_z');
  const elRotX = document.querySelector<HTMLInputElement>('div#control input#rot_x');
  const elRotY = document.querySelector<HTMLInputElement>('div#control input#rot_y');
  const elRotZ = document.querySelector<HTMLInputElement>('div#control input#rot_z');

  elCamX?.addEventListener('change', () => {
    renderer.camera.coord.x = parseFloat(elCamX.value);
    render();
  });
  elCamY?.addEventListener('change', () => {
    renderer.camera.coord.y = parseFloat(elCamY.value);

    render();
  });
  elCamZ?.addEventListener('change', () => {
    renderer.camera.coord.z = parseFloat(elCamZ.value);
    render();
  });
  elRotX?.addEventListener('input', () => {
    renderer.camera.rotation.x = parseFloat(elRotX.value) * Math.PI;
    render();
  });
  elRotY?.addEventListener('input', () => {
    renderer.camera.rotation.y = parseFloat(elRotY.value) * Math.PI;
    render();
  });
  elRotZ?.addEventListener('input', () => {
    renderer.camera.rotation.z = parseFloat(elRotZ.value) * Math.PI;
    render();
  });

  render();
});