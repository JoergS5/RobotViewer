import { MeshBuilder } from "@babylonjs/core";
import { angle, dh, numOfAxes, scenes, coord, robotparts } from './RobotData';
import { getForward } from './ForwardCalculate';
import { moveArms } from './RobotArms';

//var animationMode = "no animation";
var drawPoints = true;

export const animateRobot = () => {
  getRandomAngles();
  getForward();
  
  moveArms();

  if(drawPoints) {
    var scene = scenes[0];
    var sph = MeshBuilder.CreateSphere("point", {diameter: 5}, scene);
    sph.position.x = coord[numOfAxes + 1].x;
    sph.position.y = coord[numOfAxes + 1].z;
    sph.position.z = - coord[numOfAxes + 1].y;
    robotparts.push(sph);
  }
}

export const setAnimationMode = (newMode) => {
  if(newMode.startsWith("point")) {
    if(newMode == "points on") {
      drawPoints = true;
    }
    else {
      drawPoints = false;
    }
  }
  else {
//    animationMode = newMode;
  }


}

export const clearAnimationPoints = () => {
  robotparts.forEach(function(m) {
    if(m.name.startsWith("point")) {
      m.dispose();
    }
  });
}

const getRandomAngles = () => {
  var diff = 0;
  var rand = Math.random();
  for(let i=0; i < numOfAxes; i++) {
    diff = dh[i+1].max - dh[i+1].min;
    angle[i] = diff * rand + dh[i+1].min;
    rand = Math.random();
  }
}
