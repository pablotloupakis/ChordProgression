"use strict";
console.log ("Hello ChordProgression");
AddListeners();

function ChordProgressionMain(){
	// 1. Read input 
	let sMode = document.getElementById("selMode").value; 
	let arrProg = document.getElementById("selProgression").value; 
	let sKey = document.getElementById("selKey").value; 
	let iTempo =  document.getElementById("selTempo").value; 
	let iBeatsPerMeasure = document.getElementById("selBeatsPerMeasure").value; 
	let iBeats  = document.getElementById("selBeats").value; 
	
	console.log (sMode, arrProg, sKey, iTempo, iBeatsPerMeasure, iBeats); 

	GenerateProgressions ("major"); 
	GenerateProgressions ("minor"); 
	
}

function AddListeners(){
	if (document.getElementById("selKey")){
		document.getElementById("selKey").addEventListener("change", ChordProgressionMain, false);
	}
	if (document.getElementById("selMode")){
		document.getElementById("selMode").addEventListener("change", ChordProgressionMain, false);
	}
	if (document.getElementById("selProgression")){
		document.getElementById("selProgression").addEventListener("change", ChordProgressionMain, false);
	}	

	if (document.getElementById("selTempo")){
		document.getElementById("selTempo").addEventListener("change", ChordProgressionMain, false);
	}
	if (document.getElementById("selBeatsPerMeasure")){
		document.getElementById("selBeatsPerMeasure").addEventListener("change", ChordProgressionMain, false);
	}
	if (document.getElementById("selBeats")){
		document.getElementById("selBeats").addEventListener("change", ChordProgressionMain, false);
	}	
}

function GenerateProgressions (sMode){
	
	let arrDegrees=[]; 
	
	if (sMode.toLowerCase() === "major") {arrDegrees = ["I","ii","iii", "IV", "V", "vi",""]; }; 
	if (sMode.toLowerCase() === "minor") {arrDegrees = ["i","ii dim","bIII aug", "iv", "V", "bVI",""]}; 
	
	let arrProgs = []; 
	let x0=0; let x1 = 0; let x2 = 0; let x3=0; let x4 = 0; let x5 = 0; let x6=0; let x7=0; 

	for (x0 = 0; x0 < arrDegrees.length; x0++){
		for (x1 = 0; x1 < arrDegrees.length; x1++){
			for (x2 = 0; x2 < arrDegrees.length; x2++){
				for (x3 = 0; x3 < arrDegrees.length; x3++){
					for (x4 = 0; x4 < arrDegrees.length; x4++){
						for (x5 = 0; x5 < arrDegrees.length; x5++){
							for (x6 = 0; x6 < arrDegrees.length; x6++){
								for (x7 = 0; x7 < arrDegrees.length; x7++){

									let iBlanks = 0; 
									if (arrDegrees[x0]===""){iBlanks+=1;} 
									if (arrDegrees[x1]===""){iBlanks+=1;} 
									if (arrDegrees[x2]===""){iBlanks+=1;}
									if (arrDegrees[x3]===""){iBlanks+=1;} 
									if (arrDegrees[x4]===""){iBlanks+=1;} 
									if (arrDegrees[x5]===""){iBlanks+=1;} 
									if (arrDegrees[x6]===""){iBlanks+=1;} 
									if (arrDegrees[x7]===""){iBlanks+=1;} 	
													
									//let only progressions with 4,6,8 chords 
									if (iBlanks === 0 || iBlanks === 2 || iBlanks === 4) {

										let prog = []; 
										if (arrDegrees[x0]!==""){prog.push (arrDegrees[x0])}; 
										if (arrDegrees[x1]!==""){prog.push (arrDegrees[x1])}; 
										if (arrDegrees[x2]!==""){prog.push (arrDegrees[x2])}; 
										if (arrDegrees[x3]!==""){prog.push (arrDegrees[x3])}; 
										if (arrDegrees[x4]!==""){prog.push (arrDegrees[x4])}; 
										if (arrDegrees[x5]!==""){prog.push (arrDegrees[x5])}; 
										if (arrDegrees[x6]!==""){prog.push (arrDegrees[x6])}; 
										if (arrDegrees[x7]!==""){prog.push (arrDegrees[x7])}; 						
										
										let bIsValid = true; 
										//if progression has 4 chords: at least 3 unique chords 
										if (iBlanks === 4) {if (new Set(prog).size < 3) {bIsValid = false;}}
										//if progression has 6 chords: at least 4 unique chords 
										if (iBlanks === 2) {if (new Set(prog).size < 4) {bIsValid = false;}}
										//if progression has 8 chords: at least 4 unique chords 
										if (iBlanks === 0) {if (new Set(prog).size < 4) {bIsValid = false;}}
										
										if (bIsValid){
											//Mugglin rules finally here!
											let bIsChild = true; 
											for (let i=1; i< prog.length; i++){
												if (IsChild (prog[i-1],prog[i],sMode) === false) {bIsChild = false}; 
											}
											if (bIsChild) {arrProgs.push (prog);}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	if (sMode.toLowerCase() === "major") {console.log (arrProgs.length.toString()+" Major Chord Progressions");}; 
	if (sMode.toLowerCase() === "minor") {console.log (arrProgs.length.toString()+" minor Chord Progressions");}; 

}

function IsChild (sFather, sChild, sMode){
	//INPUT: 
	//OUTPUT: return True if "item" is a child of arrIN
	
	if (arguments.length !== 3) {console.log ("ERROR: Invalid number of arguments"); return false}; 
	if (typeof(sFather) !== "string") {console.log ("ERROR: Invalid type"); return false}; 
	if (typeof(sChild) !== "string") {console.log ("ERROR: Invalid type"); return false}; 
	if (typeof(sMode) !== "string") {console.log ("ERROR: Invalid type"); return false}; 	

	let bolIsChild = true; 
	
	if (sMode.toLowerCase() === "major"){
		switch (sFather){
			case "I"	: if (["I","ii","iii", "IV", "V", "vi"].indexOf(sChild) === -1) {bolIsChild = false} ;	break;
			case "ii"	: if (["ii", "iii", "V"].indexOf(sChild) === -1) 				{bolIsChild = false} ;	break;
			case "iii"	: if (["iii", "IV", "vi"].indexOf(sChild) === -1) 				{bolIsChild = false} ;	break;
			case "IV"	: if (["IV", "I","ii","V"].indexOf(sChild) === -1) 				{bolIsChild = false} ;	break;
			case "V"	: if (["V","I"].indexOf(sChild) === -1) 						{bolIsChild = false} ;	break;			
			case "vi"	: if (["vi","ii", "IV"].indexOf(sChild) === -1) 				{bolIsChild = false} ;	break;
			default		: bolIsChild = false ;	break;
		}
	}
	if (sMode.toLowerCase() === "minor"){
		switch (sFather){
			case "i"		: if (["i","ii dim","bIII aug", "iv", "V", "bVI"].indexOf(sChild) === -1) 	{bolIsChild = false} ;	break;
			case "ii dim"	: if (["bIII aug","V"].indexOf(sChild) === -1) 								{bolIsChild = false} ;	break;
			case "biii aug"	: if (["iv","bVI"].indexOf(sChild) === -1) 									{bolIsChild = false} ;	break;
			case "iv"		: if (["ii dim","V"].indexOf(sChild) === -1) 								{bolIsChild = false} ;	break;
			case "V"		: if (["i"].indexOf(sChild) === -1) 										{bolIsChild = false} ;	break;			
			case "bVI"		: if (["ii dim","iv"].indexOf(sChild) === -1) 								{bolIsChild = false} ;	break;
			default			: bolIsChild = false ;	break;
		}
	}	

	//console.log ("Father	:"+ sFather +"	Child	:"+sChild+	"	Type	:"+sMode+	"		Is Child?:	"+ bolIsChild); 
	return bolIsChild; 
}	