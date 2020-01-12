/**
 * sent events:
 * 
 * used events:
 * - mesh_mouse_enter
 * - mesh_mouse_exit
 */

import * as three from "./three_app.js";
import * as mouse from "./three_mouse.js";
import * as node from "./node.js";
import { GUI } 				from './../jsm/dat.gui.module.js';

import config from "./../config.js";

function init(){
	three.init(on_load,config.ground);

	window.addEventListener( 'mesh_mouse_enter', onMeshMouseEnter, false );
	window.addEventListener( 'mesh_mouse_exit', onMeshMouseExit, false );

	let viewer = document.getElementById('viewer');
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
		viewer.addEventListener(eventName, onDragEvents, false)
	})

}

//in this callback, three is ready
function on_load(){
	console.log("home_app> on_load()");
	mouse.init(three.getCamera());
	node.init(three.getScene(),config.node,node_on_load);
}

function node_on_load(){
	console.log("home_app> node_on_load()");
	mouse.SetMeshList([three.getScene().getObjectByName("Node")]);
}

function onDragEvents(event){
	event.stopPropagation();
	event.preventDefault();
	if(event.type == "dragenter"){
		event.dataTransfer.dropEffect = "copy";
	}
	if(event.type == "drop"){
		if(event.dataTransfer.files.length != 1){
			alert("only one file allowed");
			return;
		}
		if(event.dataTransfer.files[0].type != "application/json"){
			alert("only json files allowed");
			return;
		}
		var reader = new FileReader();
		reader.onloadend = function(e) {
		var result = JSON.parse(this.result);
		console.log(result);
	  };
	  reader.readAsText(event.dataTransfer.files[0]);
	}
}

function send_custom_event(event_name,data){
	var event = new CustomEvent(event_name, {detail:data});
	window.dispatchEvent(event);
}

function onMeshMouseEnter(e){
	//console.log(`Mesh Mouse Enter in ${e.detail.name}`);
	document.getElementById('viewer').style.cursor = "pointer";
}

function onMeshMouseExit(e){
	//console.log(`Mesh Mouse Exit from ${e.detail.name}`)
	document.getElementById('viewer').style.cursor = "default";
}

export{init};
