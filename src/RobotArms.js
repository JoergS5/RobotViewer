// draw robot body
// orange robot body, solid or mesh

import { coord, store, robotparts, scenes, materials, getDHType, angle } from './Store.js'
import { Vector3, MeshBuilder, Mesh } from "@babylonjs/core";

export const createRobotBody = (scene) => {
  drawBase(scene);
  for(let k=1; k < 8; k++) {
    drawRobotArm(k, materials[3], scene);
  }
}

export const refreshArms = () => {
  if(store.showArms) {
    disposeArms();
    showArms();
  }
}

export const showArms = () => {
    store.showArms = true;
    var scene = scenes[0];
    drawBase(scene);
    for(let j=1; j < 8; j++) {
      drawRobotArm(j, materials[3], scene);
    }
}
export const disposeArms = () => {
    store.showArms = false;
    robotparts.forEach(function(m) {
      if(m.name.startsWith("arm")) {
        m.dispose();
      }
    });
}

export const toggleArms = () => {
  if(store.showArms) {
    disposeArms();
  }
  else {
    disposeArms();
    showArms();
  }
}


const drawBase = (scene) => {
  var size = 200;
  var cyl = Mesh.CreateBox("arm0", size, scene);
  cyl.material = materials[3];
  robotparts.push(cyl);
}

const drawRobotArm = (axisnr, material, scene) => {
  var fromX = 0;
  var fromY = 0;
  var fromZ = 0;
  if(getDHType(axisnr-1) == "P") {
    // prismatic arms start at prolongation of Z of axis before
   fromX = coord[axisnr-1].x + coord[axisnr-1].zx * angle[axisnr-1];
   fromY = coord[axisnr-1].y + coord[axisnr-1].zy * angle[axisnr-1];
   fromZ = coord[axisnr-1].z + coord[axisnr-1].zz * angle[axisnr-1];
  }
  else {
    // rotational arms start at coordinates of axis before
    fromX = coord[axisnr-1].x;
    fromY = coord[axisnr-1].y;
    fromZ = coord[axisnr-1].z;
  }

  var toX = coord[axisnr].x;
  var toY = coord[axisnr].y;
  var toZ = coord[axisnr].z;

  if(axisnr == 1) {
    fromX = toX;
    fromY = toY;
  }

  var tube = drawArm("arm" + axisnr, fromX, fromY, fromZ, toX, toY, toZ, material, scene);
  return tube;
}

const drawArm = (name, fromX, fromY, fromZ, toX, toY, toZ, material, scene) => {
  var radius = 30;
  var path = [
        new Vector3(fromX, fromZ, -fromY),
        new Vector3(toX, toZ, -toY)
    ]
  var tube = MeshBuilder.CreateTube(name, {path: path, radius: radius}, scene);
  tube.material = material;
  robotparts.push(tube);
  return tube;
}

