var scene, camera, renderer,cube;

var vConsole = new VConsole();

var nextRX=0,nextRY=0;
function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 3);
    
    
    renderer = new THREE.WebGLRenderer({
        antialias:true,
        alpha:true
    });
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);
    document.getElementById("container").appendChild(renderer.domElement);
    
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loadAllTexture(loadCarModel);

    const geometry = new THREE.BoxGeometry( .6, .6, .6 );
    const material = new THREE.MeshStandardMaterial( {color: 0x6698CB} );
    material.metalness = .44;
    material.roughness = 0.4;
    cube = new THREE.Mesh( geometry, material );
    cube.rotation.set(.4,.7,0);
    scene.add( cube );

    addLight();

    loop();


    var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

          nextRY = 0.7+rect.x/320;
          nextRX = 0.4-rect.y/240;
        });
      });
}

function addBox(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}

function addLight(){
    var ambientLight = new THREE.AmbientLight( 0xd5d5d5 );
    ambientLight.intensity=1.1;
    scene.add( ambientLight );

    var bottomRightDirLight = new THREE.DirectionalLight();
    bottomRightDirLight.position.x=5;
    bottomRightDirLight.position.y=3;
    bottomRightDirLight.position.z=-5;
    bottomRightDirLight.intensity=1.3;

    // var helper=new THREE.DirectionalLightHelper(bottomRightDirLight,1);
    // scene.add( helper );
    scene.add( bottomRightDirLight );

    var frontDirLight = new THREE.DirectionalLight(0xffffff);

    frontDirLight.position.x=-5;
    frontDirLight.position.y=5;
    frontDirLight.position.z=5;
    frontDirLight.intensity=1.3;
    //directionalLight.castShadow=true;

    // var helper=new THREE.DirectionalLightHelper(frontDirLight,1);
    // scene.add( helper );
    scene.add( frontDirLight );
    // ?????????????????????45???????????????
}

function loop() {
    requestAnimationFrame(loop);

    cube.rotation.x += (nextRX-cube.rotation.x)/5;
    cube.rotation.y += (nextRY-cube.rotation.y)/5;

    renderer.render(scene, camera);
}

window.onload = init;