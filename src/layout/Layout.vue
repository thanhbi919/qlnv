<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0"><Header></Header></el-header>
      <el-container>
        <el-aside  width="200px"><SideBar></SideBar></el-aside>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>

</template>
<script>
import SideBar from "@/layout/SideBar";
import Header from "@/layout/Header";
import Main from "@/layout/Main"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: {Header,SideBar,Main},
}
</script>
<style lang="css">
.content{
  display: flex;
  min-height: 1000px;

}
 .custom-el-header {
   --el-header-padding: 0 0px
}

</style>