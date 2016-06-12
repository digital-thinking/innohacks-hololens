using UnityEngine;
using UnityEngine.UI;
using System.Collections;

class Event : MonoBehaviour
{
   static int id;
    public string eventName { get; set; }
   public string category { get; set; }
    public string address { get; set; }
    public string state { get; set; }
    public string channel { get; set; }
    public string creationDate { get; set; }

   public float coordinateX = 0;
   public float coordinateZ = 0;


   void Start()
   {
      // if (coordinateX == 0 && coordinateZ == 0) return;


      setTextOnCanvas();
   }



   void Update()
   {
      

   }


   void setTextOnCanvas()
   {
      GameObject.Find("Name").GetComponent<Text>().text  = "Name: " + eventName;
      GameObject.Find("Street").GetComponent<Text>().text = "Street: " + address;
      GameObject.Find("Category").GetComponent<Text>().text = "Category: " + category;
      GameObject.Find("State").GetComponent<Text>().text = "State: " + state;
      GameObject.Find("Date").GetComponent<Text>().text = "Date: " + creationDate;
   }


}

