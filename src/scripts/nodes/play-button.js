import { Color3, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import image from 'url:../../images/play-button.png';

let material;
let texture;

export default function (scene) {
    const mesh = MeshBuilder.CreatePlane('PlayButton', { width: 0.5, height: 0.5 }, scene);

    if (!material) {
        material = new StandardMaterial('PlayButtonMaterial', scene);
        material.emissiveColor = Color3.FromHexString('#FFFFFF');
        material.specularPower = 0;
    }

    if (!texture) {
        texture = new Texture(image, scene);
        texture.hasAlpha = true;
        texture.level = 2;
        material.diffuseTexture = texture;
    }
    
    mesh.material = material;

    return mesh;
};
