
        
#include <stdio.h>
#include <math.h>
double heap[30101999];
double stack[30101999];
double P;
double H;
double T1, T2, T3, T4, T5, T6, T7, T8, T9, T10;



void Caso3(){

if (1 == 1) goto L1;
goto L2;
L2: 
H = H + 1;
L1:
return;
}


void Caso4(){

if (6 == 1) goto L1; 
goto L2;
L2:
H = H + 1;
L1:
return;
}


void main(){

  /* CASO 1
  goto L1; 
  <instrucciones> L1: 
  */
  goto L1; 
  T1 = T1 + 1;
  T2 = T1;
  L1: 
  T3 = T1 + T3; 
  
  /* CASO 2
    If (x == x) goto L1; 
    goto L2; 
    */
   if (T1 == 4) goto L2; 
   goto L3; 
   L2: 
  H = H + 1;
  P = P + 1;  
  L3: 
  H = H + 2;
  P = P + 2;

 /* CASO 3 
 If (1 == 1) goto L1; 
        goto L2;
     */

  if (1 == 1) goto L4; 
  goto L5; 
  L4:
  H = H + 1;
  L5:
  H = H +2;

   /* CASO 4 
 If (6 == 1) goto L1; 
        goto L2;
     */

  if (1 == 1) goto L6; 
  goto L7; 
  L6:
  H = H + 1;
  L7:
  H = H +2;

  /* CASO 5
    T3 = T2; 
    <instrucciones> 
    T2 = T3;    
    */

   T6 = T7;
   H = H + 1;
   P = P + 1;
   T7 = T6;

  /* CASO 6
  T1 = T1 + 0*/
  T6 = T6 + 0;

  /* CASO 7
  T1 = T1 - 0*/
  T7 = T7 - 0;

   /* CASO 8
  T1 = T1 * 1 */
  T6 = T6 * 0;

  /* CASO 9
  T1 = T1 / 1 */
  T7 = T7 / 1;

   /* CASO 10
  T1 = T2 + 0*/
  T10 = T9 + 0;

  /* CASO 11
  T1 = T2 - 0*/
  T3 = T5 - 0; 

   /* CASO 12
  T1 = T2 * 1*/
  T10 = T9 * 1;

  /* CASO 13
  T1 = T2 / 1*/
  T3 = T5 / 1; 

   /* CASO 14
  T1 = T2 * 1*/
  T10 = T9 * 2;

  /* CASO 15
  T1 = T2 / 1*/
  T3 = T5 * 0; 

  /* CASO 15
  T1 = 0 / T7*/
  T1 = 0 / T7; 

}
