# 我是第1章的标题
我是第1章的正文，下面给出插入图片的两种方式，分别为markdown语法和html语法。

markdown语法代码如下：
```markdown
![图1.1 我是图片名称](./images/1_1.jpeg)
```
效果如下：
![图1.1 我是图片名称](./images/1_1.jpeg)

markdown语法简洁明了，但是其无法控制图片的大小，因此有图片缩放需求时可使用html语法，html语法代码如下：
```html
<div align=center>
< img width="300" src="./images/1_1.jpeg"/>
</div>
<div align=center>图1.1 我是图片名称</div>
```
效果如下：
<div align=center>
<img width="300" src="./images/1_1.jpeg"/>
</div>
<div align=center>图1.1 我是图片名称</div>


