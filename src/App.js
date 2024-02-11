// Import necessary modules and components from React and Three.js libraries
import { TypeAnimation } from "react-type-animation"; // For text animation
import * as THREE from "three"; // Three.js library for 3D rendering
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"; // React-three-fiber for creating 3D scenes in React
import { Physics, useSphere } from "@react-three/cannon"; // Physics engine for react-three-fiber
import { Environment, Effects as EffectComposer, useTexture } from "@react-three/drei"; // Additional effects and textures for react-three-fiber
import { SSAOPass } from "three-stdlib"; // Screen space ambient occlusion pass for enhancing realism
extend({ SSAOPass }); // Extend Three.js with SSAO pass


console.log("Hello There 🙂");

// Constants for generating random positions for spheres
const rfs = THREE.MathUtils.randFloatSpread;
// Geometry and material for the spheres
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 0.2 });

export const App = () => (
  <>
    {/* Text animation for the top bar */}
    <div id="top_bar">
      <TypeAnimation
        sequence={[
          "Welcome 👋",
          1000,
          "Standby While We Turn This '404' into '2024' 👨🏿‍💻",
          1500,
          () => {}
        ]}
        className="txt_animation"
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: "2em" }}
      />
    </div>

    {/* Main canvas - 3D rendering */}
    <div id="main_canvas">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}>
        {/* Lights, physics, environment, and effects */}
        <ambientLight intensity={0.25} />
        <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
        <directionalLight intensity={5} position={[-10, -10, -10]} color="#2E6DB4" />
        <Physics gravity={[0, 2, 0]} iterations={10}>
          {/* Components for interactive elements */}
          <Pointer />
          <Clump />
        </Physics>
        {/* Environment background */}
        <Environment files="/adamsbridge.hdr" />
        {/* Post-processing effects */}
        <Effects />
      </Canvas>
    </div>

    {/* Name in Background */}
    <div id="myName">
      <h1> Ore Yusuf </h1>
    </div>

    {/* Links to personal website and socials */}
    <div className="linksContainer">
      <a className="links" href="https://oreyusuf.co.uk" target="_blank">
        <svg className="links_logo" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>
      </a>
      <a className="links" href="https://github.com/OreYusuf" target="_blank">
        <svg className="links_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"/></svg>
      </a>
      <a className="links" href="https://www.linkedin.com/in/ore-yusuf/" target="_blank">
        <svg className="links_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"> <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/></svg>
      </a>
    </div>
  </>
);

// Function - generate the instance mesh of spheres
function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {

  // Load texture for the spheres i.e The logo and sphere colour
  const texture = useTexture("clump_images/Logo_GreyBg.jpg");

  // Creating spheres with physics properties
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.3,
    position: [rfs(5), rfs(5), rfs(70)],
  }));

  // Update function for each frame
  useFrame((state) => {
    for (let i = 0; i < 40; i++) {
      // Get current position of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Apply force to drive the sphere towards the center-point
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0]);
    }
  });

  // Render instanced mesh of spheres
  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 40]} geometry={sphereGeometry} material={baubleMaterial} material-map={texture} />;
}

// Function for tracking mouse position and updating sphere position accordingly
function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }));
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0));
}

// Function component for applying post-processing effects
function Effects(props) {
  const { scene, camera } = useThree();
  return (
    <EffectComposer {...props}>
      <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={1.2} kernelSize={0} />
    </EffectComposer>
  );
}
