import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";



gsap.registerPlugin(ScrollTrigger);


// Removing the scroll unitl site loaded
(() => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
})();

// Scene
const scene = new THREE.Scene()

const debug = {};
debug.ambientLight = "#ffffff";
debug.directionalLight = "#ffffff";

//Grouops

const cupModelGroup = new THREE.Group();
scene.add(cupModelGroup);


// Canvas
const canvas = document.querySelector('canvas.webgl')

const updateMaterial = () => {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.roughness = 0.2;
    }
  });
};

const preloaderAnimation = () => {
  const preloader = document.querySelector('.main-loader');
  const logoSVG = document.querySelector('#logo-svg');
  const logoPaths = document.querySelectorAll('#logo-svg path');
  const mainContent = document.querySelector('.main');

  // Prepare initial state
  logoPaths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.strokeOpacity = 0; // Ensure stroke is invisible at start
  });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.7,
        onComplete: () => {
          preloader.style.display = 'none';
          mainContent.style.display = 'block';
          document.body.style.overflow = 'auto';
        }
      });
    }
  });

  // Animate stroke drawing and reveal
  tl.to(logoPaths, {
    strokeDashoffset: 0,
    strokeOpacity: 1, // Fade in stroke during draw
    duration: 1.2,
    stagger: 0.01,
    ease: 'power1.inOut'
  });

  // Animate fill appearance
  tl.to(logoPaths, {
    fillOpacity: 1,
    duration: 1.2,
    ease: 'power1.out'
  }, '+=0');
};



const afterLoadedTheContent = () =>{
    // Split the text into characters
    const split = new SplitText(".page1-footer-right-heading", { type: "chars" });
    const chars = split.chars;

    const tl = gsap.timeline();

    tl.to("nav",{
        opacity: 1,
        duration: 1,
        delay: 0.5,
    });

    
    tl.to(".page1-main>h1",{
        opacity:1,
        // delay: -0.5,
        ease: "power1.out",
        stagger: {
            amount: 1,
            from: "start"
        }
    }, "a");

    tl.to(".page1-heading1", {
        y: 0,
        duration: 0.5
    }, "a");

    tl.to(".page1-para1", {
        y: 0,
        duration: 0.5,
    });

    tl.to(
        model.position,
        {
            y:0.2,
            ease: "power1.out",
            duration: 1,
        },
        "b"
    );

    tl.from(
        model.rotation,
        {
            y: Math.PI *2.2,
            x: Math.PI *1.5,
            ease: "power1.out",
            duration: 1,
            onComplete: () => {
                document.body.style.overflow = "initial";
                document.documentElement.style.overflow = "initial";

                canvas.style.pointerEvents = "initial";
            },
        },
        "b"
    );

    tl.to(".page1-footer-right-heading", {
        opacity: 1,
    }, "b");



}


// Model loader

let checkLoadingStart = true;
const loadingManager = new THREE.LoadingManager(
    //Loaded
    ()=>{
        preloaderAnimation(); 
    setTimeout(() => {
      afterLoadedTheContent(); 
    }, 2500);

    },
    //Progress
    ( itemUrl, itemsLoaded, itemsTotal )=>{
        if (checkLoadingStart) {
            checkLoadingStart = false;
        }
        const progressRatio = itemsLoaded / itemsTotal;
    }
);

const loader = new GLTFLoader(loadingManager);

const isMobile = window.innerWidth < 768;


let model = null
loader.load('./models/Test.glb', (gltf) => {
    model = gltf.scene.children[0];

    // Traverse the model and smooth the normals
    model.traverse((child) => {
        if (child.isMesh) {
            child.geometry.computeVertexNormals();
            child.material.flatShading = false; // Ensure smooth shading
            child.material.needsUpdate = true;
        }
    });

    // Scale based on device
    if (isMobile) {
        model.scale.set(0.8, 0.8, 0.8);
    } else {
        model.scale.set(1.15, 1.15, 1.15);
    }

    // Center and position the model
    const modelBoundingBox = new THREE.Box3().setFromObject(model);
    const modelCenter = new THREE.Vector3();
    modelBoundingBox.getCenter(modelCenter);
    model.position.sub(modelCenter);
    model.position.y = -8;

    scene.add(model);
}, undefined, (error) => {
    console.error('An error occurred loading the model:', error);
});


//MouseMove
const cursor = {};
cursor.x = 0;
cursor.y = 0;

let canRotationFlag = false;
canvas.addEventListener("mousemove", (dets) => {
  cursor.x = dets.clientX / window.innerWidth;
  cursor.y = dets.clientY / window.innerHeight;

  if (cursor.x < 0.5) {
    canRotationFlag = true;
  } else {
    canRotationFlag = false;
  }

  gsap.to(camera.position, {
    x: -cursor.x * 0.7,
    duration: 0.5,
    ease: "linear",
  });
});



// Sizes

// Lights (basic ambient light for visibility)
const ambientLight = new THREE.AmbientLight("#ffffff", 2);
scene.add(ambientLight)

//Directional L
const directionalLight = new THREE.DirectionalLight("#fffff0", 5);
directionalLight.position.set(2,1.5,2);
scene.add(directionalLight);

//DLH
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4.2
scene.add(camera)

//Resize
window.addEventListener("resize", ()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))


//clock
let time = Date.now();

let speed = 0.5;

const tick = () => {

    camera.position.y = (scrollY / sizes.height) * 2;

    // time
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    if(canRotationFlag){
        speed -= deltaTime * 0.001;
    } else {
        speed += deltaTime * 0.001;
    }
    
    // // If the model is loaded, animate it
    if (model) {
        model.rotation.y = speed;
        model.rotation.z = Math.sin(Math.cos(speed*0.2) * 0.2) *1.2;
    }

    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}
tick()
