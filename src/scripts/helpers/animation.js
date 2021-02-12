import { Animation, EasingFunction, QuadraticEase } from '@babylonjs/core';

function determineAnimationType(value) {
  const className = value.getClassName && value.getClassName();
  switch (className) {
    case 'Vector3': return Animation.ANIMATIONTYPE_VECTOR3;
    case 'Color3': return Animation.ANIMATIONTYPE_COLOR3;
    default: return Animation.ANIMATIONTYPE_FLOAT;
  }
}

export default function (mesh, scene, name, keyframes) {
  
  // We will want to know what the last frame is
  let maxFrame = 0;

  // This will map all property targets to their array of keys
  let keysByTarget = {};

  // Loop over the keyframes, which include all properties
  for (const keyframe of keyframes) {

    // Grab the frame #
    const frame = keyframe.frame;

    // Update max frame
    if (frame > maxFrame) {
      maxFrame = frame;
    }

    // Loop over the different targetted properties of the keyframe
    for (const target in keyframe) {

      // Frame is just the frame number, skip it
      if (target == 'frame') { continue; }

      // If there isn't a set of keys for this target, make one
      if (!keysByTarget[target]) {
        keysByTarget[target] = [];
      }

      // Push a new key for this keyframe and target
      keysByTarget[target].push({ frame, value: keyframe[target] });
    }
  }

  // Quadratic ease in and out
  const easing = new QuadraticEase();
  easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  const animations = [];

  // Loop over the different target properties we need to animate
  for (const target in keysByTarget) {

    // Determine the type of animation value based on existing value
    const existingValue = mesh[target];
    const type = determineAnimationType(existingValue);

    // Create the animation
    const animation = new Animation(name + target, target, 60, type);
    animation.setKeys(keysByTarget[target]);
    animation.setEasingFunction(easing);
    animations.push(animation);
  }

  // Run all animations
  return scene.beginDirectAnimation(mesh, animations, 0, maxFrame, false);
};
