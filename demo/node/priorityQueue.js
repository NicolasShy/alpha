var util = require('util');

/**
 * 优先级队列类
 * @param cmp_func 优先级比较函数，必需，参考数组排序参数
 */
var PQueue = exports.PQueue = function (cmp_func) {
  //记录数组
  this._records = [];
  //优先级比较方法
  this._cmp_func = cmp_func;
};

//堆向上调整
PQueue.prototype._heapUpAdjust = function (index) {
  var records = this._records;
  var record = records[index];
  var cmp_func = this._cmp_func;
  while (index > 0) {
    var parent_index = Math.floor((index - 1) / 2);
    var parent_record = records[parent_index];
    if (cmp_func(record, parent_record) < 0) {
      records[index] = parent_record;
      index = parent_index;
    } else {
      break;
    }
  }
  records[index] = record;
};

//堆向下调整
PQueue.prototype._heapDownAdjust = function (index) {
  var records = this._records;
  var record = records[index];
  var cmp_func = this._cmp_func;
  var length = records.length;
  var child_index = 2 * index + 1;
  while (child_index < length) {
    if (child_index + 1 < length && cmp_func(records[child_index], records[child_index + 1]) > 0) {
      child_index++;
    }
    var child_record = records[child_index];
    if (cmp_func(record, child_record) > 0) {
      records[index] = child_record;
      index = child_index;
      child_index = 2 * index + 1;
    } else {
      break;
    }
  }
  records[index] = record;
};

//销毁
PQueue.prototype.destroy = function () {
  this._records = null;
  this._cmp_func = null;
};

//将记录插入队列
PQueue.prototype.enQueue = function (record) {
  var records = this._records;
  records.push(record);
  this._heapUpAdjust(records.length - 1);
};

//删除并返回队头记录
PQueue.prototype.deQueue = function () {
  var records = this._records;
  if (!records.length)
    return undefined;
  var record = records[0];
  if (records.length == 1) {
    records.length = 0;
  } else {
    records[0] = records.pop();
    this._heapDownAdjust(0);
  }
  return record;
};

//获取队头记录
PQueue.prototype.getHead = function () {
  return this._records[0];
};

//获取队列长度
PQueue.prototype.getLength = function () {
  return this._records.length;
};

//判断队列是否为空
PQueue.prototype.isEmpty = function () {
  return this._records.length == 0;
};

//清空队列
PQueue.prototype.clear = function () {
  this._records.length = 0;
};