# -*- encoding:utf-8 -*-
import sys
import gzip
import base64
from xml.dom import minidom


def main():
    files = sys.argv[1:]
    print(files)
    requestxml = minidom.parse(files[0])

    a = gzip.compress(requestxml.toxml("utf-8"), 6)
    body = base64.b64encode(a)
    print(body)


if __name__ == "__main__":
    main()