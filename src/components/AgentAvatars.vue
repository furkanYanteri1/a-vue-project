<template>
    <div class="avatar-group">
      <div
        v-for="(avatar, index) in avatars.slice(0,3)"
        :key="index"
        class="avatar avatar-text"
        :style="{ backgroundColor: avatar.color }"
      >
        {{ avatar.shortName }}
      </div>
      <div v-if="remainingCount > 0" class="avatar remaining-count">
        +{{ remainingCount }}
      </div>
    </div>
  </template>
  
  <script>
  import CONSTANTS from "@/constants";

  export default {
    name: "AgentAvatars",
    props: {
      avatars: {
        type: Array,
        required: true,
      },
    },
    computed: {
      visibleAvatars() {
        return this.avatars.slice(0, CONSTANTS.MAX_VISIBLE_AGENTS);
      },
      remainingCount() {
        return this.avatars.length - CONSTANTS.MAX_VISIBLE_AGENTS;
      },
    },
    created(){
      // console.log('AVATARS', this.avatars);
    }
  };
  </script>
  
  <style scoped>
  .avatar-group {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 32px;
    height: 32px;
    padding: 15px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-right: -10px;
    border: 3px solid white;
    font-size: 13px;
  }
  .avatar-text{
    text-shadow:
    -1px -1px 0 rgb(61, 61, 61),
     0   -1px 0 rgb(61, 61, 61),
     1px -1px 0 rgb(61, 61, 61),
     1px  0   0 rgb(61, 61, 61),
     1px  1px 0 rgb(61, 61, 61),
     0    1px 0 rgb(61, 61, 61),
    -1px  1px 0 rgb(61, 61, 61),
    -1px  0   0 rgb(61, 61, 61);
  }
  .remaining-count {
    background-color: #ccc;
    color: #333;
  }
  </style>
  