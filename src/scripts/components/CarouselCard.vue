<template>
    <div class="carousel-card" :class="[ { active }, direction ]">
        <!-- <div class="ghost-name">{{ name }}</div> -->
        <img :src="image" :alt="'Surface ' + name">
        <h2>Surface <b>{{ name }}</b></h2>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        image: String,
        direction: String,
        active: false,
    }
}
</script>

<style lang="scss" scoped>
.carousel-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin: 0 auto;
    padding: 0 0 40px;
    width: 100%;
    height: 640px;
    // background: white;
    // border-radius: 12px;
    transform: scale(0.5) translateY(-150px);
    transition: 0.75s all;

    &.vertical {
        width: 240px;
        height: 240px;
    }

    .ghost-name {
        position: absolute;
        top: 0;
        left: 6px;
        width: 100%;
        margin-top: -3px;
        font-size: 120px;
        font-weight: 600;
        line-height: 80px;
        color: #016A95;
        opacity: 0;
        text-overflow: clip;
        white-space: nowrap;
        transition: 1s opacity;
    }

    button {
        display: block;
        margin: 32px auto 0;
        width: 176px;
        height: 40px;
        background: #363232;
        color: white;
        outline: none;
        border: none;
        font-size: 15px;
        text-transform: uppercase;
        opacity: 0;
        transition: 0.75s opacity;
        transition-delay: 0s;
    }
}

.carousel-card.active {
    transform: scale(1);

    .ghost-name {
        opacity: 0.07;
    }

    button {
        opacity: 1;
        transition-delay: 0.25s;
    }
}

img {
    margin: 36px -15% 16px;
    position: relative;
    width: 130%;
}

.vertical img {
    margin: 0;
    width: 100%;
}

h2 {
    margin: 0 auto;
    font-weight: 300;
    font-size: 28px;
    text-align: center;
}

.vertical h2 {
    margin: 36px 0 auto;
}
</style>