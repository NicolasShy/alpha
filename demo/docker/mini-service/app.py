from flask import Flask, Response
from redis import Redis, RedisError
import json


app = Flask(__name__)


@app.route("/notification", methods=['POST'])
def reply():
    return Response(
        json.dumps({"error": 0}), content_type="application/json", status=200)


if __name__ == "__main__":
    app.run(host='localhost', port=4000)
