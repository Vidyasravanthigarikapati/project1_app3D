require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/widgets/Search"
], function(WebScene, SceneView, Legend, LayerList) {

  // Web Scene IDs
  const chicagoSceneId = "9c76c5a0172c4452a7ecb6ff966e9a0a";
  const bostonSceneId = "8046207c1c214b5587230f5e5f8efc77";

  // Create WebScenes
  const chicagoScene = new WebScene({ portalItem: { id: chicagoSceneId } });
  const bostonScene = new WebScene({ portalItem: { id: bostonSceneId } });

  // Initialize SceneView 
  const view = new SceneView({
    container: "viewDiv",
    map: chicagoScene,
    camera: {
      position: { x: -87.6298, y: 41.8781, z: 800 },
      tilt: 75,
      heading: 30
    }
  });

  // Add widgets
  const legend = new Legend({ view });
  const layerList = new LayerList({ view });

  view.ui.add(legend, "bottom-left");
  view.ui.add(layerList, "top-left");

  // --- Button Logic ---
  document.getElementById("chicagoBtn").addEventListener("click", () => {
    view.map = chicagoScene;
    view.camera.position = { x: -87.6298, y: 41.8781, z: 800 };
    view.camera.tilt = 75;
    view.camera.heading = 30;
  });

  document.getElementById("bostonBtn").addEventListener("click", () => {
    view.map = bostonScene;
    view.camera.position = { x: -71.0589, y: 42.3601, z: 800 };
    view.camera.tilt = 75;
    view.camera.heading = 30;
  });

});
