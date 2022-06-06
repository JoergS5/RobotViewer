// draw gitter

import { Vector3, MeshBuilder } from "@babylonjs/core";
import { materials, robotparts } from './RobotData.js'

export const showGitter = (scene) => {
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
