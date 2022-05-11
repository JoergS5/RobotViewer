// draw coordinate system. Main axes and helper lines every 100 (default)

import { Vector3, MeshBuilder } from "@babylonjs/core";
import { coord, store, robotparts, scenes, materials } from './Store.js'


export const refreshGitter = () => {
  if(store.showGitter) {
    disposeGitter();
    showGitter();
  }
}

export const showGitter = () => {
    store.showGitter = true;
    var scene = scenes[0];
    createGitter(scene);
}

export const disposeGitter = () => {
    store.showGitter = false;
    robotparts.forEach(function(m) {
      if(m.name.startsWith("gitter")) {
        m.dispose();
      }
    });
}

export const toggleGitter = () => {
  if(store.showGitter) {
    disposeGitter();
  }
  else {
    disposeGitter();
    showGitter();
  }
}

export const refreshCoords = () => {
  if(store.showCoords) {
    disposeCoords();
    showCoords();
  }
}


export const showCoords = () => {
    store.showCoords = true;
    var scene = scenes[0];
    createCoords(scene);
}

export const disposeCoords = () => {
    store.showCoords = false;
    robotparts.forEach(function(m) {
      if(m.name.startsWith("coords")) {
        m.dispose();
      }
    });
}


export const toggleCoords = () => {
  if(store.showCoords) {
    disposeCoords();
  }
  else {
    disposeCoords();
    showCoords();
  }
}


export const createGitter = (scene) => {
  for(let x=0; x <= 1000; x+=100) {
    drawLine("gitter", x, 0, 0, x, 1000, 0, materials[5], 1, scene); // x axis 0
  }
  for(let y=0; y <= 1000; y+=100) {
    drawLine("gitter", 0, y, 0, 1000, y, 0, materials[5], 1, scene); // x axis 0
  }
  for(let y=0; y <= 1000; y+=100) {
    drawLine("gitter", 0, y, 0, 0, y, 1000, materials[5], 1, scene); // x axis 0
  }
  for(let z=0; z <= 1000; z+=100) {
    drawLine("gitter", 0, 0, z, 0, 1000, z, materials[5], 1, scene); // x axis 0
  }
};


export const createCoords = (scene) => {
  makeCoord(0, "coords0", store.axisSize, scene);
  makeCoord(1, "coords1", store.axisSize, scene);
  makeCoord(2, "coords2", store.axisSize, scene);
  makeCoord(3, "coords3", store.axisSize, scene);
  makeCoord(4, "coords4", store.axisSize, scene);
  makeCoord(5, "coords5", store.axisSize, scene);
  makeCoord(6, "coords6", store.axisSize, scene);
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
