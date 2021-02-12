import { Matrix, Vector3 } from "@babylonjs/core";

export default function (mesh, offset, camera, scene, engine) {

    const tracker = {};

    const width = engine.getRenderWidth();
    const height = engine.getRenderHeight();
    const scale = engine.getHardwareScalingLevel();

    const observer = function () {
        if (!tracker.onUpdate) { return; }

        const worldMatrix = mesh.computeWorldMatrix(false);
        const viewport = camera.viewport.toGlobal(width, height);

        const result = Vector3.Project(offset, worldMatrix, scene.getTransformMatrix(), viewport);

        tracker.onUpdate(result.x * scale, result.y * scale);
    };

    scene.onAfterRenderObservable.add(observer);

    tracker.destroy = () => {
        tracker.onUpdate = null; // TODO: Look into why the below doesn't seem to work
        scene.onAfterRenderObservable.remove(observer);
    };

    return tracker;
};
