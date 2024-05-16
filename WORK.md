# 更新流程

说明：master 分支为组件源文件， /docs 为文档源文件，/src 为组件演示网站源文件

- 复制 AliveTable 组件到 master 分支（如果有更新）
- npm run docs:build，编译文档，输出在/docs/.vitepress/dist
- npm run build，编译组件演示网站，输出在/dist
- 切换分支到 docs-web
- 删除除了 /example 文件夹和 .gitignore 其他所有文件
- 把/docs/.vitepress/dist 里面的文件复制到根目录
- 把/dist 里面的文件复制到/example 文件夹中
