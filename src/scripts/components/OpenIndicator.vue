<template>
    <button :class="[ 'theme-' + this.theme, 'direction-' + this.direction ]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        theme: { type: String, default: 'dark' },
        direction: { type: String, default: 'down' },
    },
}
</script>

<style scoped>
button {
    position: relative;
    display: block;
    padding: 20px 0 0;
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: 300;
    color: #2d2d2d;
    pointer-events: auto;
}

button.theme-light {
    color: white;
}

button.direction-down {
    padding: 0 0 20px;
}

button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    border: solid #2d2d2d;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: translateX(-50%) rotate(-135deg);
}

button.theme-light::after {
    border-color: white;
}

button.direction-down::after {
    top: auto;
    bottom: 0;
    transform: translateX(-50%) rotate(45deg);
}
</style>