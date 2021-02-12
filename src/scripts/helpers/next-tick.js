import { nextTick } from 'vue';

export default function () {
    return new Promise((resolve) => {
        nextTick(() => resolve());
    });
};
