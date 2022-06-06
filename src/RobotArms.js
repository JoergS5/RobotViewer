// draw robot body
// orange robot body, solid or mesh

import { Vector3, MeshBuilder, TransformNode, Axis, Space } from "@babylonjs/core";
import { coord, robotparts, materials, getDHType, angle,
	getEulerAnglesZYZ, dh, tool, numOfAxes, scenes } from './RobotData.js'


export const showArms = (scene) => {
  drawBase(scene);
  for(let j=0; j < numOfAxes; j++) {
    drawRobotArm(j, materials[3], scene);
  }
  showTool(scene);
}

export const moveArms = () => {
  robotparts.forEach(function(m) {
    if(m.name.startsWith("arm")) {
      m.dispose();
    }
  });

  var scene = scenes[0];
  showArms(scene);

//  scene.render();
}




const drawBase = (scene) => {
  var size = 200;
  var cyl = MeshBuilder.CreateCylinder("arm0", {diameter: size, height:size}, scene);
  cyl.material = materials[3];
  cyl.position.x = coord[0].x;
  cyl.position.y = coord[0].z;
  cyl.position.z = - coord[0].y;
  robotparts.push(cyl);
}

const showTool = (scene) => {
  var CoT = new TransformNode("root");

  var part1 = MeshBuilder.CreateBox("armTool", {height: tool.z, depth: 20, width: 20}, scene);
  part1.parent = CoT;
  part1.position.y = tool.z / 2;

  var idx = numOfAxes;
  var rotation = (dh[idx].theta / 360.0) *2.0*3.14159;
  rotateAndTrans(idx, CoT, rotation);
  robotparts.push(part1);
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


const drawRobotArm = (idx, material, scene) => {
  var axisnr = idx + 1;

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
  var radius = 25;
  var path = [
        new Vector3(fromX, fromZ, -fromY),
        new Vector3(toX, toZ, -toY)
    ]
  var tube = MeshBuilder.CreateTube(name, {path: path, radius: radius, updatable: true}, scene);
  tube.material = material;
  robotparts.push(tube);
  return tube;
}

