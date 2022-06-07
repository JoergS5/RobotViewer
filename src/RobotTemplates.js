export const readTemplate = (templateName) => {
  switch(templateName) {

case("Robot 6 Axis RRRRRR"):
return `
M669 K13 AT:RRRRRR AL:XYZUVW
M669 A0:0:0:0:0:0:0:0:0:0
M669 A1:352.0:0:0:0:70:-90:0:-150:150
M669 A2:0:-90:0:0:360:0:0:-60:120
M669 A3:0:0:190:0:0:-90:0:-110:120
M669 A4:190:0:0:0:0:90:0:-90:90
M669 A5:0:0:0:0:0:-90:0:-200:200
M669 A6:65:0:0:0:0:0:0:-185:185
G10 X:0 Y:0 Z:100
`;


case("Open5x PPPRR"):
return `
M669 K13 AT:PPPRR AL:ZXYUV
M669 A0:0:0:0:0:0:0:0:0:0
M669 A1:0:0:0:90:0:0:0:0:500
M669 A2:0:0:0:0:0:-90:0:0:500
M669 A3:0:0:0:0:-100:0:0:0:500
M669 A4:100:0:0:0:0:90:0:-150:150
M669 A5:0:0:0:0:0:0:0:-150:150
G10 X:0 Y:0 Z:100
`;


case("Cartesian 3 Axis PPP"):
return `
M669 K13 AT:PPP AL:ZXY
M669 A0:0:0:0:0:0:0:0:0:0
M669 A1:0:0:0:90:0:0:0:0:500
M669 A2:0:0:0:0:0:-90:0:0:500
M669 A3:0:0:0:90:0:0:0:0:500
G10 X:0 Y:0 Z:100
`;

case("Scara 2 arm RRP"):
return `
M669 K13 AT:PRR AL:ZXY
M669 A0:0:0:0:0:0:0:0:0:0
M669 A1:0:0:0:0:0:180:0:0:300
M669 A2:0:0:0:0:200:0:0:-100:100
M669 A3:0:0:0:0:150:0:0:-100:100
G10 X:0 Y:0 Z:100
`;




  }
}


/*

ok          'Robot 6 Axis RRRRRR',
ok          'Cartesian 3 Axis PPP',
          'Cartesian with Spherical wrist PPPRRR',
ok          'Open5x PPPRR',
          'Scara 2 arm PRR',
          'Anthropomorphic RRR',
          'Stanford manipulator RRPRRR',
          '7 arm cobot RRRRRRR',
          'empty',
*/