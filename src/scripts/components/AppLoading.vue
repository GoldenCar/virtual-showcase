<template>
    <div v-show="progress < 1" class="loading">
        <span>Loading {{ Math.round(progress * 100) }}%</span>
    </div>
</template>

<script>
import CircleProgress from 'vue2-circle-progress';
import bus from '../helpers/bus'

export default {

    components: { CircleProgress },

    data: () => ({
        loaders: {},
    }),

    computed: {
        progress () {
            let loaded = 0;
            let total = 0;

            for (const id in this.loaders) {
                const loader = this.loaders[id];
                loaded += loader.loaded;
                total += loader.total;
            }

            if (loaded == total) {
                this.loaders = {};
            }

            if (total == 0) {
                return 1;
            }

            return loaded / total;
        }
    },

    mounted () {
        bus.on('loading', params => {
            const loader = this.loaders[params.id] || {};

            loader.loaded = params.loaded;
            loader.total = params.total;

            this.loaders = Object.assign({}, this.loaders, { [params.id]: loader });
        });
    }
}
</script>

<style lang="scss" scoped>
.loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(black, 0.8);
}

.loading span {
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
}
</style>