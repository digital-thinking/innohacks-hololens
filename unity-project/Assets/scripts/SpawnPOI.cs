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
        Spawn(8.3941f, 49.0069f);
        Spawn(8.4133f, 49.0069f);
        Spawn(8.3941f, 49.0115f);
        Spawn(8.4133f, 49.0115f);
    }
}
