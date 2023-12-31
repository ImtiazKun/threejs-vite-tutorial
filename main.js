import './style.css'

// import three as THREE
import * as THREE from 'three'


// Scene
const scene = new THREE.Scene()
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x77ba66 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// write a function to make the cube rotate
const colors = [
  0x77ba66,
  0x66baba,
  0xba6677,
  0x6666ba,
  0xba66ba
]

const tick = () => {
  // Update objects
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  mesh.rotation.z += 0.01
  // change mesh color
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  mesh.material.color.set(randomColor)
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()



window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})


// write a function to make the canvas full screen on double click
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  }
  else {
    document.exitFullscreen()
  }
})
