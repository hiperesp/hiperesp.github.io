window.onload = function(){
	StartHiperCss();
};
function StartHiperCss(){
	SpanizeStrings();				//converter string para <span>string</span> de acordo com algumas condições...;
	LabelizeInputFiles();			//converter input[type="file"] para label (na verdade criar uma label automática);
}
function SpanizeStrings(){
	var stringToSpan = document.querySelectorAll("*[data-spanstringify=\"\"]");
	for(var i=0;i<stringToSpan.length;i++){
		SpanizeString(stringToSpan[i]);
	}
	delete stringToSpan;
}
function SpanizeString(element){
	var stringToSpanHTML = "";
	for(var i=0;i<element.textContent.length;i++){
		stringToSpanHTML += "<span>"+element.textContent[i]+"</span>";
	}
	element.innerHTML = stringToSpanHTML;
	delete stringToSpanHTML;
}
function LabelizeInputFiles(){
	var fileToLabel = document.querySelectorAll("input[type=\"file\"]");
	for(var i=0;i<fileToLabel.length;i++){
		LabelizeInputFile(fileToLabel[i], i);
	}
}
function ChangeFakeInputFile(element){
	var FileNameInputs = document.querySelectorAll("input[data-filenameinputfileid=\""+element.id+"\"]");
	for(var i=0;i<FileNameInputs.length;i++){
		if(element.files.length>0){
			FileNameInputs[i].value = element.files[0].name;
			FileNameInputs[i].title = element.files[0].name;
		} else {
			FileNameInputs[i].value = "";
			FileNameInputs[i].title = "Nenhum arquivo selecionado.";
		}
	}
}
function LabelizeInputFile(element, i){
	if(element.id==""||typeof element.id=="undefined"){
		element.id = "fileElement"+i;
	}
	element.setAttribute("onchange", element.getAttribute("onchange")+";ChangeFakeInputFile(this);");
	element.setAttribute("onreset", element.getAttribute("onreset")+";ChangeFakeInputFile(this);");
	if(element.disabled){
		element.outerHTML = "<div class=\"fakeInputFile\" data-inputfileid=\""+element.id+"\">"+element.outerHTML+"<label class=\"button disabled\" for=\""+element.id+"\">Escolher Arquivo</label><input type=\"text\" placeholder=\"Nenhum arquivo selecionado.\" data-filenameinputfileid=\""+element.id+"\" value=\"\" disabled=\"\"></div>";
	} else {
		element.outerHTML = "<div class=\"fakeInputFile\" data-inputfileid=\""+element.id+"\">"+element.outerHTML+"<label class=\"button button-1\" for=\""+element.id+"\">Escolher Arquivo</label><input type=\"text\" placeholder=\"Nenhum arquivo selecionado.\" data-filenameinputfileid=\""+element.id+"\" value=\"\" disabled=\"\"></div>";
	}
	ChangeFakeInputFile(element);
}