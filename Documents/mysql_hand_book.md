

### 外键依赖开关
```
SET FOREIGN_KEY_CHECKS=0; 
SET FOREIGN_KEY_CHECKS=1;
```


### Database Archive

#### 查询

##### 1.查看所有数据库容量大小

```sql
select 
table_schema as '数据库',
sum(table_rows) as '记录数',
sum(truncate(data_length/1024/1024, 2)) as '数据容量(MB)',
sum(truncate(index_length/1024/1024, 2)) as '索引容量(MB)'
from information_schema.tables
group by table_schema
order by sum(data_length) desc, sum(index_length) desc;
```

　　

##### 2.查看所有数据库各表容量大小

```sql
select 
table_schema as '数据库',
table_name as '表名',
table_rows as '记录数',
truncate(data_length/1024/1024, 2) as '数据容量(MB)',
truncate(index_length/1024/1024, 2) as '索引容量(MB)'
from information_schema.tables
order by data_length desc, index_length desc;
```

　　

##### 3.查看指定数据库容量大小

例：查看mysql库容量大小

```sql
select 
table_schema as '数据库',
sum(table_rows) as '记录数',
sum(truncate(data_length/1024/1024, 2)) as '数据容量(MB)',
sum(truncate(index_length/1024/1024, 2)) as '索引容量(MB)'
from information_schema.tables
where table_schema='mysql';
```

　　

##### 4.查看指定数据库各表容量大小

例：查看mysql库各表容量大小

```sql
select 
table_schema as '数据库',
table_name as '表名',
table_rows as '记录数',
truncate(data_length/1024/1024, 2) as '数据容量(MB)',
truncate(index_length/1024/1024, 2) as '索引容量(MB)'
from information_schema.tables
where table_schema='mysql'
order by data_length desc, index_length desc;
```

这些数据不准确，默认情况下 mysql 对表进行增删操作时，是不会自动更新 information_schema 库中 tables 表的 table_rows 字段的，只有10%的行数发生变化才会自动收集

