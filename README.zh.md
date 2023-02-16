# lens 项目说明

主入口在 packages/open-lens，其他都是以包的形式注入。  

## 运行
第一次会安装 electron 依赖, 非常慢。
```bash
yarn

## 可能会超时，可以把 .yarnrc 里的 timeout 调大。
## 设置代理 yarn config set registry https://registry.npm.taobao.org

yarn dev

## 第一次运行会安装几个依赖，可能会失败，可以手动下载后粘贴进来， 以window为例子：
## packages\open-lens\binaries\client\windows\x64\helm.exe
```

## 说明

### open-lens

dev-run: 运行 electron 客户端
dev:main: 监听 main 的改变
dev:renderer 监听 renderer 改变，这个主要是 react 内容。

### core 
core中，通过大量的 inject 来实现全局调用.

main: Electron 的配置文件
render: 渲染内容