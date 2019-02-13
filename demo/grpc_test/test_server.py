# -*- encoding:utf-8 -*-
from concurrent import futures
import time

import grpc

import testproto_pb2
import testproto_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Greeter(testproto_pb2_grpc.TestprotoServicer):
    def SayHello(self, request, context):
        orange = request.orange
        lightning = request.lightning
        pointchild = request.pointchild
        alist = list()
        for i in pointchild:
            temp = testproto_pb2.pack(
                orange=orange, lightning=lightning, deutschland=i)
            alist.append(temp)

        return testproto_pb2.Feature(ipack=alist)
        # return testproto_pb2.pack(message='Hello, %s!' % request.name)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    testproto_pb2_grpc.add_TestprotoServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()