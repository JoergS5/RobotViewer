// convert from DHString to dh[], coord[] etc

import { setNumOfAxes, setDHType, setDHLetters, dh, setTool } from './RobotData';

export const setDHParameters = (dhstring) => {
//  var newline = String.fromCharCode(13, 10);
  var newline = String.fromCharCode(10);
  var lines = dhstring.split(newline);

  var axes = 0;
  var type0 = "";
  var letters0 = "";
  var dhnew = [];
  var tool0 = {};
  var errors = [];

  if(dhstring == null || dhstring == "") {
    errors.push("template not found");
    alert(getErrorsAsString(errors));
    return;
  }

  lines.forEach(function(m) {
    if(m.startsWith("M669 K13 AT:")) {
      type0 = getDHtype("M669 K13 AT:", m, errors);
      letters0 = getLetter("M669 K13 AT:", m, errors);
      axes = getAxes(type0);
    }
    else if(m.startsWith("M669 A")) {
      var dh0 = getDH("M669 A", m, errors);
      dhnew.push(dh0);
    }
    else if(m.startsWith("G10 ")) {
      tool0 = getTool("G10 ", m, errors);
    }
  });

  if(errors.length > 0) {
    alert(getErrorsAsString(errors));
    return;
  }
  // if no errors, then import
  dh.length=0;
  setNumOfAxes(axes);
  setDHType(type0);
  setDHLetters(letters0);
  setTool(tool0);
  dhnew.forEach(function(m) {
    dh.push(m);
  });

}

const getLetter = (pre, line, errors) => {
  var rest = line.substring(pre.length);
  var arr = rest.split(" ");
  if(arr[1].startsWith("AL:")) {
    var arr2 = arr[1].split(":");
    if(arr2.length == 2) {
      return arr2[1];
    }
    else {
      errors.push("error in AL: paramter");
    }
  }
  //M669 K13 AT:RRRRRR AL:XYZUVW
  return "";
}

const getErrorsAsString = (errors) => {
 // var newline = String.fromCharCode(13, 10);
 var newline = String.fromCharCode(10);
  var str = "";
  errors.forEach(function(m) {
    str += m + newline;
  });
  return str;
}

/*
const toolString = (tool) => {
  return "x: " + tool.x + ", y: " + tool.y + ", z: " + tool.z;
}
*/


const getTool = (pre, line, errors) => {
  var rest = line.substring(pre.length);
  var ele = rest.split(" ");
  if(ele.length != 3) {
    var error = "error in line: " + line;
    errors.push(error);
    return;
  }
  var tool0 = {};
  var e0 = ele[0].split(":");
  tool0.x = parseFloat(e0[1]);
  e0 = ele[1].split(":");
  tool0.y = parseFloat(e0[1]);
  e0 = ele[2].split(":");
  tool0.z = parseFloat(e0[1]);
  return tool0;
}

/*
const dh2str = (dh) => {
    return "idx: " + dh.idx + ", d: " + dh.d + ", theta: " + dh.theta 
		+ ", ytr: " + dh.ytr + ", yrot: " + dh.ytr
		+ ", a: " + dh.a	+ ", alpha: " + dh.alpha 
		+ ", home: " + dh.home + ", min: " + dh.min + ", max: " + dh.max;
}
*/


const getDH = (pre, line, errors) => {
  var rest = line.substring(pre.length);
  var ele = rest.split(":");
  if(ele.length != 10) {
    var error = "error in line: " + line;
    errors.push(error);
    return;
  }
  var dh = [];
  dh.idx = parseFloat(ele[0]);
  dh.d = parseFloat(ele[1]);
  dh.theta = parseFloat(ele[2]);
  dh.ytr = parseFloat(ele[3]);
  dh.yrot = parseFloat(ele[4]);
  dh.a = parseFloat(ele[5]);
  dh.alpha = parseFloat(ele[6]);
  dh.home = parseFloat(ele[7]);
  dh.min = parseFloat(ele[8]);
  dh.max = parseFloat(ele[9]);
  return dh;
}

const getDHtype = (pre, line, errors) => {
  var rest = line.substring(pre.length);
  var arr = rest.split(" ");
  if(arr.length == 0) {
    errors.push("");
  }
  return arr[0];
}

const getAxes = (type0) => {
  return type0.length;
}
