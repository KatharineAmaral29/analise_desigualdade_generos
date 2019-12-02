/*
	Análise Mundial da Desigualdade de Gêneros
	by Katharine Amaral
*/

async function gerarGraficosFinancas(){	
	//Pega dado do país selecionado
	var paisFinancas = $('#paisFinancas').val();
	var aux = paisFinancas.substr(0, paisFinancas.indexOf('-')-1)
	paisFinancas = aux;
	
	//Pega dado do ano selecionado
	var anoFinancas = $('#anoFinancas').val();

	//Variáveis para as séries do gráfico
	var bankWoman;
	var savedWoman;

	var bankMan;
	var savedMan;
	
	//Varre o dataset e preenche as variáveis
	var datasetFinancas = await d3.csv('https://raw.githubusercontent.com/KatharineAmaral29/analise_desigualdade_generos/master/dados/gender_statistics.csv').then(function(data){		
		data.forEach(function(d){
			if(d['name'] == paisFinancas){ //verifica se é o mesmo país escolhido
				//Mulheres
				if(d['Series Code'] == 'fin1.t.a.2') //série correspondente a variável "Financial institution account,female(% age 15+)" do dataset
					bankWoman = d[anoFinancas]
				if(d['Series Code'] == 'fin18.t.d.2') //série correspondente a variável "Saved any money in the past year, female (% age 15+)" do dataset
					savedWoman = d[anoFinancas]
				
				//Homens
				if(d['Series Code'] == 'fin1.t.a.1') //série correspondente a variável "Financial institution account,male(% age 15+)" do dataset
					bankMan = d[anoFinancas]
				if(d['Series Code'] == 'fin18.t.d.1') //série correspondente a variável "Saved any money in the past year, male (% age 15+)" do dataset
					savedMan = d[anoFinancas]
			}
		})
	})

	try {
		// Themes begin
		am4core.useTheme(am4themes_frozen);
		am4core.useTheme(am4themes_animated);
		// Themes end
		
		var iconPath = "M280.459,418.887V263.523c0-6.188,5.033-11.221,11.221-11.221h19.039c6.187,0,11.219,5.033,11.219,11.221v155.363   c0,6.188-5.032,11.221-11.219,11.221H291.68C285.492,430.107,280.459,425.074,280.459,418.887z M63.634,221.406h384.693   l-0.555,65.02h-17.329v8h17.261l-0.143,16.652h-17.118v8h17.05l-0.142,16.627h-16.908v8h16.84l-0.143,16.652h-16.697v8h16.629   l-0.142,16.652h-16.487v8h16.419l-0.555,64.992H63.401l0.062-64.992h14.423v-8H63.471l0.016-16.652h14.4v-8H63.494l0.016-16.652   h14.376v-8H63.518l0.016-16.627h14.353v-8H63.541l0.016-16.652h14.33v-8H63.565L63.634,221.406z M362.855,418.887   c0,10.598,8.629,19.221,19.234,19.221h19.037c10.599,0,19.221-8.623,19.221-19.221V263.523c0-10.6-8.622-19.221-19.221-19.221   H382.09c-10.605,0-19.234,8.621-19.234,19.221V418.887z M272.459,418.887c0,10.598,8.623,19.221,19.221,19.221h19.039   c10.598,0,19.219-8.623,19.219-19.221V263.523c0-10.6-8.621-19.221-19.219-19.221H291.68c-10.598,0-19.221,8.621-19.221,19.221   V418.887z M182.062,418.887c0,10.598,8.622,19.221,19.22,19.221h19.025c10.599,0,19.221-8.623,19.221-19.221V263.523   c0-10.6-8.623-19.221-19.221-19.221h-19.025c-10.598,0-19.22,8.621-19.22,19.221V418.887z M91.652,418.887   c0,10.598,8.622,19.221,19.22,19.221h19.025c10.598,0,19.22-8.623,19.22-19.221V263.523c0-10.6-8.622-19.221-19.22-19.221h-19.025   c-10.598,0-19.22,8.621-19.22,19.221V418.887z M293.239,116.439c0,20.533-16.705,37.238-37.239,37.238   s-37.239-16.705-37.239-37.238c0-20.535,16.706-37.24,37.239-37.24S293.239,95.904,293.239,116.439z M271.266,124.809   c-0.082-1.898-0.461-3.482-1.139-4.756c-0.678-1.271-1.538-2.338-2.582-3.199c-1.045-0.859-2.223-1.555-3.535-2.088   c-1.313-0.531-2.653-1.012-4.018-1.438c-1.365-0.43-2.701-0.84-4.009-1.238c-1.308-0.396-2.478-0.887-3.51-1.477   c-1.032-0.59-1.878-1.322-2.539-2.199c-0.661-0.877-1.02-1.992-1.078-3.35c-0.038-0.881,0.079-1.699,0.352-2.459   c0.272-0.76,0.73-1.418,1.375-1.979c0.643-0.559,1.495-1.008,2.556-1.35c1.06-0.338,2.348-0.541,3.861-0.605   c1.333-0.059,2.549,0.037,3.645,0.283c1.098,0.248,2.064,0.523,2.904,0.824c0.84,0.305,1.537,0.592,2.092,0.861   c0.555,0.271,0.956,0.4,1.205,0.389c0.158-0.006,0.291-0.057,0.4-0.152s0.193-0.234,0.254-0.418c0.06-0.184,0.1-0.434,0.12-0.752   s0.021-0.691,0.003-1.121c-0.015-0.338-0.045-0.643-0.09-0.912c-0.047-0.27-0.096-0.506-0.15-0.707s-0.124-0.379-0.209-0.535   c-0.087-0.154-0.229-0.316-0.43-0.49c-0.199-0.172-0.564-0.377-1.096-0.613c-0.531-0.238-1.123-0.449-1.775-0.639   c-0.652-0.186-1.351-0.348-2.092-0.484c-0.742-0.139-1.453-0.227-2.134-0.266l0.454-6.809c-0.008-0.182-0.038-0.34-0.089-0.473   c-0.052-0.133-0.163-0.248-0.337-0.342s-0.426-0.156-0.756-0.188c-0.329-0.031-0.742-0.035-1.239-0.014   c-0.475,0.02-0.847,0.053-1.116,0.098s-0.481,0.117-0.636,0.215s-0.257,0.209-0.308,0.336c-0.051,0.125-0.085,0.258-0.102,0.395   l-0.383,6.873c-2.095,0.227-3.92,0.686-5.474,1.375c-1.555,0.689-2.831,1.547-3.827,2.576c-0.997,1.027-1.728,2.207-2.19,3.539   c-0.463,1.332-0.662,2.756-0.597,4.27c0.082,1.898,0.456,3.482,1.122,4.756c0.666,1.273,1.515,2.34,2.548,3.201   c1.033,0.859,2.201,1.566,3.504,2.123c1.302,0.555,2.625,1.041,3.967,1.457c1.342,0.418,2.662,0.83,3.957,1.238   c1.297,0.408,2.461,0.912,3.494,1.514s1.875,1.334,2.523,2.199c0.648,0.867,1,1.965,1.059,3.299   c0.093,2.168-0.662,3.922-2.269,5.258c-1.606,1.338-4.013,2.074-7.221,2.213c-1.808,0.078-3.362-0.025-4.664-0.309   c-1.302-0.283-2.409-0.604-3.318-0.959c-0.909-0.357-1.642-0.688-2.199-0.992c-0.556-0.303-0.981-0.451-1.274-0.438   c-0.203,0.008-0.377,0.057-0.52,0.141c-0.145,0.086-0.257,0.238-0.338,0.457s-0.137,0.492-0.168,0.822   c-0.031,0.328-0.035,0.742-0.014,1.24c0.029,0.676,0.097,1.205,0.204,1.586c0.106,0.381,0.284,0.684,0.532,0.91   c0.247,0.229,0.63,0.465,1.15,0.715c0.52,0.248,1.146,0.482,1.881,0.699c0.733,0.219,1.567,0.414,2.503,0.588   c0.935,0.176,1.949,0.307,3.039,0.396l-0.464,7.352c-0.038,0.182-0.024,0.346,0.039,0.49c0.063,0.145,0.186,0.254,0.37,0.324   c0.184,0.072,0.43,0.129,0.738,0.174c0.307,0.041,0.72,0.053,1.24,0.029c0.452-0.02,0.818-0.057,1.099-0.115   c0.28-0.057,0.498-0.129,0.653-0.215s0.258-0.193,0.309-0.318c0.05-0.127,0.084-0.258,0.101-0.395l0.429-7.387   c2.254-0.209,4.283-0.67,6.086-1.381c1.803-0.713,3.313-1.625,4.531-2.742c1.221-1.117,2.143-2.43,2.768-3.939   S271.344,126.617,271.266,124.809z M110.873,430.107h19.025c6.187,0,11.22-5.033,11.22-11.221V263.523   c0-6.188-5.033-11.221-11.22-11.221h-19.025c-6.187,0-11.22,5.033-11.22,11.221v155.363   C99.652,425.074,104.686,430.107,110.873,430.107z M201.282,430.107h19.025c6.188,0,11.221-5.033,11.221-11.221V263.523   c0-6.188-5.034-11.221-11.221-11.221h-19.025c-6.187,0-11.22,5.033-11.22,11.221v155.363   C190.062,425.074,195.095,430.107,201.282,430.107z M63.397,486.514h382.876v-20.512H63.397V486.514z M382.09,430.107h19.037   c6.188,0,11.221-5.033,11.221-11.221V263.523c0-6.188-5.033-11.221-11.221-11.221H382.09c-6.194,0-11.234,5.033-11.234,11.221   v155.363C370.855,425.074,375.896,430.107,382.09,430.107z M452.358,180.18H59.642l94.861-74.529L256,25.916L452.358,180.18z    M301.239,116.439c0-24.945-20.294-45.24-45.239-45.24s-45.239,20.295-45.239,45.24s20.294,45.238,45.239,45.238   S301.239,141.385,301.239,116.439z"

		var chart = am4core.create("chartBank", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.data = [{
			"name": "Mulher",
			"value": bankWoman + '%'
		}, {
			"name": "Homem",
			"value": bankMan + '%'
		}];
		
		var valido = false;
		for(var i=0; i<chart.data.length; i++){
			if(chart.data[i].value.substr(0, chart.data[i].value.indexOf('%')) > 0)
				valido = true;
		}
		
		if(valido){
			var series = chart.series.push(new am4charts.PictorialStackedSeries());
			series.dataFields.value = "value";
			series.dataFields.category = "name";
			
			series.maskSprite.path = iconPath;
			series.ticks.template.locationX = 0;
			series.ticks.template.locationY = 0.5;

			chart.legend = new am4charts.Legend();
			chart.legend.position = "left";
			chart.legend.valign = "bottom";
		} else {
			alert('Gráfico Instituição Financeira -> Não possui dados para o país e ano selecionado.')
		}
	} catch( e ) {
	  console.log( e );
	}
	
	try {
		// Themes begin
		am4core.useTheme(am4themes_frozen);
		am4core.useTheme(am4themes_animated);
		// Themes end

		var iconPath = "M25.659,15.511c-0.419-0.27-0.737-0.684-0.847-1.17c-0.125-0.551-0.314-1.083-0.558-1.593  c-0.243-0.509-0.246-1.099-0.024-1.617L26,7c-2.1,0-3.667,0.529-4.781,1.143c-0.542,0.299-1.194,0.311-1.754,0.048  C17.856,7.434,15.99,7,14,7C7.925,7,3,11.029,3,16c0,1.989,0.798,3.821,2.133,5.31l2.242,5.231c0.347,0.809,1.102,1.419,1.982,1.456  c1.391,0.06,2.478-1.155,2.283-2.517l-0.01-0.07c-0.045-0.316,0.225-0.585,0.542-0.541C12.766,24.953,13.376,25,14,25  c0.624,0,1.235-0.047,1.829-0.131c0.328-0.046,0.583,0.229,0.538,0.557c-0.135,0.997,0.37,2.018,1.302,2.398  c1.192,0.487,2.442-0.088,2.903-1.163l1.296-3.023c0.251-0.586,0.767-1.017,1.388-1.161l2.135-0.494l1.104-5.933L25.659,15.511z"

		var chart = am4core.create("chartSave", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.data = [{
			"name": "Mulher",
			"value": savedWoman + '%'
		}, {
			"name": "Homem",
			"value": savedMan + '%'
		}];

		var valido = false;
		for(var i=0; i<chart.data.length; i++){
			if(chart.data[i].value.substr(0, chart.data[i].value.indexOf('%')) > 0)
				valido = true;
		}

		if(valido){
			var series = chart.series.push(new am4charts.PictorialStackedSeries());
			series.dataFields.value = "value";
			series.dataFields.category = "name";
			
			series.maskSprite.path = iconPath;
			series.ticks.template.locationX = 0;
			series.ticks.template.locationY = 0.5;

			chart.legend = new am4charts.Legend();
			chart.legend.position = "left";
			chart.legend.valign = "bottom";
		} else {
			alert('Gráfico Economia -> Não possui dados para o país e ano selecionado.')
		}
	} catch( e ) {
	  console.log( e );
	}						
}