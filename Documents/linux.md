#### Ubuntu

##### add application to favorite
get into desktop file directory
```bash
cd /usr/share/applications
```

create a new icon
```bash
sudo vim nameofapplication.desktop
```
add these to the file and change the path to make it available
```
[Desktop Entry]
Name=Eclipse EE
Exec=/home/mrPeterson/path_to_executable
StartupNotify=true
Terminal=false
Type=Application
Icon=/optional/path/to/icon.png
```
因为要解决linux下postman无法添加到标题栏而做了这个尝试

##### check which process is using the port
```bash
lsof -i:the_port_number
```