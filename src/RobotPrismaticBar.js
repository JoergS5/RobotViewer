// prismatic bar, negative red, positive green values, direction of axis

import { MeshBuilder, Axis, Space, Vector3, TransformNode } from "@babylonjs/core";
import { numOfAxes, coord, dh, robotparts, materials, getDHType, getEulerAnglesZYZ } from './RobotData.js'

export const showPrismaticBars = (scene) => {
    for(let j=0; j < numOfAxes; j++) {
      if(getDHType(j) == "P") {
        drawPrisma(j, scene);
      }
    }
}

const drawPrisma = (i, scene) => {
  var CoT = new TransformNode("root");
  robotparts.push(CoT);

  // red negative
  var min = dh[i+1].min;
  if(min < 0) {
    var max = Math.min(0, dh[i+1].max);
    var arc0 = - (min - max);
    var cylR = MeshBuilder.CreateBox("barR"+i, {height: arc0, depth: 10, width: 10}, scene);
    cylR.material = materials[0];
    cylR.parent = CoT;
    cylR.position.y = min/2;

    robotparts.push(cylR);
  }

  // black 0
  var cylB = MeshBuilder.CreateBox("barB"+i, {height: 2, depth: 20, width: 20}, scene);
  cylB.material = materials[6];
  cylB.parent = CoT;

  // green positive
  max = dh[i+1].max;
  if(max > 0) {
    min = Math.max(0.0, dh[i+1].min);
    arc0 = (max - min);
    var cylG = MeshBuilder.CreateBox("barG"+i, {height: arc0, depth: 10, width: 10}, scene);
    cylG.material = materials[1];
    cylG.parent = CoT;
    cylG.position.y = max/2;

    robotparts.push(cylG);
  }


  var rotation = (dh[i+1].theta / 360.0) *2.0*3.14159;
  rotateAndTrans(i, CoT, rotation);
}

const rotateAndTrans = (i, cyl, rotation) => {
  var euler = [0.0,0.0,0.0];
//alert("xx xy xy: " + coord[i].xx + "/" + coord[i].xy + "/" + coord[i].xz);
//alert("yx yy yy: " + coord[i].yx + "/" + coord[i].yy + "/" + coord[i].yz);
//alert("zx zy zz: " + coord[i].zx + "/" + coord[i].zy + "/" + coord[i].zz);
  // c13, c23, c31, c32, c33
  getEulerAnglesZYZ(coord[i].zx, coord[i].zy, coord[i].xz, coord[i].yz, coord[i].zz, euler);
  var byZ1 = euler[0];
  var byY = euler[1];
  var byZ2 = euler[2];
//alert("byZ1: " + byZ1);
//alert("by: " + byY);
//alert("byZ2: " + byZ2);

  cyl.rotate(Axis.Y, byZ1, Space.LOCAL);
  cyl.rotate(Axis.Z, -byY, Space.LOCAL);
  cyl.rotate(Axis.Y, byZ2 + rotation, Space.LOCAL);

/*  cyl.position.x = coord[i].x;
  cyl.position.y = coord[i].z;
  cyl.position.z = -coord[i].y; */

var x = coord[i].x;
var y = coord[i].z;
var z = - coord[i].y;
cyl.position = new Vector3(x, y, z);
cyl.position = cyl.position.add(cyl.position.subtract(cyl.getAbsolutePosition()));

}


