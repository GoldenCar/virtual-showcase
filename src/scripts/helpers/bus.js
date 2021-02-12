import mitt from 'mitt';

const bus = mitt();
window.bus = bus;

export default bus;
