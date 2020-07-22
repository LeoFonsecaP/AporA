document.getElementsByClassName("submit_prova")[0].addEventListener("click", function(){
	var q = 0;
	var e = document.getElementsByClassName("alt");
	for(var i = 0; i<e.length; i++){
		if(e[i].type == "radio"){
			if(e[i].checked){
				document.getElementsByClassName("usu")[q].innerHTML = ""
				document.getElementsByClassName("respostas")[q].classList.toggle("active");
				document.getElementsByClassName("usu")[q].innerHTML += "Sua resposta: " + e[i].value;
				q++;
			}
		}
	}
});
