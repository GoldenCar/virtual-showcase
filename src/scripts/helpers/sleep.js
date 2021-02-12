import { setDriftlessTimeout } from 'driftless';

export default function sleep(ms) {
  return new Promise(resolve => setDriftlessTimeout(resolve, ms));
}
