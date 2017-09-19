#include <ESP8266.h>

#define EspSerial Serial1
#define UARTSPEED  115200

#define SSID        "H60-L02"
#define PASSWORD    "zhangjiahan123"
#define HOST_NAME   "api.heclouds.com"
#define DEVICEID    "13622348"
#define PROJECTID   "90953"
#define HOST_PORT   (80)
String apiKey="56T7nEfGfjM3mfzBhswAxSlKQbk=";

char buf[10];
int start=0;
int end=0;

String jsonToSend;
String postString;

#define INTERVAL_sensor 2000
unsigned long sensorlastTime = millis();

float distance,m;

ESP8266 wifi(&EspSerial);

const int TrigPin = 5; 
const int EchoPin = 4; 
int t,q;

#include <IRremote.h>
int i=0; //计数
int a;
bool b=false; //障碍物是否进入
IRsend irsend;

void setup(void)
{
    Serial.begin(115200);
    pinMode(6,INPUT);
    
    pinMode(TrigPin, OUTPUT); 
    // 要检测引脚上输入的脉冲宽度，需要先设置为输入状态
    pinMode(EchoPin, INPUT); 
    q=millis();
    
    while(!Serial);
    Serial.print("setup begin\r\n");
  do{
    WifiInit(EspSerial, UARTSPEED);
    
    Serial.print("FW Version:");
    Serial.println(wifi.getVersion().c_str());

    if (wifi.setOprToStation()) {
        Serial.print("to station ok\r\n");
        m=1;
    } else {
        Serial.print("to station err\r\n");
        m=0;
    }
   
    if (wifi.joinAP(SSID, PASSWORD)) {
        Serial.print("Join AP success\r\n");
        Serial.print("IP:");
        Serial.println(wifi.getLocalIP().c_str());
        m=m*1;
    } else {
        Serial.print("Join AP failure\r\n");
        Serial.print("Make sure your SSID, PASS correctly!\r\n");
        m=m*0;
    }
    }while(!m);
    
    if (wifi.disableMUX()) {
      Serial.print("single ok\r\n");
    } else {
      Serial.print("single err\r\n");
    }
    Serial.print("setup end\r\n");
    Serial.println("Ultrasonic sensor:");
}

void loop(void)
{
  irsend.sendNEC(0x89ABCDEF,32); 
  t=millis();
  if (digitalRead(6)==LOW) //如果发送低电平，识别到障碍物进入
{
  if (b==false) { //如果上一次检测时，障碍物没有进入，则视为第一次进入。
    b=true;  //先将标志记录为障碍物已进入。
    i+=1;  //计数+1
    Serial.print("OK:");
    Serial.println(i);
    if(i%5!=0)a=1;
    if(i%5==0&&a==1)
  {
    a=0;
    
    // 产生一个10us的高脉冲去触发TrigPin 
        digitalWrite(TrigPin, LOW); 
        delayMicroseconds(2); 
        digitalWrite(TrigPin, HIGH); 
        delayMicroseconds(10);
        digitalWrite(TrigPin, LOW); 
    // 检测脉冲宽度，并计算出距离
        distance = pulseIn(EchoPin, HIGH) * 0.017;
 
        Serial.print("Reliable distance: ");
        Serial.print(distance);
        Serial.println("cm"); 
         updateData();
            q=t;         
  }
  }
}
 else {  //如果检测到障碍物移出
b=false;  //将标志记录为障碍物已移出。
}
  delay(1);  
}

void updateData() {

    if (wifi.createTCP(HOST_NAME, HOST_PORT)) {
        Serial.print("create tcp ok\r\n");
    } else {
        Serial.print("create tcp err\r\n");
    }

    jsonToSend="{\"num\":";
    dtostrf(i,1,0,buf);
    jsonToSend+="\""+String(buf)+"\"";
    jsonToSend+=",\"balance\":";
    dtostrf(distance,1,2,buf);
    jsonToSend+="\""+String(buf)+"\"";
    //jsonToSend+=",\"Light\":";
    //dtostrf(lightnessOLED,1,2,buf);
    //jsonToSend+="\""+String(buf)+"\"";
    jsonToSend+="}";


    postString="POST /devices/";
    postString+=DEVICEID;
   // postString+="/datapoints HTTP/1.1";
    postString+="/datapoints?type=3 HTTP/1.1";
    postString+="\r\n";
    postString+="api-key:";
    postString+=apiKey;
    postString+="\r\n";
    postString+="Host:api.heclouds.com\r\n";
    postString+="Connection:close\r\n";
    postString+="Content-Length:";
    postString+=jsonToSend.length();
    postString+="\r\n";
    postString+="\r\n";
    postString+=jsonToSend;
    postString+="\r\n";
    postString+="\r\n";
    postString+="\r\n";

    const char *postArray = postString.c_str();

    Serial.println(postArray);

    wifi.send((const uint8_t*)postArray, strlen(postArray));

    if (wifi.releaseTCP()) {
        Serial.print("release tcp ok\r\n");
    } else {
        Serial.print("release tcp err\r\n");
    }

    postArray=NULL;
}


