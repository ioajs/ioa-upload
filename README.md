## ioa-upload

基于[busboy](https://github.com/mscdex/busboy)模块Stream方式的多文件上传组件，支持多文件、参数混合提交

接受html form表单或new FormData()实例类型的数据

### middleware.upload

文件上传中间件

### ctx.upload输出

* `files` *Array* 上传成功后的文件资源路径

* `fields` *Object* field字段


### 配置

* `whitelist` *Array* 允许上传的文件类型白名单，默认支持.jpg、.png格式

* `savePath` *String* 文件保存绝对路径，默认保存至当前应用的/static目录下，末尾不带/

* `limits` *Object* 文件上传限制，请参照[Busboy](https://github.com/mscdex/busboy#busboy-methods)项目

* `baseUrl` *String* 图片地址前缀

#### 默认配置

```js
{
   "whitelist": [
      ".jpg",
      ".png"
   ]
}
```


### API参数

#### `POST` /upload/:category

* `category` *String* 上传目录分组名称