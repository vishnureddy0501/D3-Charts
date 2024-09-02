<template>
    <div class="circle">Hello</div>
    
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>
<style scoped lang="scss">
.circle {
    background: red;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: 3s; /* state change happens across this 1s */
    /* above transition property applied to all state changes */

    transition: background 5s, transform 3s ease-in 2s;
    /*
        transition: background 5s(background transition happens across 5sec),
                     transform 3s(transition time) 2s(transition-delay, after 2sec rotation starts);
    */
    &:hover {
        background: green;
        transform: rotate(360deg);
    }
}

</style>

/*
transition: [transition-property] [transition-duration] [transition-timing-function] [transition-delay];

Transition Timing Functions
---------------------------
    linear: The transition progresses at an even speed.
    ease: The transition starts slowly, accelerates in the middle, and slows down at the end.
    ease-in: The transition starts slowly and speeds up.
    ease-out: The transition starts quickly and slows down.
    ease-in-out: The transition starts and ends slowly but speeds up in the middle.
    cubic-bezier(n,n,n,n): Defines a custom timing function where n values are between 0 and 1.
                            website: https://cubic-bezier.com/
*/