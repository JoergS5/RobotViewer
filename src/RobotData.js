import { Color3, StandardMaterial } from "@babylonjs/core";

export const robotparts = []; // robot elements. Naming for remove/adding: gitter, coord, axis, arm
export const scenes = []; // only 0 used
export const materialColors = [ Color3.Red(), Color3.Green(), Color3.Blue(), new Color3(1.0, 1.0, 0.0),
	Color3.Gray(), Color3.White(), Color3.Black() ];
export const materials = []; 	// 0: red (angle -, Y-Axis), 1: green (angle +, Y-Axis), 2: blue (Z-Axis)
				// 3: orange (body), 4: gray (axis), 5: white (gitter, coord) 6: black

export const initMaterials = (scene) => {
  initMaterials0("material0", 0, 1.0, scene);
  initMaterials0("material1", 1, 1.0, scene);
  initMaterials0("material2", 2, 1.0, scene);
  initMaterials0("material3", 3, 0.3, scene);
  initMaterials0("material4", 4, 0.7, scene);
  initMaterials0("material5", 5, 1.0, scene);
  initMaterials0("material6", 6, 1.0, scene);
}

const initMaterials0 = (name, coloridx, alpha, scene) => {
  const material = new StandardMaterial("material0", scene);
  material.alpha = alpha;
  material.diffuseColor = materialColors[coloridx];
  materials.push(material);
}

export const store = {
  axisSize: 60.0,
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

export var numOfAxes = 6;
export var dhType = "RRRRRR"; // R rotational, P prismatic. If too short, R is default for remaining axes.
export var dhLetters = "";

export const setNumOfAxes = (newSize) => {
  numOfAxes = newSize;
}

export const setDHType = (newType) => {
  dhType = newType;
}

export const setDHLetters = (newLetters) => {
  dhLetters = newLetters;
}

export const setTool = (newTool) => {
  tool = newTool;
}

// actuator angles, size 6: axes 1...6
export const angle = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]; // angles at joint 1...6

// DH parameters, size 7: base 0, axes 1...6, tool DH excluded
//  { idx: 1, d: 190.0, theta: 0.0, ytr: 0, yrot: 0, a: 0.0, alpha: 90.0, home: 0.0, min: -50.0,  max: 290.0 },
export const dh = [];

// Tool properties, uvw are Euler ZYX angles with rotations around X(u), Y(v), Z(w)
export var tool = { x: 0, y: 0, z: 100, u: 0, v: 0, w: 0 };

// coordinates (calculated from DH parameters and actuator angles), size 8: base 0, axes 1...6, tool endpoint
//	{idx: 0 xx: 1, xy: 0, xz: 0,   yx: 0, yy: 1, yz: 0,   zx: 0, zy: 0, zz: 1,   x: 0, y: 0, z: 0},
export const coord = [];


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initAnglesOneLiner = () => {
  var ret = "";
  for(let i=0; i < numOfAxes; i++) {
    if(i > 0) {
      ret += ",";
    }
    ret += "0";
  }
  return ret;
}

// split angles input field into array and store
export const setAngles = (anglesOneLiner) => {
  var arr = anglesOneLiner.toString().split(',');
  for(let i=0; i < 6; i++) {
    angle[i] = Number(arr[i]);
  }
}

export const toolString = (expanded) => {
  if(expanded) {
    return "x: " + tool.x + ", y: " + tool.y + ", z: " + tool.z;
  }
  else {
    return tool.x + ":" + tool.y + ":" + tool.z;
  }
}

export const getDHType = (idx) => {
  var len = dhType.length;
  if(idx >= 0 && idx < len) {
    return dhType.substring(idx, idx+1);
  }
  else { // default
    return "R";
  }
}

export const getEulerAnglesZYZ = (c13, c23, c31, c32, c33, euler) => {
  if(c23 == 0 && c13 == 0) {
    euler[0] = 0;
  }
  else {
    euler[0] = Math.atan2(c23, c13);
  }

  if((c13*c13+c23*c23) == 0 && c33 == 0) {
    euler[1] = 0;
  }
  else {
    euler[1] = Math.atan2(Math.sqrt(c13*c13 + c23*c23),c33);
  }

  if(c32 == 0 && c31 == 0) {
    euler[2] = 0;
  }
  else {
    euler[2] = Math.atan2(c32, -c31);
  }
}

export const dhText = () => {
  return "das sind DH Daten";
}

