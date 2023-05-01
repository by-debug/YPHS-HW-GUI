import eel
import ssl
from pprint import pformat
from ast import literal_eval
from sys import exit
import warnings
import websockets
import asyncio
warnings.filterwarnings("ignore")

ssl_context = ssl.SSLContext()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

async def query(command):
    with open("url","r") as file:
        url = f"wss://{file.read()}/0.0.0.0"
    async with websockets.connect(url, ssl=ssl_context) as websocket:
        if command[0:4] == "quit":
            exit(0)
        else:
            await websocket.send(command)
        rec = await websocket.recv()
        if rec[0] == '[' and rec[-1] == ']':
            rec = pformat(literal_eval(rec))
        return rec

@eel.expose
def receive(command):
    return asyncio.run(query(command))
    # return command

eel.init('UI')
try:
    eel.start('main.html', size=(1280,720), mode='chrome')
except TypeError:
    eel.start('main.html', size=(1280,720), mode='default')