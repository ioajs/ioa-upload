## ioa-upload

基于[busboy](https://github.com/mscdex/busboy)模块Stream方式的多文件上传组件，支持多文件、参数混合提交


### 中间件

#### upload

文件上传中间件

##### ctx输出

* `ctx.body`

   * `files` *Array* 上传成功后的文件资源路径

   * `$name` * 自定义非文件类型数据字段


### 配置

* `suffix` *Array* 允许上传的文件类型，默认支持.jpg、.png、.xml、.csv格式

* `savePath` *String* 文件保存绝对路径，默认保存至当前应用的/static目录下

#### 默认配置

```js
{
   "suffix": [
      ".jpg",
      ".png",
      ".xml",
      ".csv"
   ]
}
```


### API

#### `POST` /upload/:category

* `category` *String* 上传目录分组名称
