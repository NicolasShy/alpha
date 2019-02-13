# -*- encoding:utf-8 -*-
from __future__ import print_function

import grpc

import testproto_pb2
import testproto_pb2_grpc


def run():
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = testproto_pb2_grpc.TestprotoStub(channel)
        level_json_temp1 = testproto_pb2.leveljson(deutschland='berlin')
        level_json_temp2 = testproto_pb2.leveljson(deutschland='hamberg')
        response = stub.GetFeature(
            testproto_pb2.Point(
                orange='brown',
                lightning='yellow',
                pointchild=[level_json_temp1, level_json_temp2]))
    
    for i in response.ipack:
        print("*****")
        print("orange" + i.orange)
        print("lightning" + i.lightning)
        print("deutschland" + i.deutschland)
        print("*****")

if __name__ == '__main__':
    run()