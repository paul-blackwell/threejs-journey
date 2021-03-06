import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight()
directionalLight.color = new THREE.Color(0x00fffc)
directionalLight.intensity = 0.5
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xfff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight()
pointLight.color = new THREE.Color(0xff9000)
pointLight.intensity = 0.5
pointLight.position.set(1, -0.5, 1)
pointLight.distance = 3
pointLight.decay = 1
scene.add(pointLight)

// This only works with MeshStandardMaterial and MeshPhysicalMaterial 
const rectAreaLight = new THREE.RectAreaLight()
rectAreaLight.color = new THREE.Color(0x4e00ff)
rectAreaLight.intensity = 5
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3()) // If you put an empty vector3 its position is 0,0,0 so the center of the scene
rectAreaLight.width = 1
rectAreaLight.height = 1
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight()
spotLight.color = new THREE.Color(0x78ff00)
spotLight.intensity = 0.5
spotLight.distance = 10
spotLight.angle = Math.PI * 0.1
spotLight.penumbra = 0.25
spotLight.decay = 1 // Mainly just use 1 
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

/**
 * We can't use lookAt to change what the spotLight is looking at.
 * For that we need to use the spotLight.target, think of this as
 * a point in space (you can't see in the scene) that the spotLight 
 * is looking at and this is how we will change what the spotLight is
 * looking at.
 */
spotLight.target.position.x = - 0.75
scene.add(spotLight.target)


// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper);
// We have to do this to update the spotLight helper to match the spotLight
window.requestAnimationFrame(() => {
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper)

// GUI light example 
gui.addFolder('Ambient Light').add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient light intensity')
gui.addFolder('Directional Light').add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('Directional light intensity')
gui.addFolder('Hemisphere Light').add(hemisphereLight, 'intensity').min(0).max(1).step(0.001).name('Hemisphere light intensity')
const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.001).name('Point light intensity')
pointLightFolder.add(pointLight, 'distance').min(0).max(5).step(0.001).name('Point light distance')
pointLightFolder.add(pointLight, 'decay').min(0).max(5).step(0.001).name('Point light decay')
gui.addFolder('RectArea Light').add(rectAreaLight, 'intensity').min(0).max(10).step(0.001).name('Rect Area light intensity')
const spotLightFolder = gui.addFolder('Spot Light')
spotLightFolder.add(spotLight, 'intensity').min(0).max(1).step(0.001).name('Spot light intensity')
spotLightFolder.add(spotLight, 'distance').min(0).max(20).step(0.001).name('Spot light distance')
spotLightFolder.add(spotLight, 'angle').min(0).max(1).step(0.001).name('Spot light angle')
spotLightFolder.add(spotLight, 'decay').min(0).max(2).step(0.001).name('Spot light decay')
spotLightFolder.add(spotLight.target.position, 'z').min(0).max(1).step(0.001).name('Spot Light target position x')

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update spotLightHelper (have to do this as if we don't it won't update when we spotLight.target.position in the GUI)
    spotLightHelper.update()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
