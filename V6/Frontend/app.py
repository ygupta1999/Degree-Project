from flask import Flask, redirect, url_for, request, render_templete
app = Flask(__name__)


@app.route("/")
def hello():
    return render_templete('index.html')

app.run()


