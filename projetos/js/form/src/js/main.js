function validar(){
	var nome						= form1.nome.value;
	var email						= form1.email.value;
	var cpf							= form1.cpf.value;
	var dataNascimento	= form1.datanascimento.value;

	if (nome === '' || !isNaN(nome)) {
		document.querySelector('.alerta-nome').style.display = 'block';
		form1.nome.focus();
		return false;
	}

	if (email === '' || email.indexOf('@') == -1 || email.indexOf('.') == -1){
		document.querySelector('.alerta-email').style.display = 'block';
		form1.email.focus();
		return false;
	}

	if (cpf === ''){
		document.querySelector('.alerta-cpf').style.display = 'block';
		form1.cpf.focus();
		return false;
	}

	if (dataNascimento === ''){
		document.querySelector('.alerta-data').style.display = 'block';
		form1.cpf.focus();
		return false;
	}
}