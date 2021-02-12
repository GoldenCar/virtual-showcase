import { AbstractMesh, FadeInOutBehavior, InstancedMesh, Mesh, SceneLoader } from "@babylonjs/core";
import bus from "../helpers/bus";

export default class GLBNode {

  constructor (filename, name, scene) {
    this.filename = filename;
    this.name = name;
    this.scene = scene;
  }

  async load () {
    const parts = this.filename.split('/');
    const filename = parts.pop();
    const path = parts.join('/') + '/';

    console.log(this.scene);
    return await SceneLoader.ImportMeshAsync('', path, filename, this.scene, this.onProgress.bind(this)).then(this.imported.bind(this));
  }

  onProgress (params) {
    bus.emit('loading', { id: this.filename, loaded: params.loaded, total: params.total });
  }

  imported (data) {
    console.log('GLBNode: Imported ', data);

    this.mesh = data.meshes.find(mesh => mesh.id == '__root__');
    this.mesh.name = this.name;
    this.mesh.id = this.name;

    const light = data.meshes.find(mesh => mesh.id == 'Default light');
    light && light.dispose();

    for (const animationGroup of data.animationGroups) {
      animationGroup.stop();
    }

    if (data.animationGroups[0] && data.animationGroups[0].name == 'All Animations') {
      this.anim = data.animationGroups[0];
      this.anim.name = this.name;
    } else {
      this.anims = data.animationGroups;
    }

    // Find and filter all mesh children in advance
    this.childMeshes = this.mesh
      .getChildMeshes()
      .filter(child => child instanceof Mesh || child instanceof InstancedMesh);

    return this.mesh;
  }

  setVisible (visible) {
    for (const child of this.childMeshes) {
      child.isVisible = visible;
    }
  }
}