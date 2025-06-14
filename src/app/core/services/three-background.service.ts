import { Injectable, ElementRef, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeBackgroundService implements OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId: number | null = null;
  private stars: THREE.Points[] = [];
  private planets: THREE.Mesh[] = [];
  private clock = new THREE.Clock();
  private resizeObserver: ResizeObserver | null = null;
  private containerElement: HTMLElement | null = null;

  constructor(private ngZone: NgZone) {}

  initialize(containerRef: ElementRef<HTMLElement>, starCount: number = 3000): void {
    // Reset the fade parameters each time we initialize with improved settings
    this.fadeStartTime = 60; // Dramatically delay when stars begin to fade (60 seconds)
    this.fadeDuration = 120; // Very long fade duration for extremely subtle effect
    this.isFading = false;
    this.fadeMode = 'initial';
    this.initialOpacities = {
      stars: 0.6, // Very high opacity to ensure stars are always prominently visible
      nebula: 0.30, // Slightly lower initial opacity for nebula
      lights: 0.45  // Track light intensity separately
    };
    
    // Store minimum opacities to maintain good visibility even after fade
    // For stars, set minimum opacity equal to initial opacity to completely prevent fading
    this.minOpacities = {
      stars: 0.6,  // Exactly equal to initial opacity to ensure stars never fade at all
      nebula: 0.02, // Minimum nebula opacity
      lights: 0.08  // Minimum light intensity
    };
    
    // Reset all state variables for clean initialization
    this.isInitialized = false;
    this.frameCount = 0;
    this.containerElement = containerRef.nativeElement;
    const { width, height } = this.getDimensions();
    
    // Scene setup with optimized parameters
    this.scene = new THREE.Scene();
    
    // Camera setup with slightly wider field of view for more immersive galaxy
    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    this.camera.position.z = 20;
    
    // Enhanced renderer setup with improved performance settings
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump', // Good balance between quality and performance
      premultipliedAlpha: true, // Better blending for our particle effects
      stencil: false, // Disable stencil buffer as we don't need it (performance gain)
      depth: true     // Keep depth testing for proper 3D rendering
    });
    
    // Setup adaptive pixel ratio handling
    this.setupPixelRatioHandler();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Improved loading sequence with better error handling
    if (this.containerElement) {
      try {
        // Add the canvas to the DOM
        this.containerElement.appendChild(this.renderer.domElement);
        
        // Start with a black background while loading
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.render(this.scene, this.camera);
        
        // Improved staged initialization process
        const prepareScene = () => {
          // Pre-create textures to ensure they're ready
          const textures = this.createStarTextures();
          
          // Create galaxy elements in proper sequence
          this.createStarfield(starCount);
          this.createSecondaryStarfield(starCount / 2, textures['white']);
          this.createPlanets();
          
          // Transition to transparent background after resources are created
          this.renderer.setClearColor(0x000000, 0);
          
          // Initial render without animation to prevent flickering
          this.renderer.render(this.scene, this.camera);
          
          // Now start the animation loop with proper timing
          this.clock.start(); // Reset clock when animation starts
          this.ngZone.runOutsideAngular(() => {
            this.animate();
          });
        };
        
        // Use a carefully timed delay to ensure proper initialization
        // Slightly longer delay for more complex galaxy effect
        setTimeout(prepareScene, 150);
      } catch (error) {
        console.error('Error initializing three.js background:', error);
        // Recovery mode - ensure we don't leave partially initialized resources
        this.cleanup();
      }
    }
    
    // Setup resize handling with debounce for better performance
    this.setupResizeHandling();
  }
  
  // Setup enhanced resize handling with debounce
  private setupResizeHandling(): void {
    // Only create a new observer if needed
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    let resizeTimeout: any = null;
    
    this.resizeObserver = new ResizeObserver(() => {
      // Debounce resize events for better performance
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      resizeTimeout = setTimeout(() => {
        this.onWindowResize();
      }, 150); // Wait until resizing stops for 150ms
    });
    
    if (this.containerElement) {
      this.resizeObserver.observe(this.containerElement);
    }
  }
  
  private getDimensions(): { width: number, height: number } {
    if (!this.containerElement) {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    
    return {
      width: this.containerElement.clientWidth,
      height: this.containerElement.clientHeight
    };
  }
  
  private createStarfield(count: number): void {
    // Create optimized star textures for each theme color
    const starTextures = this.createStarTextures();
    
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: number[] = [];
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    // Natural star colors - using colors that actual stars have in the night sky
    const starColors = [
      [0.95, 0.95, 0.95],  // bright white
      [0.95, 0.97, 1.00],  // blue-white (hot stars)
      [1.00, 0.98, 0.85],  // yellow-white (sun-like)
      [1.00, 0.95, 0.90],  // orange-white (cooler stars)
      [0.85, 0.90, 1.00]   // blue tint (bright stars)
    ];
    
    // Include a small percentage of "special" stars for visual interest
    const specialStarChance = 0.03; // 3% chance of special star
    
    for (let i = 0; i < count * 3; i += 3) {
      // Position stars with improved distribution for a more natural starfield
      // Use cubic distribution for more stars toward center, fewer at edges
      const theta = Math.random() * Math.PI * 2; // Angle around sphere
      const phi = Math.acos((Math.random() * 2) - 1); // Angle from top to bottom
      
      // Randomized distance (cube distribution for more natural star field)
      const distance = Math.pow(Math.random(), 1/3) * 600;
      
      positions[i] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = distance * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = distance * Math.cos(phi);
      
      // Varied velocity based on distance from center for parallax effect
      const distanceNormalized = distance / 600;
      const velocity = Math.random() * 0.12 * (1 - distanceNormalized * 0.5);
      velocities.push(velocity);
      
      // Special stars are slightly larger and brighter
      const isSpecialStar = Math.random() < specialStarChance;
      
      // More varied size distribution with most stars being smaller
      const baseSize = Math.pow(Math.random(), 1.5) * 2.0 + 0.5; // Power distribution favors smaller stars
      sizes[i/3] = isSpecialStar ? baseSize * 1.8 : baseSize; // Special stars are larger
      
      // Apply theme colors to stars with subtle variation
      // Select colors with appropriate weighting (more common/less common colors)
      let colorIndex;
      if (isSpecialStar) {
        // Special stars use the brighter, whiter colors (first two)
        colorIndex = Math.floor(Math.random() * 2); 
      } else {
        // Regular stars use full color range with appropriate weighting
        const colorRoll = Math.random();
        if (colorRoll < 0.45) {
          colorIndex = 0; // 45% bright white stars
        } else if (colorRoll < 0.70) {
          colorIndex = 1; // 25% blue-white stars
        } else if (colorRoll < 0.85) {
          colorIndex = 2; // 15% yellow-white stars
        } else if (colorRoll < 0.95) {
          colorIndex = 3; // 10% orange-white stars
        } else {
          colorIndex = 4; // 5% blue-tinted stars
        }
      }
      
      const color = starColors[colorIndex];
      
      // Add slight variation to color for more realistic starfield
      const variation = isSpecialStar ? 0.05 : 0.1; // Less variation in special stars for purer color
      colors[i] = color[0] + (Math.random() * variation - variation/2);      // R
      colors[i + 1] = color[1] + (Math.random() * variation - variation/2);  // G
      colors[i + 2] = color[2] + (Math.random() * variation - variation/2);  // B
    }
    
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starGeo.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(velocities), 1));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create star material with custom shader that uses the texture and colors
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        starTexture: { value: starTextures['white'] }
      },
      vertexShader: `
        attribute float size;
        attribute float velocity;
        attribute vec3 color;
        varying float vVelocity;
        varying vec3 vColor;
        void main() {
          vVelocity = velocity;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D starTexture;
        varying float vVelocity;
        varying vec3 vColor;
        void main() {
          // Calculate distance from center of point (for circular shape)
          float distance = length(gl_PointCoord - vec2(0.5));
          
          // Create smooth circular edge with soft falloff
          if (distance > 0.5) {
            discard; // Discard pixels outside circle radius
          }
          
          // Get texture color and apply smooth edge falloff
          vec4 texColor = texture2D(starTexture, gl_PointCoord);
          
          // Additional discard for partially transparent pixels to prevent blockiness
          if (texColor.a < 0.05) discard;
          
          // Compute brightness based on distance from center for a more natural glow
          // Use a gentler power value for brighter, more visible stars
          float brightness = smoothstep(0.5, 0.0, distance);
          brightness = pow(brightness, 1.5); // Softer falloff for brighter stars
          brightness *= 1.0; // Full brightness to make stars more prominent
          
          // Apply the star's color with the brightness falloff and texture
          // Increase alpha for more visibility
          gl_FragColor = vec4(vColor * brightness, brightness * 0.95) * texColor;
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    this.scene.add(stars);
    this.stars.push(stars);
    
    // Create a second smaller layer of stars for depth
    this.createSecondaryStarfield(count / 2, starTextures['white']);
  }
  
  private createSecondaryStarfield(count: number, starTexture: THREE.Texture): void {
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: number[] = [];
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count * 3; i += 3) {
      // Position closer to camera for parallax effect
      positions[i] = (Math.random() - 0.5) * 300;
      positions[i + 1] = (Math.random() - 0.5) * 300;
      positions[i + 2] = (Math.random() - 0.5) * 300;
      
      // Faster velocity for closer stars
      velocities.push(Math.random() * 0.2 + 0.1);
      
      // Smaller size for background stars
      sizes[i/3] = Math.random() * 1.5 + 0.3;
    }
    
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starGeo.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(velocities), 1));
    
    // Update initial opacity tracking
    const secondaryStarOpacity = 0.3;
    this.initialOpacities.stars = Math.min(secondaryStarOpacity, this.initialOpacities.stars);
    
    // Use texture-based material for secondary stars with additional optimizations
    // and reduced opacity for a more subtle effect
    const starMaterial = new THREE.PointsMaterial({
      size: 0.8, // Slightly smaller stars
      map: starTexture,
      transparent: true,
      opacity: secondaryStarOpacity, // Reduced opacity for subtlety
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
      alphaTest: 0.1, // Add alpha test to avoid rendering transparent pixels
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    this.scene.add(stars);
    this.stars.push(stars);
  }
  
  private createPlanets(): void {
    // Instead of planets, let's create a cosmic nebula effect with theme colors
    this.createNebula();
    
    // Add ambient light for general illumination with reduced intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    
    // Add subtle point lights with theme colors to create a dynamic effect
    this.addThemeColoredLights();
  }
  
  private createNebula(): void {
    // Create a more dynamic galaxy-like nebula with multiple particle systems
    // Using even more subdued colors and refined opacity levels
    
    // Primary galaxy arm (blue tint)
    this.createParticleCloud(0x2a5080, 500, 100, 0.28); // Deeper, less saturated blue
    
    // Secondary galaxy arm (purple-blue tint)
    this.createParticleCloud(0x39426c, 400, 120, 0.24); // More subdued purple-blue
    
    // Galaxy core and outer regions (teal/green accent)
    this.createParticleCloud(0x1f5952, 300, 80, 0.25); // Darker teal
    
    // Add sparse galaxy dust particles (very subtle)
    this.createGalaxyDustParticles();
    
    // Add a subtle cosmic fog with a deeper space color
    const fog = new THREE.FogExp2(0x080e1a, 0.001); // Darker, less saturated fog
    this.scene.fog = fog;
  }
  
  private createGalaxyDustParticles(): void {
    // Create very small, sparse dust particles for additional depth in the galaxy
    const dustTexture = this.createCircleTexture(32, 'rgba(180, 190, 210, 0.5)');
    const dustGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Create spiral arm distribution
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Use spiral distribution for galaxy-like structure
      const radius = 30 + Math.random() * 50; // Distance from center
      const armAngle = Math.random() * Math.PI * 20; // Spiral winding
      const theta = Math.random() * Math.PI * 2; // Position along arm
      
      // Apply spiral arm equation with some randomness
      const spiralFactor = 0.1 + Math.random() * 0.3;
      const armOffset = (Math.random() - 0.5) * 30; // Random offset from perfect spiral
      
      // Create elegant spiral pattern
      positions[i] = radius * Math.cos(theta + radius * spiralFactor) + armOffset * Math.cos(armAngle);
      positions[i + 1] = (Math.random() - 0.5) * 15; // Flattened galaxy profile
      positions[i + 2] = radius * Math.sin(theta + radius * spiralFactor) + armOffset * Math.sin(armAngle);
      
      // Very small particles
      sizes[i/3] = Math.random() * 0.8 + 0.2;
    }
    
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Ultra-subtle material for dust particles
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.4,
      map: dustTexture,
      transparent: true,
      opacity: 0.15, // Very low opacity
      alphaTest: 0.05,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    
    // Slight random rotation for more organic look
    dustParticles.rotation.x = Math.random() * 0.2;
    dustParticles.rotation.z = Math.random() * 0.2;
    
    // Add very slow rotation animation
    (dustParticles as any).rotationSpeed = 0.0001;
    
    this.scene.add(dustParticles);
    this.planets.push(dustParticles as unknown as THREE.Mesh);
  }
  
  private createParticleCloud(color: number, count: number, size: number, opacity: number): void {
    // Store the initial opacity value for the nebula
    this.initialOpacities.nebula = Math.min(opacity, this.initialOpacities.nebula);
    
    // Create a particle texture with better quality and alpha settings
    const particleTexture = this.createCircleTexture(128, `rgba(255, 255, 255, 1)`);
    
    // Create particles for nebula cloud effect
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(count * 3);
    const particleSizes = new Float32Array(count);
    
    for (let i = 0; i < count * 3; i += 3) {
      // Position particles in a cloud formation
      const radius = 40 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = (Math.random() - 0.5) * 20 + (radius * Math.sin(phi) * Math.sin(theta) * 0.2);
      particlePositions[i + 2] = radius * Math.cos(phi);
      
      // Random size for each particle
      particleSizes[i/3] = Math.random() * 3 + 1;
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Create particle material with texture to ensure circular particles
    const particleMaterial = new THREE.PointsMaterial({
      color,
      size: size / 100,
      map: particleTexture,
      transparent: true,
      opacity,
      alphaTest: 0.1, // Add alpha test to avoid rendering transparent pixels
      alphaMap: particleTexture, // Use the same texture as alphaMap for better circular shape
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeo, particleMaterial);
    
    // Add random rotation to give more dynamic look
    particles.rotation.x = Math.random() * Math.PI;
    particles.rotation.z = Math.random() * Math.PI;
    
    // Store reference for animation
    (particles as any).rotationSpeed = (Math.random() - 0.5) * 0.001;
    
    this.scene.add(particles);
    this.planets.push(particles as unknown as THREE.Mesh); // Reuse planets array for animation
  }
  
  private addThemeColoredLights(): void {
    // Add extremely subtle lights with refined theme colors and even lower intensity
    // Simulate lighting from the galaxy core and arms with appropriate positioning
    
    // Galaxy core light (central, brighter)
    const coreLight = new THREE.PointLight(0x2a5080, 0.4, 120);
    coreLight.position.set(5, 5, 40);
    this.scene.add(coreLight);
    
    // Primary spiral arm light (offset)
    const primaryArmLight = new THREE.PointLight(0x39426c, 0.35, 100);
    primaryArmLight.position.set(-25, -8, 20);
    this.scene.add(primaryArmLight);
    
    // Secondary spiral arm light (opposite direction)
    const secondaryArmLight = new THREE.PointLight(0x1f5952, 0.3, 100);
    secondaryArmLight.position.set(25, 10, 25);
    this.scene.add(secondaryArmLight);
    
    // Ambient light from distant stars (very low intensity)
    const ambientLight = new THREE.AmbientLight(0x121620, 0.25);
    this.scene.add(ambientLight);
    
    // Add a subtle, slow pulsing effect to the core light to simulate galaxy core energy
    (coreLight as any).pulseParams = {
      baseIntensity: coreLight.intensity,
      pulseSpeed: 0.00015, // Very slow pulse
      pulseAmount: 0.15    // Subtle pulse amount (15% variation)
    };
  }
  
  // Flag to track if the animation has stabilized
  private isInitialized = false;
  private frameCount = 0;
  
  // Properties for fading effect with more fine-grained control
  private fadeStartTime = 12; // Start fading slightly earlier (12 seconds)
  private fadeDuration = 40; // Longer fade duration for more subtle effect
  private isFading = false;
  private fadeMode: 'initial' | 'primary' | 'final' = 'initial';
  private initialOpacities = {
    stars: 0.25, // Slightly lower initial opacity for stars
    nebula: 0.30, // Slightly lower initial opacity for nebula
    lights: 0.45  // Track light intensity separately
  };
  private minOpacities = {
    stars: 0.02, // Maintain minimal visibility
    nebula: 0.02, // Maintain minimal visibility
    lights: 0.08  // Maintain minimal lighting
  };
  
  private animate(): void {
    // Stop animation if service is being destroyed
    if (this.isDestroying) return;
    
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    
    // During the first few frames, we'll just render the scene without animation
    // to avoid the blocky rendering artifacts during initialization
    if (this.frameCount < 5) {
      this.frameCount++;
      
      // Basic render without animation during initialization
      if (this.renderer) {
        this.renderer.render(this.scene, this.camera);
      }
      
      // Skip the rest of the animation logic during initialization frames
      return;
    }
    
    // Set initialization flag after first few frames
    if (!this.isInitialized && this.frameCount >= 5) {
      this.isInitialized = true;
    }
    
    // Animate stars - create parallax effect by moving at different speeds
    this.stars.forEach((starLayer, layerIndex) => {
      // Skip if geometry attributes aren't set up properly
      if (!starLayer.geometry.attributes['position'] || 
          !starLayer.geometry.attributes['velocity']) {
        return;
      }
      
      const positions = starLayer.geometry.attributes['position'] as THREE.BufferAttribute;
      const velocities = starLayer.geometry.attributes['velocity'] as THREE.BufferAttribute;
      
      // Different movement patterns for different star layers
      for (let i = 0; i < positions.count; i++) {
        // For first layer (main stars), add slight x/y movement
        if (layerIndex === 0) {
          // Create a subtle wave effect
          const xOffset = Math.sin(elapsedTime * 0.1 + i * 0.01) * 0.05;
          const yOffset = Math.cos(elapsedTime * 0.1 + i * 0.01) * 0.05;
          positions.setX(i, positions.getX(i) + xOffset);
          positions.setY(i, positions.getY(i) + yOffset);
        }
        
        // Move stars toward camera to create zoom effect
        positions.setZ(i, positions.getZ(i) + velocities.getX(i));
        
        // If star goes behind camera, reset it to a far distance
        if (positions.getZ(i) > 20) {
          positions.setZ(i, (Math.random() - 0.5) * (layerIndex === 0 ? 600 : 300) - 300);
          
          // Randomize x/y position when recycling stars
          positions.setX(i, (Math.random() - 0.5) * (layerIndex === 0 ? 600 : 300));
          positions.setY(i, (Math.random() - 0.5) * (layerIndex === 0 ? 600 : 300));
        }
      }
      
      positions.needsUpdate = true;
    });
    
    // Animate nebula and galaxy particles with optimized effects
    this.planets.forEach((object) => {
      // Skip if object or material isn't defined properly
      if (!object) return;
      
      const obj = object as any;
      
      // Apply gentle rotation to particle clouds for nebula/galaxy effect
      // Different types of particles get different rotation patterns
      if (obj.rotationSpeed !== undefined) {
        const baseSpeed = obj.rotationSpeed;
        
        // Create varying rotation speeds based on particle system type
        if (obj.type === 'Points' && obj.geometry.attributes.position.count > 700) {
          // For galaxy dust/nebula particles - slower, more gentle rotation
          object.rotation.y += baseSpeed * 0.8;
          object.rotation.x += baseSpeed * 0.3;
        } else {
          // For main nebula/galaxy structure - standard rotation
          object.rotation.y += baseSpeed;
          object.rotation.x += baseSpeed * 0.5;
        }
      }
      
      // Add pulsing effect to particle clouds with varied patterns
      if (object.type === 'Points' && object.material) {
        const material = object.material as THREE.PointsMaterial;
        if (material && material.opacity !== undefined) {
          // Get original object index for varied pulse patterns
          const objectIndex = this.planets.indexOf(object);
          
          // Create unique pulsing for each particle system
          // Each system pulses at a slightly different rate for a more organic look
          const pulseRate = 0.0002 + (objectIndex * 0.00005);
          const pulseOffset = objectIndex * Math.PI / 4; // Offset pulses
          
          // Reduced pulse range for subtlety
          const pulseMin = material.opacity * 0.8;
          const pulseMax = material.opacity * 1.15;
          
          // Use sin wave with offset for smooth transitions
          material.opacity = pulseMin + (Math.sin(elapsedTime * pulseRate * 1000 + pulseOffset) + 1) * 0.5 * (pulseMax - pulseMin);
        }
      }
    });
    
    // Add pulsing effect to galaxy core light
    this.scene.traverse(object => {
      if (object.type === 'PointLight') {
        const light = object as THREE.PointLight;
        const pulseParams = (object as any).pulseParams;
        
        if (pulseParams) {
          // Apply subtle pulsing to core light
          const pulseFactor = Math.sin(elapsedTime * pulseParams.pulseSpeed * 1000) * 0.5 + 0.5;
          light.intensity = pulseParams.baseIntensity * (1 + pulseFactor * pulseParams.pulseAmount);
        }
      }
    });
    
    // Slowly rotate the camera around the scene
    this.camera.position.x = Math.sin(elapsedTime * 0.1) * 5;
    this.camera.position.z = 20 + Math.cos(elapsedTime * 0.1) * 5;
    this.camera.lookAt(0, 0, 0);
    
    // Enhanced multi-phase fading effect that's more subtle and graceful
    // First check if we should start fading
    if (elapsedTime > this.fadeStartTime && !this.isFading) {
      this.isFading = true;
      this.fadeMode = 'primary';
    }
    
    if (this.isFading) {
      // Calculate fade progress with easing function for more natural transition
      const rawProgress = Math.min(1, (elapsedTime - this.fadeStartTime) / this.fadeDuration);
      
      // Apply an easing function (ease-out cubic) for smoother, more natural fade
      // This creates a quicker initial fade that slows down toward the end
      const fadeProgress = 1 - Math.pow(1 - rawProgress, 3);
      
      // Stars should always remain visible - apply only a very minimal fade to stars
      this.stars.forEach((starLayer, layerIndex) => {
        if (starLayer.material) {
          const material = starLayer.material as THREE.Material;
          if ('opacity' in material) {
            const initialOpacity = this.initialOpacities.stars;
            const minOpacity = this.minOpacities.stars;
            
            // Apply only a very slight reduction in opacity for stars (at most 20% fade)
            // This ensures stars always remain prominently visible throughout the animation
            const maxStarFade = 0.2; // Limit star fading to at most 20% of their initial opacity
            const layerFactor = layerIndex === 0 ? 0.15 : 0.1; // Drastically reduced fading for stars
            const targetOpacity = initialOpacity * (1 - (fadeProgress * layerFactor * maxStarFade));
            
            // Ensure we don't go below minimum opacity (which is already higher)
            (material as any).opacity = Math.max(minOpacity, targetOpacity);
          }
        }
      });
      
      // Apply fading to nebula clouds with pulsing preserved at lower opacity
      this.planets.forEach(planet => {
        if (planet.material) {
          const material = planet.material as THREE.Material;
          if ('opacity' in material) {
            const initialOpacity = this.initialOpacities.nebula;
            const minOpacity = this.minOpacities.nebula;
            
            // Fade nebula more gradually than stars for depth effect
            const targetOpacity = initialOpacity * (1 - fadeProgress * 0.65);
            
            // Ensure we don't go below minimum opacity
            (material as any).opacity = Math.max(minOpacity, targetOpacity);
          }
        }
      });
      
      // Apply fading to lights with color-temperature shift (becomes slightly warmer as it fades)
      this.scene.traverse(object => {
        if (object.type === 'PointLight') {
          const light = object as THREE.PointLight;
          const initialIntensity = this.initialOpacities.lights; 
          const minIntensity = this.minOpacities.lights;
          
          // Reduce light intensity more gradually
          const targetIntensity = initialIntensity * (1 - fadeProgress * 0.75);
          light.intensity = Math.max(minIntensity, targetIntensity);
          
          // Optional: Subtly shift color temperature as it fades (warmer tone)
          // This creates an evening-like effect as the scene dims
          if (light.color) {
            // Create a properly typed HSL object
            const hsl = { h: 0, s: 0, l: 0 };
            light.color.getHSL(hsl);
            // Slightly reduce saturation as it fades (subtle effect)
            hsl.s = Math.max(0.2, hsl.s * (1 - fadeProgress * 0.3));
            light.color.setHSL(hsl.h, hsl.s, hsl.l);
          }
        }
      });
    }
    
    // Only render if the renderer exists
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }
  
  private onWindowResize(): void {
    if (this.containerElement) {
      const { width, height } = this.getDimensions();
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }
  
  // Track if the service is being destroyed to prevent animation glitches
  private isDestroying = false;

  // Cleanup method for error handling during initialization
  private cleanup(): void {
    // Mark as destroying to prevent animation frames from running
    this.isDestroying = true;
    
    // Clean up resources
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    if (this.resizeObserver && this.containerElement) {
      this.resizeObserver.unobserve(this.containerElement);
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    // Clean up any existing Three.js resources
    if (this.scene) {
      this.scene.traverse(object => {
        // Dispose geometries
        if ((object as THREE.Mesh).geometry) {
          (object as THREE.Mesh).geometry.dispose();
        }
        
        // Dispose materials
        if ((object as THREE.Mesh).material) {
          const material = (object as THREE.Mesh).material;
          
          // Handle both array of materials and single material
          if (Array.isArray(material)) {
            material.forEach(mat => this.disposeMaterial(mat));
          } else {
            this.disposeMaterial(material);
          }
        }
      });
    }
    
    // Clear references
    this.stars = [];
    this.planets = [];
    
    // Remove canvas if it exists
    if (this.containerElement && this.renderer && this.renderer.domElement) {
      if (this.containerElement.contains(this.renderer.domElement)) {
        this.containerElement.removeChild(this.renderer.domElement);
      }
    }
    
    // Dispose of renderer
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null as any;
    }
  }
  
  ngOnDestroy(): void {
    // Use the cleanup method for consistency
    this.cleanup();
  }
  
  private disposeMaterial(material: THREE.Material): void {
    // Dispose any textures in the material
    for (const key in material) {
      const value = (material as any)[key];
      if (value && value.isTexture) {
        value.dispose();
      }
    }
    
    // Dispose the material itself
    material.dispose();
  }
  
  // Creates a circular texture for particles to avoid square blocks
  private createCircleTexture(size: number = 64, color: string = '#ffffff'): THREE.Texture {
    // Always use power-of-2 sizes for optimal GPU texture handling (64, 128, 256)
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    if (!context) {
      // Fallback if context can't be created
      return new THREE.Texture();
    }
    
    // Clear the canvas first - fully transparent black
    context.clearRect(0, 0, size, size);
    
    // Create a radial gradient for the star with perfect centering
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    
    // Process color input to ensure consistent format
    const baseColor = color.startsWith('rgb') ? color : color;
    const colorWithoutAlpha = baseColor.replace(/rgba?\(|\).*$/g, '').split(',').slice(0, 3).join(',');
    
    // Create ultra-smooth gradient with proper alpha transitions and anti-aliasing
    const gradient = context.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    
    // Even more carefully constructed gradient stops for smoother star rendering
    // with extremely subtle falloff for perfect circular shape
    gradient.addColorStop(0.0, `rgba(${colorWithoutAlpha}, 1.0)`);     // Core (full opacity for brighter stars)
    gradient.addColorStop(0.1, `rgba(${colorWithoutAlpha}, 0.6)`);     // Inner core
    gradient.addColorStop(0.2, `rgba(${colorWithoutAlpha}, 0.5)`);     // Near core (reduced opacity)
    gradient.addColorStop(0.35, `rgba(${colorWithoutAlpha}, 0.3)`);    // Mid region (reduced opacity)
    gradient.addColorStop(0.5, `rgba(${colorWithoutAlpha}, 0.15)`);    // Outer mid region
    gradient.addColorStop(0.7, `rgba(${colorWithoutAlpha}, 0.08)`);    // Outer region (very subtle)
    gradient.addColorStop(0.85, `rgba(${colorWithoutAlpha}, 0.03)`);   // Very faint edge
    gradient.addColorStop(1.0, `rgba(${colorWithoutAlpha}, 0.0)`);     // Full transparency
    
    // Enable high-quality anti-aliasing for smoother edges
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    
    // Fill the canvas with the gradient using a circular path for perfect edges
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
    
    // Create and return the texture with optimal settings for star particles
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    texture.premultiplyAlpha = true;      // Better blending with premultiplied alpha
    texture.minFilter = THREE.LinearFilter;  // Better for particle rendering
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;      // No need for mipmaps on particles
    texture.anisotropy = 1;               // Minimal anisotropic filtering for particles
    // Use colorSpace instead of encoding for newer Three.js versions
    texture.colorSpace = 'srgb';
    
    return texture;
  }
  
  // Creates textures for different colored stars with natural brightness for dark backgrounds
  // and additional optimizations for smoother rendering
  private createStarTextures(): { [key: string]: THREE.Texture } {
    // Create a base star texture to be reused - brighter white for main stars
    const baseTexture = this.createCircleTexture(128, 'rgba(255, 255, 255, 0.9)');
    
    // Return natural star textures with higher brightness and opacity
    return {
      // Natural star colors with maximum opacity for guaranteed visibility on dark backgrounds
      primary: this.createCircleTexture(64, 'rgba(255, 255, 255, 1.0)'),    // pure white stars at full opacity
      secondary: this.createCircleTexture(64, 'rgba(240, 248, 255, 1.0)'),  // blue-white hot stars at full opacity
      accent: this.createCircleTexture(64, 'rgba(255, 253, 230, 1.0)'),     // yellow-white stars at full opacity
      lavender: this.createCircleTexture(64, 'rgba(255, 243, 230, 1.0)'),   // orange-white stars at full opacity
      mauve: this.createCircleTexture(64, 'rgba(230, 240, 255, 1.0)'),      // bright blue stars at full opacity
      
      // General white star with perfect circular shape
      white: this.createCircleTexture(64, 'rgba(250, 250, 255, 1.0)')      // bright white
    };
  }
  
  // Handle pixel ratio changes (e.g., when moving between different displays)
  private setupPixelRatioHandler(): void {
    const handlePixelRatioChange = () => {
      if (this.renderer) {
        // Set a safer pixel ratio (max 2) to prevent rendering issues on high-DPI displays
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.renderer.setPixelRatio(pixelRatio);
        
        // Update the projection when pixel ratio changes
        if (this.camera) {
          this.camera.updateProjectionMatrix();
        }
      }
    };
    
    // Set initial pixel ratio
    handlePixelRatioChange();
    
    // Monitor for changes (e.g., when moving window between displays with different DPIs)
    window.matchMedia('screen and (min-resolution: 2dppx)').addEventListener('change', handlePixelRatioChange);
    window.addEventListener('devicePixelRatio:change', handlePixelRatioChange, { passive: true });
  }
}
