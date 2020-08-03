
export function cubeModel(canvas, THREE) {
  var camera = new THREE.PerspectiveCamera(30, canvas.width / canvas.height, 0.1, 10000);
  camera.position.z = 5;

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  var light = new THREE.DirectionalLight(0xffff00, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  var geometry = new THREE.BoxGeometry(3, 1, 2);
  //geometry.scale(2, 2, 2); 
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ffff
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(canvas.width, canvas.height);

  function animate() {
    canvas.requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
 
}