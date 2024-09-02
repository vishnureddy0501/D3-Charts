<template>
    <div class="bubbles">
        <div class="loading-bubble"></div>
        <div class="loading-bubble"></div>
        <div class="loading-bubble"></div>
        <div class="element"></div>
        <div class="box"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    }
  };
  </script>
  
  <style lang="scss">
  .bubbles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100px;
    .loading-bubble {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background: #3498db; /* Blue color */
        animation-name: bubble;
        animation-direction: alternate;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
    }
    :nth-child(2) {
        animation-delay: 1.5s;
    }
    :nth-child(3) {
        animation-delay: 3s;
    }
  }
  
  @keyframes bubble {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.25);
      opacity: 0.75;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .element {
    animation-name: ele;
    width: 20px;
    height: 20px;
    background: yellow;
    animation-delay: 2s;
    animation-duration: 2s;
    animation-iteration-count: 5;
  }
  @keyframes ele {
    0% {
      background: red;
    }
    100% {
      background: green;
    } 
  }



  .box {
        width: 100px;
        height: 100px;
        background-color: red;
        animation-name: move;
        animation-duration: 2s;
        animation-fill-mode: both;
        animation-delay: 2s;
    }
    @keyframes move {
        0% {
            transform: translateX(0);
            background-color: green;
        }
        100% {
            transform: translateX(200px);
            background-color: yellow;
        }
    }
  </style>
  /*
    grid, display, flex, media queries.
animation-fill-mode:
--------------------
none: No styles are applied before or after the animation.
forwards: Retains the styles from the last keyframe after the animation ends.
backwards: Applies the styles from the first keyframe before the animation starts.
both: Applies styles from the first keyframe before the animation starts and retains the styles from the last keyframe after the animation ends.

animation-iteration-count:
--------------------------
any integer value / infinite
  */

  animation-direction:
  --------------------
normal: The animation plays in the normal direction.
reverse: The animation plays in the reverse direction.
alternate: The animation alternates direction every cycle, playing forwards first, then backwards.
alternate-reverse: The animation alternates direction every cycle, playing backwards first, then forwards.

animation-timing-function:
---------------------------
    linear: The transition progresses at an even speed.
    ease: The transition starts slowly, accelerates in the middle, and slows down at the end.
    ease-in: The transition starts slowly and speeds up.
    ease-out: The transition starts quickly and slows down.
    ease-in-out: The transition starts and ends slowly but speeds up in the middle.
    cubic-bezier(n,n,n,n): Defines a custom timing function where n values are between 0 and 1.
                    website: https://cubic-bezier.com/
*/