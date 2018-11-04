## ioa-upload

基于busboy模块的多文件上传组件，支持多文件、字段类型


### middleware

#### upload

文件上传中间件

##### ctx输出

* `ctx.request.body`

   * `files` *Array* 上传成功后的文件资源路径

   * `$name` * 自定义非文件类型数据字段



### api

#### `POST` /upload/:category

* `category` *String* 上传目录分组名称
