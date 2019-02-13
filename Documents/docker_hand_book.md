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
docker run -d --name=container-name -it image-name:image-tag /bin/bash
```

例如处理openjdk镜像





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