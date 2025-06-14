import * as THREE from 'three';

/**
 * Creates a circular texture for star particles
 * This approach ensures we don't get square/blocky star artifacts
 */
export function createCircleTexture(size: number = 64, color: string = '#ffffff'): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const context = canvas.getContext('2d');
  if (!context) {
    // Fallback if context can't be created
    return new THREE.Texture();
  }
  
  // Clear the canvas first
  context.fillStyle = 'rgba(0, 0, 0, 0)';
  context.fillRect(0, 0, size, size);
  
  // Create a radial gradient for the star
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;
  
  const gradient = context.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius
  );
  
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, color.replace(')', ', 0.8)'));
  gradient.addColorStop(0.7, color.replace(')', ', 0.3)'));
  gradient.addColorStop(1, color.replace(')', ', 0)'));
  
  // Fill the canvas with the gradient
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  
  // Create and return the texture
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a set of textures for different colored stars
 */
export function createStarTextures(): { [key: string]: THREE.Texture } {
  return {
    primary: createCircleTexture(64, 'rgba(77, 159, 255, 1)'),      // primary-light (#4d9fff)
    secondary: createCircleTexture(64, 'rgba(106, 124, 230, 1)'),   // secondary-light (#6a7ce6)
    accent: createCircleTexture(64, 'rgba(65, 233, 197, 1)'),       // accent-light (#41e9c5)
    white: createCircleTexture(64, 'rgba(255, 255, 255, 1)')
  };
}
