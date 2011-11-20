var scene;
var renderer;
var camera;
var WIDTH = 1024;
var HEIGHT = 768;

function setupScene() {
    var $container = $('#container');

    renderer = new THREE.WebGLRenderer();
    
    scene = new THREE.Scene();

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);
}

function addSphere() {
    var radius = 50;
    var segments = 16;
    var rings = 16;

    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });

    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, rings),
            sphereMaterial);

    scene.add(sphere);
}

function addLights() {    
    var ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    var dl = new THREE.DirectionalLight(0x666060);
    dl.position.set(0, -45, 0).normalize();
    scene.add(dl);
    
    dl = new THREE.DirectionalLight(0x606666);
    dl.position.set(180, 45, 0).normalize();
    scene.add(dl);
    
    dl = new THREE.DirectionalLight(0x606060);
    dl.position.set(90, -45, 0).normalize();
    scene.add(dl);
    
    dl = new THREE.DirectionalLight(0x626262);
    dl.position.set(-90, 45, 0).normalize();
    scene.add(dl);
}

function addCamera() {
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 300;
    scene.add(camera);
}

function init() {
    setupScene();
    //addSphere();
    addLights();
    addCamera();
    
    var loader = new THREE.ColladaLoader();
    loader.load(
            'http://open3dhub.com/download/ccb5e214fc44f8b5985456d4496f6086d8b799bc7963ba6b9b788194bf6c710b/GibsonGuitar.dae',
            /*'http://open3dhub.com/download/c7d6bae9872dc9730e7343eb36b02d21a4f1861522ed137f14d03712ddf970cf/COLLADA.dae',*/
            /*'http://open3dhub.com/download/6cf8a48175ef3fb8e4a3cd4cb066164d3f9606a9f60a4db6249ddbec53ecb24d/multimtl.dae',*/
            /*'http://open3dhub.com/download/8bbe77a45c6125a9aa465258679463bbba89755cb2826f5524563bf00f9a1c08/cube_triangulate.dae',*/
            function colladaReady( collada ) {
        dae = collada.scene;
        //dae.computeBoundingSphere();
        dae.scale = new THREE.Vector3(0.5, 0.5, 0.5);
        scene.add(dae);
        console.log(collada);
        renderer.render(scene, camera);
    });
}

$(document).ready(init);
