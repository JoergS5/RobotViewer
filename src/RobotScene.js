import { Engine, Scene, Vector3, Color3, HemisphericLight, StandardMaterial,
	ArcRotateCamera, Tools, SceneOptimizer, SceneOptimizerOptions } from "@babylonjs/core";
import { scenes, materials, materialColors, store } from './Store';
import { createGitter, createCoords } from './RobotCoords'
import { createRobotBody } from './RobotArms';
import { showAxes } from './RobotAxes';

export const createScene = (canvas) => {

  const engine = new Engine(canvas);

  const scene = new Scene(engine);
  scene.useRightHandedSystem = true;
  scenes.push(scene);
  scene.clearColor = Color3.Gray();
  scene.createDefaultLight();

  let lookat = new Vector3(1000,0,800);
  const camera = new ArcRotateCamera("camera", Tools.ToRadians(90), 
	Tools.ToRadians(65), 1500, lookat, scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  new HemisphericLight("light", Vector3.Up(), scene);
  new HemisphericLight("HemiLight", new Vector3(1, 0, 0), scene);

  initMaterials(scene);

  createGitter(scene);
  createCoords(scene);
  showAxes();
  createRobotBody(scene);

  SceneOptimizer.OptimizeAsync(scene);
  SceneOptimizerOptions.LowDegradationAllowed();

  engine.runRenderLoop(() => {
    scene.render();
  });

};

const initMaterials = (scene) => {
  const material0 = new StandardMaterial("material0", scene);
  material0.diffuseColor = materialColors[0];
  materials.push(material0);

  const material1 = new StandardMaterial("material1", scene);
  material1.diffuseColor = materialColors[1];
  materials.push(material1);

  const material2 = new StandardMaterial("material2", scene);
  material2.diffuseColor = materialColors[2];
  materials.push(material2);

  const material3 = new StandardMaterial("material3", scene);
  material3.alpha = 0.4;
  material3.diffuseColor = materialColors[3];
  materials.push(material3);

  const material4 = new StandardMaterial("material4", scene);
  material4.alpha = 0.7;
  material4.diffuseColor = materialColors[4];
  materials.push(material4);

  const material5 = new StandardMaterial("material5", scene);
  material5.diffuseColor = materialColors[5];
  materials.push(material5);

}

export const freeze = () => {
  var scene = scenes[0];
  if(scene != null) {
    var engine = scene.getEngine();
    if(store.updateFast) {
      store.updateFast = false;
      engine.stopRenderLoop();
    }
    else {
      store.updateFast = true;
      engine.runRenderLoop(() => {
        scene.render();
      });
    }
  }
}
