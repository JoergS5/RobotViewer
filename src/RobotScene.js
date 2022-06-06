import { Engine, Scene, Vector3, ArcRotateCamera, Tools, SceneOptimizerOptions, 
	SceneOptimizer } from "@babylonjs/core";
import { scenes, initMaterials, robotparts, numOfAxes } from './RobotData';
import { showGitter } from './RobotGitter';
import { showCoords } from './RobotCoords';
import {showArms, moveArms } from './RobotArms';
import { showAxes } from './RobotAxes';
import { showRotaryPies } from './RobotRotaryPie';
import { showPrismaticBars } from './RobotPrismaticBar';

import { getForward } from './ForwardCalculate';


export const showAll = () => {
  var scene = scenes[0];
  clearAll();

  getForward();

  showGitter(scene);
  showCoords(scene);
  showArms(scene);
  showAxes(scene);
  showRotaryPies(scene);
  showPrismaticBars(scene);

}

const clearAll = () => {
  robotparts.forEach(function(m) {
    m.dispose();
  });
}

export const initScene = (canvas0) => {

  var engine = new Engine(canvas0);

  var scene = new Scene(engine);
  scene.useRightHandedSystem = true;
  scenes.push(scene);

  let lookat = new Vector3(-500,1000,500);
//  const camera = new ArcRotateCamera("camera1", Tools.ToRadians(90), 
//	Tools.ToRadians(65), 100, lookat, scene);
  const camera = new ArcRotateCamera("camera1", Tools.ToRadians(0), 
	Tools.ToRadians(0), 500, lookat, scene);
//  camera.setTarget(Vector3.Zero());
  camera.setTarget(new Vector3(500,0,-500));

  scene.createDefaultLight();

  scene.detachControl();
  engine.inputElement = canvas0;
  scene.attachControl();
  camera.attachControl(canvas0, true);

  initMaterials();

var options = new SceneOptimizerOptions(1, 100);
//options.addOptimization(new HardwareScalingOptimization(0, 1));
options.targetFrameRate = 100;
//SceneOptimizer.OptimizeAsync(scene, options);
options = SceneOptimizerOptions.LowDegradationAllowed();
//options = SceneOptimizerOptions.ModerateDegradationAllowed(45);

/*
SceneOptimizer.OptimizeAsync(scene, options,
            function() {
//		 alert("optimizer success"); 
		},
            function() { 
		alert("optimizer failure"); 
		});
*/

  engine.runRenderLoop(() => {
    scene.render();
  });




};

export const toggle = (elementStartingWith, visibility0) => {
  robotparts.forEach(function(m) {
      if(m.name.startsWith(elementStartingWith)) {
        m.isVisible = visibility0;
      }
  });
}
