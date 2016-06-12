using UnityEngine;
using System.Collections;

public class SpawnPOI : MonoBehaviour {

    public GameObject target;

    public static float centerX = 8.411f;
    public static float centerY = 49.0138f;
    public static float width = 0.0192f;
    public static float height = 0.0046f;


    // Use this for initialization
    void Spawn (float x, float y) {
        float xnorm = (x - centerX) / (width);
        float ynorm = (y - centerY) / (height);

        Debug.Log("Xnorm:" + xnorm + " Ynorm:" + ynorm);

        GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
        cube.transform.parent = target.transform;
        cube.transform.localScale =(new Vector3(0.1f, 0.1f, 0.1f));
        cube.transform.position = new Vector3(xnorm, gameObject.transform.position.y, ynorm);
    }

	
	// Update is called once per frame
	void Start () {
		Item[] items = getItems ();
		foreach (Item item in items ){
			Spawn ((float)item.latitude, (float)item.longitude);
			}


    }

	Item[] getItems(){
		Item[] items  = new Item[2];
		Item item = new Item ();
		item.latitude = 8.40463678861771;
		item.longitude = 49.0090215;
		item.channel = "MOBILE";
		item.address = "Zähringerstraße 94, 76133 Karlsruhe, Deutschland";
		item.state = "Behoben";
		item.category = "Gefahrenstellen";
		items[0] = item;

		Item item2 = new Item ();
		item2.latitude = 8.4030473;
		item2.longitude = 49.0072544;
		item2.channel = "MOBILE";
		item2.address = "Erbprinzenstraße 12, 76133 Karlsruhe, Deutschland";
		item2.state = "Abgeschlossen";
		item2.category = "Beschilderung";
		items[1] = item;
		return items;

	}

}
