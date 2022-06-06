// draw coordinate system. Main axes and helper lines every 100 (default)

import { Vector3, MeshBuilder } from "@babylonjs/core";
import { coord, numOfAxes, store, robotparts, materials } from './RobotData.js'

export const showCoords = (scene) => {
  for(let idx = 0; idx <= numOfAxes; idx++) {
    makeCoord(idx, "coords"+idx, store.axisSize, scene);
  }
/*  makeCoord(0, "coords0", store.axisSize, scene);
  makeCoord(1, "coords1", store.axisSize, scene);
  makeCoord(2, "coords2", store.axisSize, scene);
  makeCoord(3, "coords3", store.axisSize, scene);
  makeCoord(4, "coords4", store.axisSize, scene);
  makeCoord(5, "coords5", store.axisSize, scene);
  makeCoord(6, "coords6", store.axisSize, scene);*/
}


const makeCoord = (idx, name, size, scene) => {
  drawLine(name, coord[idx].x, coord[idx].y, coord[idx].z,
	coord[idx].xx*size + coord[idx].x, coord[idx].xy*size + coord[idx].y, coord[idx].xz*size + coord[idx].z ,
	materials[0], 3, scene);
  drawLine(name, coord[idx].x, coord[idx].y, coord[idx].z,
	coord[idx].yx*size + coord[idx].x, coord[idx].yy*size + coord[idx].y, coord[idx].yz*size + coord[idx].z ,
	materials[1], 3, scene);
  drawLine(name, coord[idx].x, coord[idx].y, coord[idx].z,
		coord[idx].zx*size + coord[idx].x, coord[idx].zy*size + coord[idx].y, coord[idx].zz*size + coord[idx].z ,
		materials[2], 3, scene);

};


// change Y and Z and Z negative here:
const drawLine = (name, fromX, fromY, fromZ, toX, toY, toZ, material0, radius, scene) => {
  var path = [
        new Vector3(fromX, fromZ, -fromY),
        new Vector3(toX, toZ, -toY)
    ] 
  var tube = MeshBuilder.CreateTube(name, {path: path, radius: radius}, scene);
  tube.material = material0;
  robotparts.push(tube);
};
