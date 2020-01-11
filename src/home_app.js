/**
 * sent events:
 * 
 * used events:
 * - mesh_mouse_enter
 * - mesh_mouse_exit
 */

import * as three from "./three_app.js";
import * as mouse from "./three_mouse.js";
import { GUI } 				from './../jsm/dat.gui.module.js';

import config from "./../config.js";

function init(){
	three.init(on_load,config.glTF_model);

	window.addEventListener( 'mesh_mouse_enter', onMeshMouseEnter, false );
	window.addEventListener( 'mesh_mouse_exit', onMeshMouseExit, false );

}

function send_custom_event(event_name,data){
	var event = new CustomEvent(event_name, {detail:data});
	window.dispatchEvent(event);
}

//in this callback, three is ready
function on_load(){

	mouse.init(three.getCamera());

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
