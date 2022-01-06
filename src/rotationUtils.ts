import { rotation, rotMatrix } from './types';

const calculateRotMatrixFromFixedAngleXYZ = (rotation: rotation): rotMatrix => {
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const cosZ = Math.cos(rotation.z);
  const sinZ = Math.sin(rotation.z);

  return [
    [
        cosZ * cosY,
      - sinZ * cosX + cosZ * sinY * sinX,
        sinZ * sinX + cosZ * sinY * cosX,
    ],
    [
        sinZ * cosY,
        cosZ * cosX + sinZ * sinY * sinX,
      - cosZ * sinX + sinZ * sinY * cosX,
    ],
    [
      - sinY,
        cosY * sinX,
        cosY * cosX,
    ],
  ];
}

const calculateRotMatrixFromEulerAngleZXY = (rotation: rotation): rotMatrix => {
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const cosZ = Math.cos(rotation.z);
  const sinZ = Math.sin(rotation.z);

  return [
    [
      - sinX * sinY * sinZ + cosY * cosZ,
      - cosX * sinZ,
        sinX * cosY * sinZ + sinY * cosZ,
    ],
    [
        sinX * sinY * cosZ + cosY * sinZ,
        cosX * cosZ,
      - sinX * cosY * cosZ + sinY * sinZ,
    ],
    [
      - cosX * sinY,
        sinX,
        cosX * cosY,
    ],
  ];
}

export {
  calculateRotMatrixFromFixedAngleXYZ,
  calculateRotMatrixFromEulerAngleZXY
}