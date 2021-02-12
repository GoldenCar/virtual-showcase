import { Color3, Vector3 } from "@babylonjs/core";

export default {
  background: {
    gray: {
      c1: '#e0e0e0',
      c2: '#a0a0a0',
    },
    yellow: {
      c1: '#fff0cc',
      c2: '#fec131',
    },
  },
  ground: {
    yellow: Color3.FromHexString('#F16731'),
    gray: Color3.FromHexString('#c0c0c0'),
  },
  pedestal: {
    yellow: Color3.FromHexString('#C18443').toLinearSpace(),
    gray: Color3.FromHexString('#c0c0c0'),
  }
};
