import base64
import requests

binaryImage = None


url = 'http://localhost:3450/newupload'

headers = {'Content-Type': 'application/json'}

with open('./Skin Contours.png', 'rb') as f:
    bfiles = base64.b64encode(f.read())
print(bfiles)
print("--------------------------")

r = requests.post(url,headers=headers, json={"uploadedimage" : bfiles.decode("ascii")})

if r.status_code == 200:
    print("IMAGE UPLOAD SUCCESSFULL")
else:
    print("ERROR")

