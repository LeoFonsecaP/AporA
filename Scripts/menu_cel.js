const hamburguer = document.getElementsByClassName("ver_mais_cel");
hamburguer[0].addEventListener("click", function(){
	document.getElementsByClassName("header_links")[0].classList.toggle("active");
	hamburguer[0].classList.toggle("active");
});