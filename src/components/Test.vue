<template>
    <div class="Site">
        <div class="Site-header">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1" class="el-menu-demo-item" @click="setShowModule(1)">Home</el-menu-item>
<!--                <el-menu-item index="2" class="el-menu-demo-item" @click="setShowModule(2)">Discover</el-menu-item>-->
                <el-menu-item index="3" class="el-menu-demo-item" @click="setShowModule(3)">Search</el-menu-item>
                <el-menu-item index="4" class="el-menu-demo-item" @click="setDialogFormVisible(true)">Publish</el-menu-item>
                <el-menu-item index="5" class="el-menu-demo-item" @click="setContactDrawer(true)">Contact</el-menu-item>
            </el-menu>
        </div>
        <div class="Site-content">
            <el-drawer
                    :title=title
                    :visible.sync="drawer"
                    :direction="direction" size="80%">
                <h1>{{content}}</h1>
            </el-drawer>
            <create-dialog :dialogFormVisible="dialogFormVisible" :formLabelWidth="formLabelWidth" :form2="form2" @setDialogFormVisible="setDialogFormVisible" @createArticle="createArticle"></create-dialog>
            <contact-us :contactDirection="contactDirection" :contactDrawer="contactDrawer" @setContactDrawer="setContactDrawer"></contact-us>
            <div class="list-pic"  v-show="showModule===1">
                <el-row>
                    <el-col :span="20" v-for="(item,index) in articles" :key="index" :offset="2">
                        <el-card :body-style="{ padding: '0px' ,margin: '0px'}" shadow="always" class="card-item">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                            <div style="padding: 20px;" class="item-detail">
                                <span>{{item.title}}</span>
                                <span>{{item.content}}</span>
                                <div class="bottom clearfix">
                                    <el-button  class="button" @click="setContent(item.title,item.content)" type="primary">查看详情</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
<!--            <div class="json-view" v-show="showModule===2">-->
<!--                <jsonView :data="jsonData" icon-style="triangle" theme="one-dark"></jsonView>-->
<!--            </div>-->
            <div id="container" v-show="showModule===3"></div>
        </div>
        <div class="Site-footer">
            <el-pagination
                    class="paginator"
                    small
                    hide-on-single-page
                    layout="total,prev, pager, next,jumper"
                    @current-change="handleCurrentChange"
                    :total="totalNum" v-show="showModule===1">
            </el-pagination>
            <div class="copyright">CopyRight@copy2020</div></div>
    </div>
</template>

<script>
  import CreateDialog from "./CreateDialog";
  import ContactUs from "./ContactUs";
  // import jsonView from 'vue-json-views';
  import AMapLoader from '@amap/amap-jsapi-loader';

  AMapLoader.load({
    "key": "2396eb74f50c44802f86c45281423e21",   // 申请好的Web端开发者Key，首次调用 load 时必填
    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "plugins": []  //插件列表
  }).then((AMap)=>{
    var map = new AMap.Map('container', {
      center: [116.397428, 39.90923],
      layers: [//只显示默认图层的时候，layers可以缺省
        AMap.createDefaultLayer()//高德默认标准图层
      ],
      zoom: 13
    });
    console.log(map)
  }).catch(e => {
    console.log(e);
  })

  export default {
    name: "Test",
    components: {
      CreateDialog,
      ContactUs,
      // jsonView
    },
    data() {
      return {
        dialogFormVisible: false,
        contactDrawer: false,
        contactDirection: 'rtl',
        form2: {
          title: '',
          content: '',
        },
        formLabelWidth: '50px',
        showModule: 0,
        title: '暂无标题',
        content: '暂无内容',
        drawer: false,
        activeIndex2: '1',
        direction: 'ltr',
        currentPage: 1,
        articles: [],
        articlesTotalCount: 100,
        totalNum:60,
        jsonData: {}
      };
    },
    methods: {
      setContent(title,content) {
        this.title = title
        this.content = content
        this.drawer = true
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      setDialogFormVisible(status){
        this.dialogFormVisible = status
      },
      setContactDrawer(status){
        this.contactDrawer = status
      },
      setShowModule(index){
        this.showModule = index
      },
      getData(){
        var api = "http://192.168.4.127:8088/ArticleCon/index?page="+this.currentPage;
        this.$http.get(api).then(function (response) {
          var res = response.body
          if (typeof res == 'object') {
            if (res.code === 0) {
              this.jsonData = res
              this.articles = res.data.data
              console.log(res.data.total)
              this.articlesTotalCount = res.data.total
            }
          }
          console.log(this.articlesTotalCount)
        },function (err) {
          console.log(err);
        })
      },
      createArticle(title,content){
        var api = "http://192.168.4.127:8088/ArticleCon/add";
        var data = {title:title,content:content};
        this.$http.post(api, data, { emulateJSON: true }).then(function (response) {
          console.log(response)
          var res = response.body
          if (typeof res == 'object') {
            if (res.code !== 0) {
              alert('新建失败')
            } else {
              this.getData()
            }
          }
          this.setDialogFormVisible(false)
        },function (err) {
          console.log(err);
          alert('新建失败')
          this.setDialogFormVisible(false)
        })
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
        this.getData()
      }
    },
    mounted() {
      this.getData()
      this.articlesTotalCount=100
      this.showModule=1
    }
  }
</script>

<style scoped>
    .Site {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        align-items: flex-end;
    }

    .Site-header {
        flex: 1;
        width: 100%;
    }
    .Site-content {
        flex: 1;
        width: 100%;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
    }

    .Site-footer {
        flex: 1;
        width: 100%;
        /*align-items: flex-end;*/
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
        /*position: fixed;*/

        bottom: 0;
    }
    .paginator {
        /*align-self: flex-end;*/
    }
    .copyright{
        /*align-self: flex-end;*/
    }
    .el-menu-demo {
        display: flex;
    }
    .el-menu-demo-item {
        flex: 1;
    }
    .item-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #container {
        margin: 0;
        padding: 0;
        width: 90%;
        height: 500px;
        left: 5%;
    }

</style>