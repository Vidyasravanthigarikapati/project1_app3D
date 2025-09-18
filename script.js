require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "dojo/domReady!"
], function(WebScene, SceneView, Camera, Home, GraphicsLayer, Graphic) {

  // --- Existing WebScenes ---
  var chicagoScene = new WebScene({
    portalItem: { id: "9c76c5a0172c4452a7ecb6ff966e9a0a" }
  });

  var bostonScene = new WebScene({
    portalItem: { id: "8046207c1c214b5587230f5e5f8efc77" }
  });

  // --- Graphics Layers for Boston Scene ---
  var landmarksLayer = new GraphicsLayer({ title: "Landmarks" });
  var neighborhoodsLayer = new GraphicsLayer({ title: "Neighborhoods" });

  // --- Add 10+ points (landmarks) with different colors ---
  var landmarkCoordinates = [
    [-71.0589, 42.3601],
    [-71.0605, 42.3581],
    [-71.0620, 42.3610],
    [-71.0550, 42.3625],
    [-71.0575, 42.3595],
    [-71.0540, 42.3570],
    [-71.0590, 42.3630],
    [-71.0610, 42.3640],
    [-71.0560, 42.3550],
    [-71.0630, 42.3565]
  ];

  var landmarkColors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "cyan", "magenta", "lime"];

  landmarkCoordinates.forEach(function(coords, i) {
    landmarksLayer.add(new Graphic({
      geometry: { type: "point", longitude: coords[0], latitude: coords[1] },
      symbol: { type: "simple-marker", color: landmarkColors[i % landmarkColors.length], size: 10 },
      attributes: { NAME: "Landmark " + (i+1), TYPE: "Point of Interest", VISITORS: Math.floor(Math.random()*1000) },
      popupTemplate: {
        title: "{NAME}",
        content: "Type: {TYPE}<br>Visitors: {VISITORS}"
      }
    }));
  });

  // --- Add 10+ polygons (neighborhoods) ---
  var polygonCoordinates = [
    [[-71.065,42.355],[-71.065,42.358],[-71.062,42.358],[-71.062,42.355],[-71.065,42.355]],
    [[-71.060,42.356],[-71.060,42.359],[-71.057,42.359],[-71.057,42.356],[-71.060,42.356]],
    [[-71.054,42.357],[-71.054,42.360],[-71.051,42.360],[-71.051,42.357],[-71.054,42.357]],
    [[-71.058,42.361],[-71.058,42.364],[-71.055,42.364],[-71.055,42.361],[-71.058,42.361]],
    [[-71.062,42.358],[-71.062,42.361],[-71.059,42.361],[-71.059,42.358],[-71.062,42.358]],
    [[-71.057,42.355],[-71.057,42.358],[-71.054,42.358],[-71.054,42.355],[-71.057,42.355]],
    [[-71.053,42.354],[-71.053,42.357],[-71.050,42.357],[-71.050,42.354],[-71.053,42.354]],
    [[-71.061,42.362],[-71.061,42.365],[-71.058,42.365],[-71.058,42.362],[-71.061,42.362]],
    [[-71.056,42.356],[-71.056,42.359],[-71.053,42.359],[-71.053,42.356],[-71.056,42.356]],
    [[-71.059,42.353],[-71.059,42.356],[-71.056,42.356],[-71.056,42.353],[-71.059,42.353]]
  ];

  polygonCoordinates.forEach(function(coords, i) {
    neighborhoodsLayer.add(new Graphic({
      geometry: { type: "polygon", rings: coords },
      symbol: { type: "simple-fill", color: [0,0,255,0.3], outline: { color: "blue", width: 1 } },
      attributes: { NAME: "Neighborhood " + (i+1), POPULATION: 1000 + i*100, AREA: 2 + i*0.5 },
      popupTemplate: {
        title: "{NAME}",
        content: "Population: {POPULATION}<br>Area: {AREA} sq km"
      }
    }));
  });

  // --- Add graphics layers to Boston Scene ---
  bostonScene.add(landmarksLayer);
  bostonScene.add(neighborhoodsLayer);

  // --- SceneView ---
  var view = new SceneView({
    container: "viewDiv",
    map: chicagoScene, // default Chicago
    camera: {
      position: { x: -87.6298, y: 41.8781, z: 800 },
      tilt: 75,
      heading: 30
    }
  });

  // --- Home widget ---
  var homeBtn = new Home({ view: view });
  view.ui.add(homeBtn, "top-left");

  // --- Button Creation (unchanged) ---
  function createUIButton(id, label) {
    var btn = document.createElement("button");
    btn.id = id;
    btn.textContent = label;
    btn.style.marginTop = "8px";
    btn.style.width = "120px";
    btn.style.padding = "6px 8px";
    btn.style.fontSize = "14px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "4px";
    btn.style.border = "1px solid #ccc";
    btn.style.background = "white";
    return btn;
  }

  var chicagoBtn = createUIButton("chicagoBtn", "Chicago Scene");
  var bostonBtn = createUIButton("bostonBtn", "Boston Scene");
  var stlBtn = createUIButton("stl", "Fenway, Boston");
  var beiBtn = createUIButton("bei", "Logan Airport, Boston");
  var v3Btn = createUIButton("v3", "Downtown, Boston");

  var btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.flexDirection = "column";
  btnContainer.style.marginTop = "8px";

  btnContainer.appendChild(chicagoBtn);
  btnContainer.appendChild(bostonBtn);
  btnContainer.appendChild(stlBtn);
  btnContainer.appendChild(beiBtn);
  btnContainer.appendChild(v3Btn);

  view.ui.add(btnContainer, "top-left");

  // --- Button Events ---
  chicagoBtn.addEventListener("click", function() {
    view.map = chicagoScene;
    view.goTo({ position: { x: -87.6298, y: 41.8781, z: 800 }, tilt: 75, heading: 30 });
  });

  bostonBtn.addEventListener("click", function() {
    view.map = bostonScene;
    view.goTo({ position: { x: -71.0589, y: 42.3601, z: 800 }, tilt: 75, heading: 30 });
  });

  stlBtn.addEventListener("click", function() {
    view.goTo({ position: [-71.0972, 42.3467, 1200], tilt: 0, heading: 0 });
  });

  beiBtn.addEventListener("click", function() {
    view.goTo({ position: { x: -71.0186, y: 42.3656, z: 2000 }, tilt: 0, heading: 0 });
  });

  v3Btn.addEventListener("click", function() {
    view.goTo({ position: { x: -71.0325, y: 42.35, z: 3000 }, tilt: 70, heading: 285 });
  });

});
