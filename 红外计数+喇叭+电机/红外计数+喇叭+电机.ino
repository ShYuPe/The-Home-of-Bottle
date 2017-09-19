#include <IRremote.h>
#include <Microduino_Motor.h>

#if defined(__AVR_ATmega32U4__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)

#define motor_pin1A 7
#define motor_pin1B 5
#else

#define motor_pin1A 5
#define motor_pin1B 7
#endif

Motor MotorRight(motor_pin1A, motor_pin1B);
#define MAX_THROTTLE 255
#define MAX_STEERING 200
int16_t throttle = 0;
int16_t steering = 0;
long i;
unsigned long m,n,j;
long ir_item;
IRrecv irrecv_0(2);
decode_results results_0;
int pbIn = 2;     

#define BuzzerPin6 6
int tone_list[] = {262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1175, 1318, 1397, 1568, 1760, 1967};
int music_1[] = {12, 10, 12, 10, 0};
float rhythm_1[] = {1, 0.5, 0.5,1};

void stateChange()
{ 
    if (!irrecv_0.decode(&results_0)) 
  {   n=millis();
    if((n-m)>500)
  {
      j=1;
      m=n;
  }
  else 
   {
     m=millis();
     j=0;
   }
 }
}

void setup()
{
   i = 0;j=0;
  irrecv_0.enableIRIn();
    MotorRight.Fix(1);

 attachInterrupt(pbIn, stateChange, CHANGE);  


}
void loop()
{
  if(j==1){ j=0;
 for (int a = 0; music_1[a] != 0; a++) {
    if (music_1[a] != 22) {
      tone(BuzzerPin6, tone_list[music_1[a] - 1]);
    }
    else {
      noTone(BuzzerPin6);
    }
    delay(rhythm_1[a] * 100);
    noTone(BuzzerPin6);
    delay(30);
  }
   throttle = 100;
   MotorRight.Driver(MotorRight.GetData(throttle, 0, CHAN_LEFT));
   delay(1000);
   MotorRight.Brake();
   delay(1000);
  
  }
}


