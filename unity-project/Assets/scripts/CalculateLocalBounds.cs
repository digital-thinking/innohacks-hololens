using UnityEngine;
using System.Collections;

public class CalculateLocalBounds : MonoBehaviour {

    void Start()
    {
        Debug.Log(calculateLocalBounds());
    }

    private Bounds calculateLocalBounds()
    {
        Quaternion currentRotation = this.transform.rotation;
        this.transform.rotation = Quaternion.Euler(0f, 0f, 0f);

        Bounds bounds = new Bounds(this.transform.position, Vector3.zero);

        foreach (Renderer renderer in GetComponentsInChildren<Renderer>())
        {
            bounds.Encapsulate(renderer.bounds);
        }

        Vector3 localCenter = bounds.center - this.transform.position;
        bounds.center = localCenter;
        
        this.transform.rotation = currentRotation;
        return bounds;
    }
}
