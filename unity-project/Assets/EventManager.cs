using UnityEngine;
using System.Collections.Generic;
using System.Collections;

public class EventManager : MonoBehaviour
{
   public GameObject eventGOprefab;


   private GameObject eventGO;
   private List<GameObject> listOfEvents;

   Event eventScript;
   
	// Use this for initialization
	void Start ()
   {
      listOfEvents = new List<GameObject>();

        createNewEvent();
        createNewEvent2();
        createNewEvent3();
    }
	
	// Update is called once per frame
	void Update ()
   {
	   
    }




    Item[] getItems()
    {
        Item[] items = new Item[2];

        Item item = new Item();
        item.latitude = 8.40463678861771;
        item.longitude = 49.0090215;
        item.channel = "MOBILE";
        item.address = "Zähringerstraße 94, 76133 Karlsruhe, Deutschland";
        item.state = "Behoben";
        item.category = "Gefahrenstellen";
        items[0] = item;

        Item item2 = new Item();
        item2.latitude = 8.4030473;
        item2.longitude = 49.0072544;
        item2.channel = "MOBILE";
        item2.address = "Erbprinzenstraße 12, 76133 Karlsruhe, Deutschland";
        item2.state = "Abgeschlossen";
        item2.category = "Beschilderung";
        items[1] = item;
        return items;

    }

    public bool createNewEvent(  )
   {
      eventGO = Instantiate(eventGOprefab, transform.position, Quaternion.identity) as GameObject; // have to change that!

      if (eventGO == null) return false;

      listOfEvents.Add(eventGO);

      eventScript = eventGO.GetComponent<Event>();

        // Save all the data from JSON into the class variables. 


        //transform.position = new Vector3(eventGO.GetComponent<Event>().coordinateX, 95, eventGO.GetComponent<Event>().coordinateZ); // set position to coordinates


        // TEST INPUT!
        eventGO.GetComponent<Event>().eventName = "Disaster!";
        eventGO.GetComponent<Event>().address = "Battstraße 23, 76199 Karlsruhe, Deutschland";
        eventGO.GetComponent<Event>().category = "Straßenbeleuchtung";
        eventGO.GetComponent<Event>().state = "Behoben";
        eventGO.GetComponent<Event>().creationDate = "2016-06-12T00:43:17.256Z";


        return true;
    }

    public bool createNewEvent2()
    {
      eventGO = Instantiate(eventGOprefab, transform.position, Quaternion.identity) as GameObject; // have to change that!

      if (eventGO == null) return false;

      listOfEvents.Add(eventGO);

      eventScript = eventGO.GetComponent<Event>();

        // Save all the data from JSON into the class variables. 


        //transform.position = new Vector3(eventGO.GetComponent<Event>().coordinateX, 95, eventGO.GetComponent<Event>().coordinateZ); // set position to coordinates





        // TEST INPUT!
        eventGO.GetComponent<Event>().eventName = "Disaster!";
        eventGO.GetComponent<Event>().address = "Zähringerstraße 94, 76133 Karlsruhe, Deutschland";
        eventGO.GetComponent<Event>().category = "Verkehrverstöße";
        eventGO.GetComponent<Event>().state = "Behoben";
        eventGO.GetComponent<Event>().creationDate = "2016-06-12T00:43:17.256Z";


        return true;
   }


    public bool createNewEvent3()
    {
      eventGO = Instantiate(eventGOprefab, transform.position, Quaternion.identity) as GameObject; // have to change that!

      if (eventGO == null) return false;

      listOfEvents.Add(eventGO);

      eventScript = eventGO.GetComponent<Event>();

        // Save all the data from JSON into the class variables. 


        //transform.position = new Vector3(eventGO.GetComponent<Event>().coordinateX, 95, eventGO.GetComponent<Event>().coordinateZ); // set position to coordinates


        // TEST INPUT!
        eventGO.GetComponent<Event>().eventName = "Disaster!";
        eventGO.GetComponent<Event>().address = "Erbprinzenstraße 12, 76133 Karlsruhe, Deutschland";
        eventGO.GetComponent<Event>().category = "Straßenbeleuchtung";
        eventGO.GetComponent<Event>().state = "Behoben";
        eventGO.GetComponent<Event>().creationDate = "2016-06-12T00:43:17.256Z";


        return true;
   }

public void FilterData(string dataCategory) // called in SpeechManager
   {
      if (dataCategory == "Show All")
      {
         foreach (GameObject obj in listOfEvents)
         {
            obj.SetActive(true);
         }
      }

      if (dataCategory == eventScript.category)
      {
         eventGO.SetActive(true);
      }
      else
      {
         eventGO.SetActive(false);
      }

   }
}
