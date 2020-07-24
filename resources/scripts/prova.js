document.getElementsByClassName("button")[0].addEventListener("click", function(){
	var q = 0;
	var e = document.getElementsByClassName("alt");
	var questao = 0;
	var acertos = 0;
	corretas = JSON.parse(corretas.replace(/&quot;/g,'"'));
	for(var i = 0; i<e.length; i++){
		if(e[i].type == "radio"){
			if(e[i].checked){
				document.getElementsByClassName("usu")[q].innerHTML = ""
				document.getElementsByClassName("respostas")[q].classList.toggle("active");
				document.getElementsByClassName("usu")[q].innerHTML += "Sua resposta: " + e[i].value;
				if(e[i].value == corretas[questao]){
					acertos++;
					document.getElementsByClassName("usu")[q].classList.toggle("active");
				}
				q++;
				questao++;
			}
		}
	}
	if(questao < corretas.length){
		alert("Você deve responder todas as questões");
		location.reload();
	}
	document.getElementsByClassName("correcao")[0].innerHTML = ""
	document.getElementsByClassName("correcao")[0].innerHTML += "Você acertou " + acertos + " de " + corretas.length;

});
