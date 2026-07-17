# Flask

> 来源：[易百教程](https://www.yiibai.com/flask)

## 应用程序

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World'

if __name__ == '__main__':
    app.run()
```

Flask 类的一个对象是WSGI应用程序。

Flask 构造函数将当前模块的名称(`__name__`)作为参数。

Flask 类的`route()`函数是一个装饰器，它告诉应用程序哪个URL应该调用相关的函数。

```python
app.route(rule, options)
```

- _rule_ 参数表示与该函数绑定的 URL 。

- _options_ 是要转发给底层 Rule 对象的参数列表。

Flask 类的 `run()` 方法在本地开发服务器上运行应用程序。

```python
app.run(host, port, debug, options)
```

- `host`: 监听的主机名。默认为`127.0.0.1`(localhost)。 设置为`'0.0.0.0'`使服务器在外部可用；
- `port`: 监听端口号，默认为 `5000`；
- `debug`: 默认为 `false`，如果设置为 `true`，则提供调试信息；
- `options`: 被转发到底层的 `Werkzeug` 服务器。

## 路由

Flask中的 `route()` 装饰器用于将URL绑定到函数。 例如：

```python
@app.route('/hello')
def hello_world():
    return 'hello world'
```

URL `/hello` 规则绑定到 `hello_world()` 函数。用户访问此URL，就会调用 `hello_world()` 函数，这个函数中的执行的结果输出将在浏览器中呈现。

应用程序对象的`add_url_rule()`函数也可用于将URL与函数绑定，如上例所示，使用 `route()`。

```python
def hello_world():
    return 'hello world'

app.add_url_rule('/', 'hello', hello_world)
```

## 变量规则

可以通过将可变部分添加到规则参数来动态构建URL。 这个变量部分被标记为 `<variable-name>`。 它作为关键字参数传递给规则所关联的函数。

```python
from flask import Flask
app = Flask(__name__)

@app.route('/hello/<name>')
def hello_name(name):
    return 'Hello %s!' % name

if __name__ == '__main__':
    app.run(debug = True)
```

访问 `/hello/world`，那么 `world` 将作为参数提供给 `hello()` 函数。

除了默认的字符串变量部分之外，还可以使用以下转换器构造规则：

| 转换器  | 描述                            |
| ------- | ------------------------------- |
| `int`   | 接受整数                        |
| `float` | 对于浮点值                      |
| `path`  | 接受用作目录分隔符的斜杠符(`/`) |

```python
from flask import Flask
app = Flask(__name__)

@app.route('/blog/<int:num>')
def show_blog(num):
    return 'Blog Number %d' % num

@app.route('/rev/<float:num>')
def revision(num):
    return 'Revision Number %f' % num

if __name__ == '__main__':
    app.run()
```

Flask 的 URL 规则基于 Werkzeug 的路由模块。 这确保了形成的 URL 是唯一的，并且基于 Apache 制定的先例。

```python
from flask import Flask
app = Flask(__name__)

@app.route('/flask')
def hello_flask():
    return 'Hello Flask'

@app.route('/python/')
def hello_python():
    return 'Hello Python'

if __name__ == '__main__':
    app.run()
```

在第二条规则中，使用了尾部斜线(`/`)，变成了一个规范的URL。 访问 `/python` 或 `/python/` 返回相同的输出。 但是，在第一条规则的情况下， 访问 `/flask/`会导致 `404 Not Found` 页面。

## URL 构建

`url_for()` 函数接受函数的名称作为第一个参数，并接受一个或多个关键字参数，每个参数对应于URL的变量部分。

```python
from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route('/admin')
def hello_admin():
    return 'Hello Admin'

@app.route('/guest/<guest>')
def hello_guest(guest):
    return 'Hello %s as Guest' % guest

@app.route('/user/<name>')
def user(name):
    if name =='admin':
        return redirect(url_for('hello_admin'))
    else:
        return redirect(url_for('hello_guest',guest = name))

if __name__ == '__main__':
    app.run(debug = True)
```

- `redirect()` 重定向函数

`User()` 函数检查收到的参数是否与’admin’匹配。 如果匹配，则使用 `url_for()` 将应用程序重定向到 `hello_admin()`函数，否则将该接收的参数作为 `guest` 参数传递给 `hello_guest()` 函数。

## HTTP方法

| 方法     | 描述                                                                   |
| -------- | ---------------------------------------------------------------------- |
| `GET`    | 将数据以未加密的形式发送到服务器，这最常用的方法                       |
| `HEAD`   | 与GET相同，但没有响应主体                                              |
| `POST`   | 用于将HTML表单数据发送到服务器。通过POST方法接收的数据不会被服务器缓存 |
| `PUT`    | 用上传的内容替换目标资源的所有当前表示                                 |
| `DELETE` | 删除由URL给出的所有目标资源的所有表示                                  |

默认情况下，Flask 路由响应 GET 请求。 但是，可以通过为 `route()` 装饰器提供方法参数来更改此首选项。

下面是 `POST`：

```python
from flask import Flask, redirect, url_for, request
app = Flask(__name__)

@app.route('/success/<name>')
def success(name):
    return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['name']
        return redirect(url_for('success',name = user))
    else:
        user = request.args.get('name')
        return redirect(url_for('success',name = user))

if __name__ == '__main__':
    app.run(debug = True)
```

GET 方法获得 `name` 参数的值：

```python
user = request.args.get('name')
```

## 模板

> 时代潮流是前后端分离，故不记录此笔记。

## 静态文件

> 同上

## 请求对象

`form` - 它是包含表单参数及其值的键和值对的字典对象。

`args` - 解析问号(`?`)后的URL部分查询字符串的内容。

`cookies` - 保存Cookie名称和值的字典对象。

`file` - 与上传文件有关的数据。

`method` - 当前请求方法。

## 表单处理

```python
rom flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def student():
    return render_template('student.html')

@app.route('/result',methods = ['POST', 'GET'])
def result():
    if request.method == 'POST':
        # 表单数据
        result = request.form
        return render_template("result.html",result = result)

if __name__ == '__main__':
    app.run(debug = True)
```

## Cookies 处理

Request对象包含一个 `cookie` 的属性。 它是所有cookie变量及其对应值的字典对象，客户端已发送。 除此之外，cookie还会存储其到期时间，路径和站点的域名。

在Flask中，cookies设置在响应对象上。 使用 `make_response()` 函数从视图函数的返回值中获取响应对象。 之后，使用响应对象的 `set_cookie()` 函数来存储cookie。

重读cookie很容易。 可以使用 `request.cookies` 属性的 `get()` 方法来读取cookie。

### 设置 Cookie

```python
@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
   if request.method == 'POST':
        user = request.form['name']

        resp = make_response(render_template('readcookie.html'))
        resp.set_cookie('userID', user)

        return resp
```

### 获取 Cookie

```python
@app.route('/getcookie')
def getcookie():
    name = request.cookies.get('userID')
    return '<h1>welcome '+name+'</h1>'
```

## Sessions 会话

会话对象也是一个包含会话变量和关联值的键值对的字典对象。

设置 `'username'` 会话变量

```python
Session['username'] = 'admin'
```

要删除会话变量：`pop()` 方法。

```python
session.pop('username', None)
```

## 重定向和错误

### 重定向

Flask类有重定向 `redirect()` 函数。调用时，它会返回一个响应对象，并将用户重定向到具有指定状态码的另一个目标位置。

```python
Flask.redirect(location, statuscode, response)
```

### 错误

Flask 类具有带有错误代码的 `abort()` 函数。

```python
Flask.abort(code)
```

`code`参数使用以下值之一 -

- 400 - 对于错误的请求
- 401 - 用于未经身份验证
- 403 - 禁止
- 404 - 未找到
- 406 - 不可接受
- 415 - 用于不支持的媒体类型
- 429 - 请求过多

## 消息闪现

在Flask Web应用程序中生成这样的信息消息很容易。 Flask框架的闪现系统使得可以在一个视图中创建一个消息并将其呈现在名为 `next` 的视图函数中。

Flask模块包含 `flash()` 方法。 它将消息传递给下一个请求，该请求通常是一个模板。

```python
flash(message, category)
Python
```

在这里：

- _message_ - 参数是要刷新的实际消息。
- _category_ - 参数是可选的。 它可以是’错误’，’信息’或’警告’。

要从会话中删除消息，模板调用 `get_flashed_messages()` 函数。

```python
get_flashed_messages(with_categories, category_filter)
```

两个参数都是可选的。 如果收到的消息具有类别，则第一个参数是元组。 第二个参数对于仅显示特定消息很有用。

以下闪现模板中收到消息。

```html
{% with messages = get_flashed_messages() %} {% if messages %} {% for message in
messages %} {{ message }} {% endfor %} {% endif %} {% endwith %}
```

## 文件上传

在Flask中处理文件上传非常简单。 它需要一个enctype属性设置为`'multipart/form-data'`的HTML表单，将该文提交到指定URL。 URL处理程序从 `request.files[]` 对象中提取文件并将其保存到所需的位置。

每个上传的文件首先保存在服务器上的临时位置，然后再保存到最终位置。 目标文件的名称可以是硬编码的，也可以从`request.files [file]` 对象的 `filename` 属性中获取。 但是，建议使用 `secure_filename()` 函数获取它的安全版本。

可以在Flask对象的配置设置中定义默认上传文件夹的路径和上传文件的最大大小。

| 变量                           | 说明                                      |
| ------------------------------ | ----------------------------------------- |
| app.config[‘UPLOAD_FOLDER’]    | 定义上传文件夹的路径                      |
| app.config[‘MAX_CONTENT_PATH’] | 指定要上传的文件的最大大小 - 以字节为单位 |

```python
from flask import Flask, render_template, request
from werkzeug import secure_filename
app = Flask(__name__)

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        print(request.files)
        f.save(secure_filename(f.filename))
        return 'file uploaded successfully'
    else:
        return render_template('upload.html')


if __name__ == '__main__':
    app.run(debug = True)
```

## Docker 部署

```dockerfile
FROM python:3.11
#设置工作目录
WORKDIR /app
#复制requirements.txt
COPY requirements.txt requirements.txt
#安装依赖包
RUN pip install -r requirements.txt
#复制当前目录下的内容到docker中
COPY . .
#启动命令
ENTRYPOINT [ "python", "-m" , "flask",  "--app","app.py", "run", "--host=0.0.0.0","--port=5000"]
```
