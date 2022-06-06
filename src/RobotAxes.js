// RobotAxes.js:
// axes is visual representation of possible movements, rotational or prismatic
// rotational: pie chart to show possible angles, green positive, red negative angles
// prismatic: linear are of possible movement
// 0 degree or 0 mm position between green and red
// values taken from A parameters home, min, max

import { MeshBuilder, Axis, Space } from "@babylonjs/core";
import { coord, numOfAxes, store, materials, robotparts } from './RobotData.js'

export const showAxes = (scene) => {
    store.showAxes = true;
    for(let j=0; j <= numOfAxes; j++) {
      drawAxis(j, materials[4], scene);
    }
}

const drawAxis = (i, material, scene) => { // i == axis+1
  var cyl = MeshBuilder.CreateCylinder("axis" + i, {diameter: 30, height:100}, scene);

  var euler = [0,0,0];
  // c13, c23, c31, c32, c33
  getEulerAnglesZYZ(coord[i].zx, coord[i].zy, coord[i].xz, coord[i].yz, coord[i].zz, euler);
  var byZ1 = euler[0];
  var byY = euler[1];
  var byZ2 = euler[2];

  cyl.rotate(Axis.Y, byZ1, Space.LOCAL);
  cyl.rotate(Axis.Z, -byY, Space.LOCAL);
  cyl.rotate(Axis.Y, byZ2, Space.LOCAL);

  cyl.position.x = coord[i].x;
  cyl.position.y = coord[i].z;
  cyl.position.z = -coord[i].y;

  cyl.material = material;

  robotparts.push(cyl);
}

const getEulerAnglesZYZ = (c13, c23, c31, c32, c33, euler) => {
  euler[0] = Math.atan2(c23, c13);
  euler[1] = Math.atan2(Math.sqrt(c13*c13 + c23*c23),c33);
  euler[2] = Math.atan2(c32, -c31);
}
