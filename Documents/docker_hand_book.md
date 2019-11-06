## Microsoft windows docker 

#### create docker-machine with virtual switch

##### 1.use hyper-v management to create virtual switch

(choose the right network card)
2.

```bash
docker-machine create -d hyperv --hyperv-virtual-switch "Primary Virtual Switch" default
```

##### 以本目录dockerfile创建镜像

```bash
docker build -t ihisenschedule:latest .
```



##### 以-it的方式启动一个container

```bash
docker run -itd --name=container-name -p 8080:80 image-name:image-tag /bin/bash
```
将本机8080端口映射到容器80端口
例如处理openjdk镜像


##### docker 部署 nginx服务
```bash
# 开启一个容器
docker run --name nginx-test -p 8081:80 -d nginx:latest
# mkdir
mkdir -p ~/nginx/www ~/nginx/logs ~/nginx/conf
# 拷贝出容器中nginx配置
docker cp nginx-test:/etc/nginx/nginx.conf ~/nginx/conf
# 以此配置生成配置好的容器
docker run -d -p 8082:80 --name mynginx -v ~/nginx/www:/usr/share/nginx/html -v ~/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/nginx/logs:/var/log/nginx nginx:latest
# 删除原容器
docker rm nginx-test
```

##### 重置nginx
```bash
docker exec -it container-name service nginx reload
```

##### 进入docker内部

```bash
docker exec -it **container_name** /bin/bash
```

##### 开启镜像测试

```bash
docker run -it --rm **image_name** bash
```

```bash
cat /etc/hosts
```

##### attention

watch out for docker container boot sequence if there's dependency between services.

### docker-compose

```bash
docker-compose up --build -d
```