from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import json
import tensorflow as tf
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from math import *
from geopy.geocoders import Nominatim
import requests
from datetime import datetime
import pandas as pd   

app = Flask(__name__)

from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import json
import tensorflow as tf

app = Flask(__name__)

def solar_radiation(lat,n,t,to,k,a):
    delta = 23.5*sin(radians(360*(284+n)/365))
    h = degrees(asin(cos(radians(lat))*cos(radians(delta))*cos(radians(15*(t-to))) + sin(radians(lat))*sin(radians(delta))))
    s = 1
    qo = (0.62+0.68)*sin(radians(h))
    A = degrees(asin((cos(radians(delta))*sin(radians(15*(t-to))))/cos(radians(h))))
    qr = qo*(1-0.38*(1+(k/10))*(k/10))
    q = qr*(cos(radians(a))*sin(radians(h)) + (sin(radians(a))*cos(radians(h))*cos(radians(A))))/sin(radians(h))
    return q
def pannel_area(n=1):
    length = 65*0.0254
    width = 39*0.0254
    return length*width*n

def solar_power(radiation,ambient_temp,panels=1,eff=0.2):
    efficiency = eff
    panel_area = pannel_area(panels)
    power = efficiency*panel_area*radiation*(1-0.005*(ambient_temp-25))
    return power
#generate time
def generate_time():
    time = []
    for i in range(240):
        time.append(i/10)
    return time

#get longitude and latitude
def latitude(address):
    geolocator = Nominatim(user_agent="my_user_agent")
    city ="Thunder Bay"
    country ="Canada"
    loc = geolocator.geocode(address+','+city+','+ country)
    return loc.latitude
def longitude(address):
    geolocator = Nominatim(user_agent="my_user_agent")
    city ="Thunder Bay"
    country ="Canada"
    loc = geolocator.geocode(address+','+city+','+ country)
    return loc.longitude

def get_day_number(date):
    days = [31,28,31,30,31,30,31,31,30,31,30,31]
    date = date.split("-")
    month = int(date[1]);
    res = sum(days[:month-1])
    res = res + int(date[2])
    return res

def solar_noon(date,address):
    response = requests.get("https://api.sunrise-sunset.org/json?lat="+str(latitude(address)) + "&lng="+str(longitude(address))+"&date="+date)
    result = response.json()['results']['solar_noon'].split(' ')
    time = result[0].split(":")
    hour = int(time[0])
    if(hour<12 and result[1]=="PM"):
        hour = hour + 12
    hour = hour-5
    minute = round(int(time[1])/6)
    return hour+(minute/10)

def get_weather(w,date):
    x = w[w['Date']==date].index.tolist()
    temp = []
    for i in x:
        temp.append(w.iloc[i]['Temp (°C)'])
    x = np.arange(0,240,1)
    l = []
    t= 0;
    for i in range(len(x)):
        if(i%10==0):
            l.append(temp[t])
            t = t+1
        else:
            l.append(np.nan)
    p = pd.DataFrame(l)
    p = p.interpolate(method ='linear', limit_direction ='both')
    temp = p[0]
    return temp


def get_solar_radiation(date,address):
    lat = latitude(address)
    to = solar_noon(date,address)
    n = get_day_number(date)
    k = 1
    a = 22.5
    t = generate_time()
    pred = []
    for i in t:
        res = solar_radiation(lat,n,i,to,k,a)
        if(res>0):
            pred.append(res)
        else:
            pred.append(0)
    return t,pred

def get_solar_power(temp,radiation,panels=1,eff=0.2):
    power = []
    for i in range(len(temp)):
        power.append(solar_power(radiation[i],temp[i],panels,eff))
    return power

def visualize(x,y):
    fig = plt.figure()
    fig.set_size_inches(9.5, 5.5)
    ax = plt.axes()
    ax.plot(x, y)

def gen_hourly_data(df,date,address):
    response = requests.get("https://api.sunrise-sunset.org/json?lat="+str(latitude(address)) + "&lng="+str(longitude(address))+"&date="+date)
    sunrise = int(utc_to_est(response.json()['results']['sunrise'])*10)
    sunset = int(utc_to_est(response.json()['results']['sunset'],True)*10)
    
    power = list(df['Power'])
    temp = power[sunrise:sunset]
    print(sunrise,sunset)
    final = []
    for i in power:
        if(i in temp):
            final.append(i)
        else:
            final.append(0)
    power = final
#     print(final)
    hourly = []
    for i in range(24):
        res = sum(power[10*i:10*(i+1)])
        hourly.append(res)
    return hourly
def gen_solar(date,address,panels,eff):
    w = pd.read_csv('Weather.csv')
    temp = get_weather(w,date)
    t,pred = get_solar_radiation(date,address)
    power = get_solar_power(temp,pred,panels,eff)
    #     visualize(t,pred)
    df = pd.DataFrame(t,columns =['Time'])
    df['Radiation'] = pred
    df['Power'] = power
    df = df.set_index(df.Time)
    df = df.drop('Time',axis=1)
#     df.plot()
    df = gen_hourly_data(df,date,address)
    #crop time based on sunrise and sunset
    return df
def utc_to_est(time,sunset=False):
    print(time)
    if(sunset==False):
        hour = int(time.split(":")[0])
        minute = int(int(time.split(":")[1])/6)
        ampm = time.split(" ")[1]
        if(hour<12 and ampm=='PM'):
            hour = hour+12-5
    else:
        hour = int(time.split(":")[0])
        minute = int(int(time.split(":")[1])/6)
        ampm = time.split(" ")[1]
        if(hour<12 and ampm=='AM'):
            hour = hour+24-5
        else:
            hour = hour+12-5
    return hour+ minute*0.1

@app.route('/solar_production', methods=['POST'])
# @app.route("/")
def solar_production():
    json_ = request.json
    # json_ = np.array(json_)

    doc_ref = db.collection(u'User_Info').document(json_)
    doc = doc_ref.get()
    address = doc.to_dict()['Address']
    panels = doc.to_dict()['Panels']
    res = gen_solar("2016-6-12",address,panels,0.1)
    # res = 'Yash'
    return jsonify(res)


if __name__ == '__main__':
    cred = credentials.Certificate("helius.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    app.run(port=8002,debug=True)
