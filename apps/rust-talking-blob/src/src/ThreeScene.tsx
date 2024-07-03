import { useEffect, useRef } from "react";
import * as THREE from "three";
// Shape of object - vertexShader
import { vertexShader } from "./Noise";

// Post-processing imports: unreal bloom pass
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

// Speech Detection
// Import the URL to the AudioWorkletProcessor file
//import audioProcessorUrl from './audio-processor';

function addWalls(scene: THREE.Scene) {
  // Creating walls
  const wallMaterialL = new THREE.MeshBasicMaterial({ color: 0xaaaffa }); // Replace with desired material
  const wallMaterialR = new THREE.MeshBasicMaterial({ color: 0xffaffa }); // Replace with desired material
  const wallMaterialF = new THREE.MeshBasicMaterial({ color: 0xaaffaa }); // Replace with desired material
  const wallMaterialC = new THREE.MeshBasicMaterial({ color: 0xaaaaaa }); // Replace with desired material
  const wallMaterialB = new THREE.MeshBasicMaterial({ color: 0xfffffa }); // Replace with desired material

  const wallGeometry = new THREE.PlaneGeometry(100, 100); // Adjust size as needed

  // Back Wall
  const backWall = new THREE.Mesh(wallGeometry, wallMaterialB);
  backWall.position.z = -50; // Half the depth of your room
  scene.add(backWall);

  // Left Wall
  const leftWall = new THREE.Mesh(wallGeometry, wallMaterialL);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -50; // Half the width of your room
  scene.add(leftWall);

  // Right Wall
  const rightWall = new THREE.Mesh(wallGeometry, wallMaterialR);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.x = 50; // Half the width of your room
  scene.add(rightWall);

  // Floor
  const floor = new THREE.Mesh(wallGeometry, wallMaterialF);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -50; // Half the height of your room
  scene.add(floor);

  // Ceiling
  const ceiling = new THREE.Mesh(wallGeometry, wallMaterialC);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 50; // Half the height of your room
}

function readMP3Audio(): { listener: THREE.AudioListener; sound: THREE.Audio } {
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("/audio_file.mp3", function (buffer) {
    sound.setBuffer(buffer);
  });
  return { listener, sound };
}

// async function performSpeechDetection(mediaStreamSource: MediaStreamAudioSourceNode) {
//     // Create a SpeechDetector using all default values.
//     const speechDetector = await SpeechDetector.create();

//     const speechSegments = await speechDetector.process(mediaStreamSource);

//     for await (const segement of speechSegments) {
//         console.log(`Received speech segement: ${segement}`);
//     }
// }

function setupAudioFromFile(audioUrl: string) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.8;

  const audio = new Audio(audioUrl);
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  audio.play();

  return { audioContext, analyser };
}
async function audioContextAndNode(
  useFile: boolean
): Promise<{ audioContext: AudioContext; analyser: AnalyserNode }> {
  if (useFile) {
    return setupAudioFromFile("/yes_we_can_obama.mp3");
  }

  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  return { audioContext, analyser };
}

async function setupAudioProcessing(useFile: boolean) {
  try {
    // create an audioContext and analyser either
    // from the microphone or a chosen file
    // Connect the AudioWorkletNode to the destination (or other nodes)
    //audioWorkletNode.connect(audioContext.destination);

    const { audioContext, analyser } = await audioContextAndNode(useFile);
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    // Load the AudioWorkletModule
    //await audioContext.audioWorklet.addModule(audioProcessorUrl);
    // In your setupAudioProcessing function
    await audioContext.audioWorklet.addModule("/audio-processor.js");

    // Define constraints for audio stream
    const constraints = { audio: true };

    // Request access to the microphone and await the stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Create a MediaStreamAudioSourceNode for the microphone
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // AUDIO WORKLET FOR RAW PCM DATA
    // 1. Create an AudioWorkletNode
    const audioWorkletNode = new AudioWorkletNode(
      audioContext,
      "audio-processor"
    );

    // 2. Connect the source to the AudioWorkletNode
    mediaStreamSource.connect(audioWorkletNode);

    // Connect the AudioWorkletNode to the analyser
    audioWorkletNode.connect(analyser);

    // Return the audio context, analyser, and mediaStreamSource for further processing
    return {
      audioContext,
      analyser,
      mediaStreamSource,
    };
  } catch (err) {
    console.error("Error setting up audio processing:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}

function analyzeAudio(sound: THREE.Audio): THREE.AudioAnalyser {
  const analyser = new THREE.AudioAnalyser(sound, 32);
  return analyser;
}

const fragmentShader = `
varying vec2 vUv;
varying float noise;
uniform sampler2D tExplosion;

float random( vec3 scale, float seed ){
  return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}

void main() {

  // get a random offset
  float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );

  // lookup vertically in the texture, using noise and offset
  // to get the right RGB colour
  vec2 tPos = vec2( 0.0, 1.8 * noise + r );
  vec4 color = texture2D( tExplosion, tPos );

  gl_FragColor = vec4( color.rgb, 1.0 );

}
`;

function addShaderMaterial(): THREE.ShaderMaterial {
  // Custom shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        value: new THREE.TextureLoader().load(
          "/blue_violet_2.png",
          // onLoad callback
          function (_) {
            console.log("Texture loaded successfully");
            // Optionally, you can perform actions here once the texture is loaded
          },
          // onProgress callback
          undefined,
          // onError callback
          function (err) {
            console.error("Error loading texture:", err);
          }
        ),
      },
      time: {
        // float initialized to 0
        value: 0.0,
      },
      u_frequency: {
        value: 9.0,
      },
    },
    vertexShader,
    fragmentShader,
  });
  material.wireframe = true;
  return material;
}

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mountRef.current) {
      const currentMount = mountRef.current;
      const fov = 30;

      // SCENE
      const scene = new THREE.Scene();

      // CAMERA
      const camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 200;

      // MATERIAL
      const material = addShaderMaterial();

      // MESH
      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(40, 80),
        material
      );
      scene.add(mesh);

      // RENDERER
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      // append renderer to the DOM
      currentMount.appendChild(renderer.domElement);

      // RENDER PASS
      const renderScene = new RenderPass(scene, camera);
      const composer = new EffectComposer(renderer);
      composer.addPass(renderScene);

      // CONTROLS
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.5;

      // TIME
      // Create time to represent movement, audio, etc
      const start = Date.now();
      const time = 0.00025 * (Date.now() - start);

      // AUDIO PROCESSING ++ RENDERER
      // Note: setupAudioProcessing is an async function. You should call it from an async useEffect or a separate async function.
      setupAudioProcessing(false).then(({ analyser }) => {
        // RENDER LOOP
        const render = () => {
          // Render the scene
          //  Let there be light
          renderer.render(scene, camera);
          requestAnimationFrame(render);

          // Update material uniforms
          const frequencyData = new Uint8Array(analyser.frequencyBinCount);
          const test = analyser.smoothingTimeConstant;
          analyser.getByteFrequencyData(frequencyData);
          const averageFrequency =
            frequencyData.reduce((sum, value) => sum + value, 0) /
            frequencyData.length;

          // show movement with time
          material.uniforms["time"].value = 0.0003 * (Date.now() - start);
          // show audio frequency variation
          material.uniforms["u_frequency"].value = averageFrequency * 8;
        };

        // performSpeechDetection(mediaStreamSource).then(() => {
        //     // Speech detection setup complete
        //     // Handle speech events here if necessary
        // });
        render();
      });

      // CLEANUP
      return () => {
        // currentMount.removeChild(renderer.domElement);
      };
    }
  }, []);

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
