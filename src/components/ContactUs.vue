<template>
    <el-drawer
            :visible="contactDrawer"
            direction="rtl" size="80%" :show-close="false" @close="setContactDrawer(false)">
        <h3>Contact Us</h3>
        <hr><br/>
        <span>AUTHOR: Clive</span><br/><br/>
        <span>MAIL：874760401@qq.com</span><br/><br/>
        <span>TEL：15062236632</span>
    </el-drawer>
</template>

<script>
  export default {
    name: "ContactUs",
    props: {
      contactDrawer: Boolean,
      contactDirection: String
    },
    methods: {
      setContactDrawer(status){
        this.$emit("setContactDrawer", status)
      }
    }
  }
</script>

<style scoped>

</style>