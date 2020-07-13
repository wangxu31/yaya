<template>
    <el-dialog title="上传内容" :visible="dialogFormVisible"  @close="cancelCreate" class="dialog">
        <el-form :model="form2" class="form">
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form2.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form2.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelCreate()">取 消</el-button>
            <el-button type="primary" @click="doCreate()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
  export default {
    name: "CreateDialog",
    props: {
      dialogFormVisible: Boolean,
      formLabelWidth: String,
      form2: Object
    },
    data() {
      return {
        fullscreen: true,
        showClose: false,
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

      }
    },
    methods: {
      cancelCreate() {
        this.$emit("setDialogFormVisible", false)
      },
      doCreate(){
        console.log(this.form2.title)
        console.log(this.form2.content)
        this.$emit("createArticle", this.form2.title, this.form2.content)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        console.log(fileList)
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  }
</script>

<style scoped>
    .dialog {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .dialog-footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>