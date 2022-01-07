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

const calculateRotMatrixFromEulerAngleYXZ = (rotation: rotation): rotMatrix => {
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const cosZ = Math.cos(rotation.z);
  const sinZ = Math.sin(rotation.z);

  return [
    [
        sinX * sinY * sinZ + cosY * cosZ,
        sinX * sinY * cosZ - cosY * sinZ,
        cosX * sinY,
    ],
    [
        cosX * sinZ,
        cosX * cosZ,
      - sinX,
    ],
    [
        sinX * cosY * sinZ - sinY * cosZ,
        sinX * cosY * cosZ + sinY * sinZ,
        cosX * cosY,
    ],
  ];
}

const composeRotMatrix = (mat1: rotMatrix, mat2: rotMatrix): rotMatrix => [
  [
    mat1[0][0] * mat2[0][0] + mat1[0][1] * mat2[1][0] + mat1[0][2] * mat2[2][0],
    mat1[1][0] * mat2[0][0] + mat1[1][1] * mat2[1][0] + mat1[1][2] * mat2[2][0],
    mat1[2][0] * mat2[0][0] + mat1[2][1] * mat2[1][0] + mat1[2][2] * mat2[2][0],
  ],
  [
    mat1[0][0] * mat2[0][1] + mat1[0][1] * mat2[1][1] + mat1[0][2] * mat2[2][1],
    mat1[1][0] * mat2[0][1] + mat1[1][1] * mat2[1][1] + mat1[1][2] * mat2[2][1],
    mat1[2][0] * mat2[0][1] + mat1[2][1] * mat2[1][1] + mat1[2][2] * mat2[2][1],
  ],
  [
    mat1[0][0] * mat2[0][2] + mat1[0][1] * mat2[1][2] + mat1[0][2] * mat2[2][2],
    mat1[1][0] * mat2[0][2] + mat1[1][1] * mat2[1][2] + mat1[1][2] * mat2[2][2],
    mat1[2][0] * mat2[0][2] + mat1[2][1] * mat2[1][2] + mat1[2][2] * mat2[2][2],
  ],
];

export {
  calculateRotMatrixFromFixedAngleXYZ,
  calculateRotMatrixFromEulerAngleZXY,
  calculateRotMatrixFromEulerAngleYXZ,
  composeRotMatrix
}