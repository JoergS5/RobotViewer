// take parameters of DH and angles,
// calculate forward kinematics,
// store positions and orientations in coord[] 1...7 (0 is base position)

import { dh, numOfAxes, getDHType, angle, tool, coord } from './RobotData.js';

export const mxTemp = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
export const mxCurrent = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
export const mxResult = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

export const getForward = () => {
  coord.length=0;

  // base
  getMatrix(0, 0, mxResult);
  setPosition(0, mxResult);
 

  for(let idx = 0; idx < numOfAxes; idx++) {
    for(let j=0; j < 16; j++) mxTemp[j] = mxResult[j];
    getMatrix(idx+1, angle[idx], mxCurrent);
    multiplyMatrix(idx+1, 4, 4, mxTemp, 4, 4, mxCurrent, mxResult);
    setPosition(idx+1, mxResult);
  }

  // add tool
  // tool
  for(let j=0; j < 16; j++) mxTemp[j] = mxResult[j];
  initToolMatrix(); // result in mxCurrent
  var idxTool = numOfAxes+1;
  multiplyMatrix(idxTool, 4, 4, mxTemp, 4, 4, mxCurrent, mxResult);
  setPosition(idxTool, mxResult);

/*
  coord.forEach(function(m) {
    console.log(m.idx + " x:" + m.xx + "/" + m.xy + "/" + m.xz
             + " y: " + m.yx + "/" + m.yy + "/" + m.yz
             + " z: " + m.zx + "/" + m.zy + "/" + m.zz
             + " xyz: " + m.x + "/" + m.y + "/" + m.z);
  });
*/
};


const initToolMatrix = () => {
  for(var j=0; j < 16; j++) mxCurrent[j] = 0.0;

  mxCurrent[3] = tool.x;
  mxCurrent[7] = tool.y;
  mxCurrent[11] = tool.z;

  // set orientation to unchanged, use G10 UVW later:
  mxCurrent[0] = 1.0;
  mxCurrent[5] = 1.0;
  mxCurrent[10] = 1.0;

  mxCurrent[15] = 1;

}


const setPosition = (idx, mxResult) => {
  var cN = {};

  cN.idx = idx;

  cN.xx = Math.abs(mxResult[0]) < 0.0001 ? 0.0 : mxResult[0];
  cN.xy = Math.abs(mxResult[4]) < 0.0001 ? 0.0 : mxResult[4];
  cN.xz = Math.abs(mxResult[8]) < 0.0001 ? 0.0 : mxResult[8];

  cN.yx = Math.abs(mxResult[1]) < 0.0001 ? 0.0 : mxResult[1];
  cN.yy = Math.abs(mxResult[5]) < 0.0001 ? 0.0 : mxResult[5];
  cN.yz = Math.abs(mxResult[9]) < 0.0001 ? 0.0 : mxResult[9];

  cN.zx = Math.abs(mxResult[2]) < 0.0001 ? 0.0 : mxResult[2];
  cN.zy = Math.abs(mxResult[6]) < 0.0001 ? 0.0 : mxResult[6];
  cN.zz = Math.abs(mxResult[10]) < 0.0001 ? 0.0 : mxResult[10];

  cN.x = Math.abs(mxResult[3]) < 0.0001 ? 0.0 : mxResult[3];
  cN.y = Math.abs(mxResult[7]) < 0.0001 ? 0.0 : mxResult[7];
  cN.z = Math.abs(mxResult[11]) < 0.0001 ? 0.0 : mxResult[11];

  coord.push(cN);

}


const getMatrix = (idx, anglesOrDist, matrix) => {
  var a = dh[idx].a;
  var alpha = dh[idx].alpha;
  var ytr = dh[idx].ytr;
  var yrot = dh[idx].yrot;
  var d = dh[idx].d;
  var theta = dh[idx].theta;

  if(getDHType(idx-1) == "R") {
    theta += anglesOrDist;
  }
  else if(getDHType(idx-1) == "P") {
    d += anglesOrDist;
  }

  getZYXTransRotMatrix(idx, d, theta, ytr, yrot, a, alpha, matrix);
}


const getZYXTransRotMatrix = (idx, ztrans, zrot, ytrans, yrot, xtrans, xrot, matrix) => {
	var doublePi  = 3.1415926535897932385;

	var s1 = Math.sin(xrot/180.0*doublePi);
	var c1 = Math.cos(xrot/180.0*doublePi);
	var s2 = Math.sin(yrot/180.0*doublePi);
	var c2 = Math.cos(yrot/180.0*doublePi);
	var s3 = Math.sin(zrot/180.0*doublePi);
	var c3 = Math.cos(zrot/180.0*doublePi);

	matrix[0] = c2*c3;
	matrix[1] = -c1*s3 + s1*s2*c3;
	matrix[2] = s1*s3 + c1*s2*c3;
	matrix[3] = xtrans*c2*c3 - ytrans*s3;

	matrix[4] = c2*s3;
	matrix[5] = c1*c3 + s1*s2*s3;
	matrix[6] = -s1*c3 + c1*s2*s3;
	matrix[7] = xtrans*c2*s3 + ytrans*c3;

	matrix[8] = -s2;
	matrix[9] = s1*c2;
	matrix[10] = c1*c2;
	matrix[11] = - xtrans * s2 + ztrans

	matrix[12] = 0.0;
	matrix[13] = 0.0;
	matrix[14] = 0.0;
	matrix[15] = 1.0;

}


const multiplyMatrix = (idx, r1, c1, m1, r2, c2, m2, result) => {
	for(let r=0; r < r1; r++) {
		for(let c=0; c < c2; c++) {
			result[r*c2 + c] = 0.0;
			for(let e=0; e < r2; e++) {
				result[r*c2 + c] += (m1[r*c1 + e] * m2[e*c2 + c]);
			}
		}
	}
}
