import Environment from './environment';

class IndustryEnvironment extends Environment {

  constructor (engine, canvas) {
    super(engine, canvas, {
      model: 'City.glb',
      env: 'bathroom_1k',
    });
  }
}

export default IndustryEnvironment;
