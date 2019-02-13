# -*- encoding:utf-8 -*-
import json
import sys
from xmljson import badgerfish as bf
from xml.etree.ElementTree import fromstring

def main(path_list):
    
    path1 = path_list[0]
    path2 = path_list[1]
    the_xml = ''
    with open(path1, 'r', encoding='utf8') as xml_temp:
        the_xml = xml_temp.read()
        the_json = bf.data(fromstring(the_xml))

    with open(path2, 'w', encoding='utf8') as jf:
        jf.write(json.dumps(the_json, ensure_ascii=False))

if __name__ == "__main__":
    path = sys.argv[1:]
    main(path)