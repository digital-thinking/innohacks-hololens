using UnityEngine;
using System.Collections;
using System.IO;
using System.Text;
using System;


public class JsonConverter : MonoBehaviour
{



	public static string readFile (string path)
	{
		string text = null;
		using (var streamReader = new StreamReader (@path, Encoding.UTF8)) {
			text = streamReader.ReadToEnd ();
		}
		Debug.Log (text);
		return text;

	}

   
	public static RootObject fromJson (string json)
	{
		return JsonUtility.FromJson<RootObject> (json);
	}


		
}

