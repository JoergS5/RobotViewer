// show positive, negative, 0 angles at an axis for rotary actuator

import { MeshBuilder, Color4, Axis, Space } from "@babylonjs/core";
import { numOfAxes, coord, dh, robotparts, getDHType } from './RobotData.js'

export const showRotaryPies = (scene) => {
    for(let j=0; j < numOfAxes; j++) {
      if(getDHType(j) == "R") {
        drawPie(j, scene);
      }
    }
//  drawPie(1, scene);
}

/*
 * draw two pie segments: red for min negative to 0, green for 0 to max positive angle
 * then rotate and position to origin of coordinate axis
 * i == 0 means dh[1]
*/
const drawPie = (i, scene) => {

  // red negative
  var min = dh[i+1].min;
  if(min < 0) {
    var max = Math.min(0, dh[i+1].max);
    var arc0 = (min - max) / -360;

    const cylR = MeshBuilder.CreateCylinder("pie", {arc: arc0, diameter:70, height: 10,
             faceColors: getFaceColor(1.0,0,0), enclose:true }, scene);
//    cylR.setPivotPoint(new Vector3(0,5,0), Space.WORLD);

    var rotation = (- arc0 + dh[i+1].theta / 360.0) *2.0*3.14159;
    rotateAndTrans(i, cylR, rotation);

    robotparts.push(cylR);
  }

  // green positive
  max = dh[i+1].max;
  if(max > 0) {
    min = Math.max(0.0, dh[i+1].min);
    arc0 = (max - min) / 360.0;

    const cylG = MeshBuilder.CreateCylinder("pie", {arc: arc0, diameter:70, height: 11,
             faceColors: getFaceColor(0,1.0,0), enclose:true }, scene);
//    cylG.setPivotPoint(new Vector3(0,5,0), Space.WORLD);

    rotation = (min/360.0 + dh[i+1].theta / 360.0) *2.0*3.14159;
    rotateAndTrans(i, cylG, rotation);

    robotparts.push(cylG);
  }

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

  cyl.position.x = coord[i].x;
  cyl.position.y = coord[i].z;
  cyl.position.z = -coord[i].y;

}

const getEulerAnglesZYZ = (c13, c23, c31, c32, c33, euler) => {
  euler[0] = Math.atan2(c23, c13);
  if(c23 == 0 && c13 == 0) {
    euler[0] = 0;
  }

  euler[1] = Math.atan2(Math.sqrt(c13*c13 + c23*c23),c33);
  if((c13*c13+c23*c23) == 0 && c33 == 0) {
    euler[1] = 0;
  }

  euler[2] = Math.atan2(c32, -c31);

  if(c32 == 0 && c31 == 0) {
    euler[2] = 0;
  }
}

const getFaceColor = (r, g, b) => {
  let faceColor = [];
  faceColor[0] = new Color4(r, g, b, 0.95) // top
  faceColor[1] = new Color4(r, g, b, 0.95) // side
  faceColor[2] = new Color4(r, g, b, 0.95) // inside 1
  faceColor[3] = new Color4(r, g, b, 0.95) // inside 2
  faceColor[4] = new Color4(r, g, b, 0.95) // top
  return faceColor;
}
