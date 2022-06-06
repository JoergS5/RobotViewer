/*

// helper functions to handle data
// exported:
// - removeElement
// - addElement

import { numOfAxes, dhType, dh, angle, coord, setNumOfAxes, setDHType } from './RobotData';


// reduce or enhance arrays of dh, coord, dhType, angle
// numOfAxes and old array sizes must be correct for the method to work correctly
export const removeElement = (removeLine) => {
  // numOfAxes
  setNumOfAxes(numOfAxes-1);

  // dhType
  if(dhType.length > removeLine) {
    var newValue = dhType.substring(0, removeLine) + dhType.substring(removeLine+1);
    setDHType(newValue);
  }

  // dh[] starting at element 1, same for coord
  dh.splice(removeLine+1, 1);
  coord.splice(removeLine+1,1);
}


// add element into numOfAxes, dhTypes, dh and coord. dh and coord start one element later
// first dh is base A0 and cannot be changed
// first coord is base address, last coord is calculated from tool properties
export const addElement = (addLine) => {
  var newDHType = "R";
  setNumOfAxes(numOfAxes+1);

  if(dhType.length > addLine) {
    var newValue = dhType.substring(0, (addLine) + newDHType + dhType.substring(addLine+1);
    setDHType(newValue);
  }

  var newDH = { d: 0.0, theta: 0.0, ytr: 0, yrot: 0, a: 0.0, alpha: 0.0, home: 0.0, min: 0.0, max: 0.0 };
  dh.splice(addLine+1, 0, newDH);

  var newCoord = { xx: coord[addLine].xx, xy: coord[addLine].xy, xz: coord[addLine].xz, 
	yx: coord[addLine].yx, yy: coord[addLine].yy, yz: coord[addLine].yz, 
	zx: coord[addLine].zx, zy: coord[addLine].zy, zz: coord[addLine].zz, 
	x: coord[addLine].x, y: coord[addLine].y, z: coord[addLine].z };
  coord.splice(addLine+1, 0, newCoord);
}
*/
