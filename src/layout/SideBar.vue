<template>
  <div class="side-bar" :class="{change_size: isChangeSize }">
    <div class="icon-menu" ref="icon_menu">
      <div>
        <button v-if="!isShowMenu"
                class="menu"
                @click="handleClickMenu()">
          <el-icon>
            <ArrowRightBold/>
          </el-icon>
        </button>
        <button v-else class="menu"
                @click="handleClickMenu()"
                :class="{show_menu : isShowMenu }">
          <el-icon>
            <ArrowDownBold/>
          </el-icon>
        </button>
      </div>
    </div>
    <div class="menu-item "
         :class="{show_menu_item: isShowMenuItem}">
      <div :class={menu_item_icon:isShowMenuItem}>
        <el-icon>
          <Reading/>
        </el-icon>
        <div v-if="isShowMenu" class="menu-item-title">Reading</div>
        <div v-else class="menu-item-label">Reading</div>
      </div>
      <div :class={menu_item_icon:isShowMenuItem}>
        <el-icon>
          <Reading/>
        </el-icon>
        <div v-if="isShowMenu" class="menu-item-title">Reading</div>
        <div v-else class="menu-item-label">Reading</div>

      </div>

      <div :class={menu_item_icon:isShowMenuItem}>
        <el-icon>
          <Reading/>
        </el-icon>
        <div v-if="isShowMenu" class="menu-item-title">Reading</div>
        <div v-else class="menu-item-label">Reading</div>

      </div>


      <div :class={menu_item_icon:isShowMenuItem}>
        <el-icon>
          <Reading/>
        </el-icon>
        <div v-if="isShowMenu" class="menu-item-title">Reading</div>
        <div v-else class="menu-item-label">Reading</div>

      </div>
    </div>
  </div>

</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SideBar",
  data() {
    return {
      isChangeSize: false,
      isShowMenu: false,
      isShowMenuItem: false
    }


  },
  methods: {
    handleClickMenu() {
      console.log("zo day")
      this.isShowMenuItem = !this.isShowMenuItem;
      this.isChangeSize = !this.isChangeSize;
      this.isShowMenu = !this.isShowMenu;

    }
  },
  watch: {
    isShowMenuItem(newVal) {
      if (newVal == true) {
        this.$refs.icon_menu.style.justifyContent = 'right';
      } else {
        this.$refs.icon_menu.style.justifyContent = 'left';
      }
    }
  }
}
</script>
<style lang="scss">

.side-bar {
  /*width: 100%;*/
  background-color: #EBEBEB;
  height: 100%;

}


@media screen and (min-width: 360px) {
  .side-bar {
    /*width: 100%;*/
    background-color: #EBEBEB;
    height: 100%;
    min-height: 1000px;
    position: absolute;
    /*position: fixed;*/
    .icon-menu {
      display: flex;
      justify-content: left;

      .show_menu {
        display: block;
      }

      .menu {
        /*position: absolute;*/
        display: block;
        background-color: #EBEBEB;
        color: #2c3e50;

      }
    }

    .show_menu_item {
      display: block;
    }

    .menu-item {

      .menu_item_icon {
        display: flex;
        gap: 10px;
      }

    }

  }


  aside.el-aside {
    width: 100px;
  }


}

@media screen and (min-width: 700px) {
  .side-bar {
    /*width: 100%;*/
    background-color: #EBEBEB;
    height: 100%;
    min-height: 1000px;
    /*position: relative;*/
  }

  .menu {
    /*position: absolute;*/
    display: block;
    /*background-color: #42b983;*/
    /*color: #2c3e50;*/
  }

  .side-bar .menu-item {
    display: block;
  }

}
</style>