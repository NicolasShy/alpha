# -*- encoding:utf-8 -*-
import gevent
from gevent import monkey, pool
monkey.patch_all()
import queue

the_pool = pool.Pool(10)
the_queue = queue.Queue()

def add_in():
    for i in range(1000):
        the_queue.put(i)

def consuming():
    while True:
        try:
            work = the_queue.get_nowait()
        except queue.Empty:
            print("system sleeping")
            gevent.sleep(2)
            continue
        the_pool.spawn(working(work))


def working(work):
    print(work)

if __name__ == "__main__":
    g1 = gevent.spawn(consuming)
    g2 = gevent.spawn(add_in)
    gevent.joinall([g1,g2])