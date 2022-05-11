// RobotAxes.js:
// axes is visual representation of possible movements, rotational or prismatic
// rotational: pie chart to show possible angles, green positive, red negative angles
// prismatic: linear are of possible movement
// 0 degree or 0 mm position between green and red
// values taken from A parameters home, min, max

import { coord, store, robotparts, scenes, materials, getDHType, angle } from './Store.js'
import { MeshBuilder, Axis, Space } from "@babylonjs/core";

export const showAxes = () => {
    store.showAxes = true;
    var scene = scenes[0];
    for(let j=0; j <= 6; j++) {
      drawAxis(j, materials[4], scene);
    }
}

export const disposeAxes = () => {
    store.showAxes = false;
    robotparts.forEach(function(m) {
      if(m.name.startsWith("axis")) {
        m.dispose();
      }
    });
}

export const refreshAxes = () => {
  if(store.showAxes) {
    disposeAxes();
    showAxes();
  }
}

export const toggleAxes = () => {
  if(store.showAxes) {
    disposeAxes();
  }
  else {
    disposeAxes();
    showAxes();
  }
}

const drawAxis = (i, material, scene) => { // i == axis+1
  var height0 = 100;
  if(getDHType(i) == "P") { // prismatic
    // prismatic arms start at prolongation of Z of axis before
    height0 = angle[i]*2;




  }
  else { // rotational
    // middle axis is at previous coordinate O



  }

  var cyl = MeshBuilder.CreateCylinder("axis" + i, {diameter: 30, height:height0}, scene);

  var euler = [0,0,0];
  // c13, c23, c31, c32, c33
  getEulerAnglesZYZ(coord[i].zx, coord[i].zy, coord[i].xz, coord[i].yz, coord[i].zz, euler);
  var byZ1 = euler[0];
  var byY = euler[1];
  var byZ2 = euler[2];

  cyl.rotate(Axis.Y, byZ1, Space.LOCAL);
  cyl.rotate(Axis.Z, -byY, Space.LOCAL);
  cyl.rotate(Axis.Y, byZ2, Space.LOCAL);

/*  cyl.position.x += coord[i].x;
  cyl.position.y += coord[i].z;
  cyl.position.z -= coord[i].y;*/ 
  cyl.position.x = coord[i].x;
  cyl.position.y = coord[i].z;
  cyl.position.z = -coord[i].y;

  cyl.material = material;

  robotparts.push(cyl);
}

const getEulerAnglesZYZ = (c13, c23, c31, c32, c33, euler) => {
// theta > 0
	euler[0] = Math.atan2(c23, c13);
	euler[1] = Math.atan2(Math.sqrt(c13*c13 + c23*c23),c33);
	euler[2] = Math.atan2(c32, -c31);
// theta < 0
//	euler[0] = Math.atan2(-c23, -c13);
//	euler[1] = Math.atan2(-Math.sqrt(c13*c13 + c23*c23),c33);
//	euler[2] = Math.atan2(-c32, c31);

}

/*
// c11 = xx, c21 = xy, c31 = xz, c32 = yz, c33 = zz
const getEulerAnglesZYX = (c11, c21, c31, c32, c33, euler) => {
	if(c32 == 0.0 && c33 == 0.0) {
		console.log("SINGULARITY detected");
		c11 += 0.1;
		c21 += 0.1;
		c31 += 0.1;
		c32 += 0.1;
		c33 += 0.1;
	}
	euler[0] = Math.atan2(c32, c33); // / doublePi * 180.0;
	euler[1] = Math.atan2(-c31, Math.sqrt(c32*c32 + c33*c33)); // / doublePi * 180.0;
	euler[2] = Math.atan2(c21, c11); // / doublePi * 180.0;
}
*/
