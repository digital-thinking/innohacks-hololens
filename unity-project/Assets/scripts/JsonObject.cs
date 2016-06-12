using UnityEngine;
using System.Collections;
using System.Collections.Generic;


[System.Serializable]
public class Item
{
	public string _id { get; set; }
	public string activity { get; set; }
	public string category { get; set; }
	public string address { get; set; }
	public string state { get; set; }
	public string openedAt { get; set; }
	public string editedAt { get; set; }
	public string channel { get; set; }
	public double longitude { get; set; }
	public double latitude { get; set; }
}
[System.Serializable]
public class RootObject
{
	public Item[] Items { get; set; }
}

