import { Color3 } from "@babylonjs/core";

export const robotparts = []; // robot elements. Naming for remove/adding: gitter, coord, axis, arm
export const scenes = []; // only one element, Scene scene
export const materials = []; 	// 0: red (angle -, Y-Axis), 1: green (angle +, Y-Axis), 2: blue (Z-Axis)
				// 3: orange (body), 4: gray (axis), 5: white (gitter, coord)
export const materialColors = [ Color3.Red(), Color3.Green(), Color3.Blue(), new Color3(1.0, 0.65, 0.0),
	Color3.Gray(), Color3.White() ];

export var dhType = "RRRRRR"; // R rotational, P prismatic. If too short, R is default for remaining axes.

// DH parameters
export const dh = [
  { d: 0.0, theta: 0.0,   a: 0.0 ,  alpha: 0.0, home: 0.0, min: 0.0, max: 0.0 }, // 0: base
  { d: 352.0, theta: 0.0,   a: 70.0 ,  alpha: -90.0, home: 0.0, min: -150.0, max: 150.0 }, // DH1
  { d: 0.0,   theta: -90.0, a: 360.0 , alpha:   0.0, home: 0.0, min: -60.0,  max: 120.0 },
  { d: 0.0,   theta: 0.0,   ytr: 190, yrot: 0, a: 0.0 ,   alpha: -90.0, home: 0.0, min: -110.0, max: 120.0 },
  { d: 190.0, theta: 0.0,   a: 0.0 ,   alpha:  90.0, home: 0.0, min: -90.0,  max: 90.0 },
  { d: 0.0,   theta: 0.0,   a: 0.0 ,   alpha: -90.0, home: 0.0, min: -200.0, max: 200.0 },
  { d: 65.0,  theta: 0.0,   a: 0.0 ,   alpha:   0.0, home: 0.0, min: -185.0, max: 185.0 } // DH6 last one
  ];

// Tool properties, uvw are Euler ZYX angles with rotations around X(u), Y(v), Z(w)
export const tool = { x: 0, y: 0, z: 100, u: 0, v: 0, w: 0 };

// actuator angles
export const angle = [-60.0, 30.0, 0.0, 30.0, 70.0, 0.0]; // angles at joint 1...6

// coordinates (calculated from DH parameters and actuator angles)
export const coord = [
	{xx: 1, xy: 0, xz: 0,   yx: 0, yy: 1, yz: 0,   zx: 0, zy: 0, zz: 1,   x: 0, y: 0, z: 0},
	{xx: 1, xy: 0, xz: 0,   yx: 0, yy: 1, yz: 0,   zx: 0, zy: 0, zz: 1,   x: 0, y: 0, z: 0},
	{xx: 1, xy: 0, xz: 0,   yx: 0, yy: 0, yz: -1,  zx: 0, zy: 1, zz: 0,   x: 70, y: 0, z: 352},
	{xx: 0, xy: 0, xz: 1,   yx: 1, yy: 0, yz: 0,   zx: 0, zy: 1, zz: 0,   x: 70, y: 0, z: 712},
	{xx: 0, xy: 0, xz: 1,   yx: 0, yy: -1, yz: 0,  zx: 1, zy: 0, zz: 0,   x: 70, y: 0, z: 712},
	{xx: 0, xy: 0, xz: 1,   yx: 1, yy: 0, yz: 0,   zx: 0, zy: 1, zz: 0,   x: 450, y: 0, z: 712},
	{xx: 0, xy: 0, xz: 1,   yx: 0, yy: -1, yz: 0,  zx: 1, zy: 0, zz: 0,   x: 450, y: 0, z: 712},
	{xx: 0, xy: 0, xz: 1,   yx: 0, yy: -1, yz: 0,  zx: 1, zy: 0, zz: 0,   x: 515, y: 0, z: 712}
  ];

export const store = {
  axisSize: 50.0,
  updateFast: true,

  showGitter: true,
  showCoords: true,
  showArms: true,
  showAxes: true,

  count: 2.7,
}

// split angles input field into array and store
export const setAngles = (anglesOneLiner) => {
  var arr = anglesOneLiner.toString().split(',');
  for(let i=0; i < 6; i++) {
    angle[i] = Number(arr[i]);
  }
}

export const dhString = (dhidx, expanded) => {
  var yParam = "";
  if(Object.prototype.hasOwnProperty.call(dh[dhidx], 'ytr') && Object.prototype.hasOwnProperty.call(dh[dhidx], 'yrot')) {
//  if(dh[dhidx].hasOwnProperty('ytr') && dh[dhidx].hasOwnProperty('yrot')) {
    if(expanded) {
      yParam += ", ytr: " + dh[dhidx].ytr + ", yrot: " + dh[dhidx].ytr;
    }
    else {
      yParam += ":" + dh[dhidx].ytr + ":" + dh[dhidx].ytr;
    }
  }

  if(expanded) {
    return "d: " + dh[dhidx].d + ", theta: " + dh[dhidx].theta + yParam + ", a: " + dh[dhidx].a
		+ ", alpha: " + dh[dhidx].alpha + ", home: " + dh[dhidx].home
		+ ", min: " + dh[dhidx].min + ", max: " + dh[dhidx].max;
  }
  else {
    return dh[dhidx].d + ":" + dh[dhidx].theta + yParam + ":" + dh[dhidx].a
		+ ":" + dh[dhidx].alpha + ":" + dh[dhidx].home
		+ ":" + dh[dhidx].min + ":" + dh[dhidx].max;
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

export const set_A_Value = (type, newValue) => {
  if(type == -2) {	// R or P types
    setDHType(newValue);
  }
  else if(type == -1) {	// tool
    setTool(newValue);
  }
  else {	// DH parameter, starting from 0 base, then 1...6
    setDH(type, newValue);
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


const setDHType = (newValue) => {
  if(newValue.length == 6) {
    dhType = newValue;
  }
}

const setDH = (idx, newValue) => {
  var arr = newValue.split(",");
  if(arr.length == 7 || arr.length == 9) {
    for(let j=0; j < arr.length; j++) {
      var arr2 = arr[j].split(":");
      if(arr2.length == 2) {
        var n = Number(arr2[1].trim());
        if(!isNaN(n)) {
          saveDH(idx, arr2[0].trim(), Number(n));
        }
      }
    }
  }
}

const saveDH = (idx, varname, value) => {
  switch(varname) {
    case("d"):
      dh[idx].d = value;
      break;
    case("theta"):
      dh[idx].theta = value;
      break;
    case("ytr"):
      dh[idx].ytr = value;
      break;
    case("yrot"):
      dh[idx].yrot = value;
      break;
    case("a"):
      dh[idx].a = value;
      break;
    case("alpha"):
      dh[idx].alpha = value;
      break;
    case("home"):
      dh[idx].home = value;
      break;
    case("min"):
      dh[idx].min = value;
      break;
    case("max"):
      dh[idx].max = value;
      break;
  }
}

const setTool = (newValue) => {
  var arr = newValue.split(",");
  if(arr.length == 3) {
    for(let j=0; j < arr.length; j++) {
      var arr2 = arr[j].split(":");
      if(arr2.length == 2) {
        var n = Number(arr2[1].trim());
        if(!isNaN(n)) {
          saveTool(arr2[0].trim(), Number(n));
        }
      }
    }
  }
}

const saveTool = (varname, value) => {
  switch(varname) {
    case("x"):
      tool.x = value;
      break;
    case("y"):
      tool.y = value;
      break;
    case("z"):
      tool.z = value;
      break;
  }
}
