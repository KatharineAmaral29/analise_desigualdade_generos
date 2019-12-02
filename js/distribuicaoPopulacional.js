/*
	Análise Mundial da Desigualdade de Gêneros
	by Katharine Amaral
*/

function atualizaMapa(){
	//console.log('Função que atualiza o mapa')
}

(async function () {
	
    var i = 0;
	var mapa = d3.map();
	var anoMapa = '2018';	
	
    var dataset = await d3.csv('https://raw.githubusercontent.com/KatharineAmaral29/analise_desigualdade_generos/master/dados/gender_statistics.csv').then(function(data){		
		data.forEach(function(d){
			if(d['Series Code'] == 'SP.POP.TOTL.FE.ZS'){ //série correspondente a variável "Population, female (% of total population)" do dataset
				if(d[anoMapa] >= 50){
					d.Maioria = 'Feminino'
				} else if(d[anoMapa] > 0 && d[anoMapa] < 50) {
					d.Maioria = 'Masculino'
				} else {
					d.Maioria = 'Nenhum'
				}
				mapa.set(d.id, [+d.Maioria, d[anoMapa]])
			}
			//console.log('Series: ' + d['Series Code'] + ' País: ' + d['name'] + ' 2018 -> ' + d['2018'] + ' 2017 -> ' + d['2017'])
		});
		return mapa;
	})
	
	for(i = 0; i<dataset.size; i++){
		console.log('Series: ' + dataset[i]['Series Code'] + ' País: ' + dataset[i]['name'] + ' 2018 -> ' + dataset[i]['2018'] + ' 2017 -> ' + dataset[i]['2017'])
	}
	
	var facts = crossfilter(dataset);
    var all = facts.groupAll();
    var countryDim = facts.dimension(d => d['name'])
    var countryGroup = countryDim.group();

    var world = await d3.json('https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json');
    var width = '100%'
    var height = 600
    var projection = d3.geoMercator()

    var path = d3.geoPath(projection)

    var zoom = d3.zoom()
        .scaleExtent([0.85, 12])
        .on('zoom', function () {
            mapSvg.attr('transform', d3.event.transform)
        });

	var colorScale = d3.scaleOrdinal()
			.domain(["Feminino", "Masculino", "Nenhum"])
			.range(["#EB4CA0", "#6061A6", "#FBF495"]);
	
    var features = topojson.feature(world, world.objects.countries1).features;

    var mapSvg = d3.select('#map')
        .append('svg')
        .attr('class', 'sea')
        .attr("width", width)
        .attr("height", height)
        .call(zoom)
        .append('g')


    mapSvg.append('g').attr("id", "layer")
    mapSvg.select('#layer').selectAll("path")
        .data(features)
        .enter().append("path")
		.attr('fill', d => colorScale(dataset.get(d.id)))
		.attr('d', path)
        .on('mouseover', function (d) {
            d3.select(this)
                .style('cursor', 'pointer') //muda o mouse para mãozinha
                .attr('stroke-width', 3)
                .attr('stroke', '#1AFF00')
				
            let coordinates = [0, 0]
            coordinates = d3.mouse(this)
            const x = coordinates[0] + 280
            const y = coordinates[1] + 220
            showTooltip(dataset.get(d.id), x, y)
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .style('cursor', 'default')
                .attr('stroke-width', 0)
                .attr('stroke', 'none'); //volta ao valor padrão
            hideTooltip();
        })

	d3.select("#tooltip").remove()
		let node = d3.select("body")
		  .append("div")
		  .attr("id","tooltip")
		  .attr("class", "hidden")
		  .append("p")
		  .html("<b>País <u>X</u><span id='country_name'></b></span><br/><span id='taxa'> </span><u><b>Y</b></u>% da população total é do sexo feminino.")

	function showTooltip(county_id, x, y){
		d3.select("#tooltip")
		.style("left", x + "px")
		.style("top", y + "px")
		.select("#taxa")
		.text(dataset.get(county_id));
		//dataset['Maioria2018']);
	  
		d3.select("#tooltip")
		.select("#country_name")
		.text(dataset['name']);
	  
		d3.select("#tooltip")
		.classed("hidden", false)
	}
	
	function hideTooltip(){
		d3.select("#tooltip")
		.classed("hidden", true)
	}
	
	//Legenda de cores   
	
	mapSvg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(20,20)");
	
    mapSvg.select(".legendOrdinal")
	  	.call(colorScale); 
 
    dc.renderAll()
	
  // Início Time Slider
  var dataTime = d3.range(0, 59).map(function(d) {
    return new Date(1960 + d, 1, 1);
  });

  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(1040)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(2018, 1, 1))
    .on('onchange', val => {
	  onChange(val);
      //d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 1110)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));

  function onChange(val){
	  console.log('Novo valor: ' + (d3.timeFormat('%Y')(val)));
	  atualizaMapa();
  }

  //Fim Time Slider
	

	
})();

async function gerarGraficosDistribuicaoPopulacional(){	
	//Pega dado do país selecionado
	var paisDistribuicaoPopulacional = $('#paisDistribuicaoPopulacional').val();
	var aux = paisDistribuicaoPopulacional.substr(0, paisDistribuicaoPopulacional.indexOf('-')-1)
	paisDistribuicaoPopulacional = aux;
	
	//Pega dado do ano selecionado
	var anoDistribuicaoPopulacional = $('#anoDistribuicaoPopulacional').val();

	//Variáveis para as séries do gráfico
	var ruralWoman;
	var urbanaWoman;

	var ruralMan;
	var urbanaMan;
	
	//Varre o dataset e preenche as variáveis
	var datasetDistribuicaoPopulacional = await d3.csv('https://raw.githubusercontent.com/KatharineAmaral29/analise_desigualdade_generos/master/dados/gender_statistics.csv').then(function(data){		
		data.forEach(function(d){
			if(d['name'] == paisDistribuicaoPopulacional){ //verifica se é o mesmo país escolhido
				//Mulheres
				if(d['Series Code'] == 'SP.RUR.TOTL.FE.ZS') //série correspondente a variável "Rural population, female (% of total)" do dataset
					ruralWoman = d[anoDistribuicaoPopulacional]
				if(d['Series Code'] == 'SP.URB.TOTL.FE.ZS') //série correspondente a variável "Urban population, female (% of total)" do dataset
					urbanaWoman = d[anoDistribuicaoPopulacional]
				
				//Homens
				if(d['Series Code'] == 'SP.RUR.TOTL.MA.ZS') //série correspondente a variável "Rural population, male (% of total)" do dataset
					ruralMan = d[anoDistribuicaoPopulacional]
				if(d['Series Code'] == 'SP.URB.TOTL.MA.ZS') //série correspondente a variável "Urban population, male (% of total)" do dataset
					urbanaMan = d[anoDistribuicaoPopulacional]
			}
		})
	})

	try {
		// Themes begin
		am4core.useTheme(am4themes_frozen);
		am4core.useTheme(am4themes_animated);
		// Themes end
		
		var iconPath = "M449.665,275.654l-9.528,5.492c-1.171,0.668-2.627,0.453-3.534-0.454    l-19.988-19.987l-26.865,7.211c-1.563,0.406-3.177-0.525-3.581-2.077l-6.962-25.958l-20.788-23.045l-14.663,13.23l78.913,84.465    h63.331L449.665,275.654z M81.715,236.537l3.952-1.051c0.991-0.262,2.067,0,2.83,0.764l11.044,11.058l0.442-23.403    c-0.072-1.361,0.813-2.627,2.174-2.984l15.426-4.132l-9.958-16.501L81.715,236.537z M120.725,222.018l-14.938,3.988l-0.524,28.275    c-0.024,1.6-1.362,2.889-2.974,2.865c-0.8,0-1.504-0.334-2.029-0.859L85.56,241.576l-9.193,2.459l-50.365,70.496h44.776l0,0    l68.465-61.803L120.725,222.018z M216.137,319.881c-0.119-0.096-0.238-0.191-0.358-0.287l-0.047-0.048l-13.827-11.343    c-1.241-1.004-1.42-2.866-0.393-4.107c0.584-0.693,1.421-1.051,2.256-1.051l14.543-0.024l-22.019-18.03    c-1.241-1.026-1.409-2.889-0.393-4.131c0.584-0.692,1.421-1.051,2.256-1.051l12.036-0.023l-15.522-12.704    c-1.243-1.027-1.434-2.89-0.406-4.132c0.572-0.717,1.408-1.074,2.268-1.074h7.57l-14.566-16.358l-14.556,16.358h7.56    c1.623,0,2.936,1.313,2.936,2.938c0,1.002-0.5,1.886-1.288,2.411l-15.309,12.562h12.036c1.625,0,2.938,1.313,2.938,2.938    c0,1.003-0.514,1.91-1.29,2.436l-21.803,17.862h14.543c1.623,0,2.938,1.313,2.938,2.938c0,1.003-0.514,1.887-1.29,2.436    l-13.659,11.2c-0.109,0.096-0.229,0.191-0.348,0.263l-14.364,11.772l34.269-2.459c1.625-0.119,3.021,1.099,3.128,2.698    l0.025,21.158h7.08v-20.943c0-1.624,1.313-2.937,2.938-2.937l34.47,2.482L216.137,319.881z M215.829,218.842l-5.899-22.018    l-64.884,58.555l-0.047,0.048l-0.047,0.048l-0.06,0.048l-65.374,59.009h80.717l6.877-5.637h-14.543    c-0.835-0.023-1.67-0.381-2.244-1.074c-1.026-1.241-0.848-3.104,0.393-4.107l22.006-18.053h-12.048    c-0.847,0-1.683-0.383-2.256-1.075c-1.027-1.242-0.835-3.081,0.407-4.107l15.522-12.728h-5.899c-0.691,0-1.397-0.264-1.958-0.741    c-1.193-1.075-1.313-2.938-0.239-4.155l21.338-23.951c1.206-1.075,3.069-0.956,4.143,0.238l20.979,23.594    c0.537,0.525,0.848,1.266,0.848,2.078c0,1.623-1.314,2.938-2.938,2.938h-5.875l15.486,12.68c0.681,0.573,1.099,1.385,1.099,2.293    c0,1.623-1.325,2.938-2.938,2.938h-12.046l21.803,17.861c0.775,0.55,1.29,1.434,1.29,2.437c0,1.624-1.327,2.937-2.938,2.937    h-14.543l6.876,5.637h83.485l5.637-4.609h-7.714c-0.835-0.023-1.683-0.382-2.257-1.098c-1.026-1.242-0.848-3.081,0.395-4.107    l10.841-8.885h-2.865c-0.848-0.023-1.695-0.381-2.269-1.074c-1.026-1.242-0.835-3.104,0.407-4.107l16.383-13.445    c1.061-1.025,2.746-1.121,3.904-0.166l16.549,13.563c0.681,0.55,1.098,1.386,1.098,2.293c0,1.624-1.314,2.937-2.938,2.937h-2.865    l10.807,8.86c0.68,0.549,1.098,1.36,1.098,2.292c0,1.601-1.314,2.938-2.925,2.938h-7.714l5.624,4.609h71.14l-77.277-82.723    l-41.85-44.799l-21.982,5.898l15.451,26.77c0.811,1.385,0.333,3.2-1.063,3.988l-17.946,10.364    c-1.146,0.788-2.723,0.669-3.725-0.335l-19.976-19.987l-26.877,7.212C217.857,221.326,216.246,220.395,215.829,218.842z     M214.813,192.406l5.91,22.09l25.696-6.877c1.039-0.287,2.101,0.047,2.818,0.739l19.593,19.582l13.637-7.88l-15.893-27.535    c-0.813-1.385-0.336-3.199,1.062-3.988l0.705-0.311l22.65-6.064l-29.648-31.737L214.813,192.406z M305.428,319.546l-0.049,0.048    c-0.107,0.096-0.239,0.191-0.358,0.287l-2.948,2.411h9.658c1.625,0,2.938,1.313,2.938,2.938c0,1.003-0.5,1.887-1.277,2.436    l-20.728,16.979l24.968-1.814c1.6-0.096,3.009,1.121,3.129,2.721l0.01,16.024h4.312v-15.809c0-1.624,1.313-2.937,2.938-2.937    l25.17,1.814l-20.942-17.146c-1.242-1.027-1.41-2.89-0.396-4.131c0.585-0.693,1.422-1.051,2.257-1.051l9.672-0.024l-2.962-2.411    c-0.119-0.096-0.238-0.191-0.346-0.287l-12.632-10.364c-1.242-1.026-1.422-2.866-0.395-4.107c0.573-0.692,1.408-1.075,2.256-1.075    h7.689l-10.828-8.883c-1.255-1.027-1.434-2.865-0.408-4.131c0.574-0.693,1.41-1.075,2.27-1.075h2.865l-8.383-6.854l-8.357,6.854    h2.878c1.612,0,2.925,1.313,2.925,2.938c0,1.003-0.502,1.886-1.277,2.437l-10.639,8.715h7.714c1.623,0,2.938,1.314,2.938,2.938    c0,1.003-0.515,1.887-1.29,2.412L305.428,319.546z M362.752,212.92l21.182,23.475c0.348,0.334,0.621,0.788,0.753,1.289    l6.376,23.809l25.517-6.829c1.014-0.335,2.185-0.096,2.997,0.692l19.581,19.582l6.412-3.678l-67.451-72.215L362.752,212.92z"

		var chart = am4core.create("chartRural", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.data = [{
			"name": "Mulher",
			"value": ruralWoman + '%'
		}, {
			"name": "Homem",
			"value": ruralMan + '%'
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
			alert('Gráfico Rural -> Não possui dados para o país e ano selecionado.')
		}
	} catch( e ) {
	  console.log( e );
	}
	
	try {
		// Themes begin
		am4core.useTheme(am4themes_frozen);
		am4core.useTheme(am4themes_animated);
		// Themes end

		var iconPath = "M148.654,440.967V243.353l-78.067-73.31v270.924H148.654z M316.256,62.71    h47.418c1.83,0,3.334,1.519,3.334,3.335v374.922h48.802V26.002H250.756v16.511h62.166c1.83,0,3.334,1.491,3.334,3.334V62.71z     M333.146,124.117c0-1.844,1.504-3.335,3.334-3.335c1.845,0,3.336,1.491,3.336,3.335v316.85h20.521V69.38    c-68.333,0-136.681,0-205.014,0c0,123.871,0,247.742,0,371.587h21.947v-316.85c0-1.844,1.504-3.335,3.334-3.335    c1.844,0,3.334,1.491,3.334,3.335v316.85h24.51v-316.85c0-1.844,1.49-3.335,3.334-3.335c1.843,0,3.334,1.491,3.334,3.335v316.85    h24.508v-316.85c0-1.844,1.492-3.335,3.336-3.335c1.83,0,3.334,1.491,3.334,3.335v316.85h24.508v-316.85    c0-1.844,1.491-3.335,3.334-3.335c1.83,0,3.322,1.491,3.322,3.335v316.85h24.522v-316.85c0-1.844,1.491-3.335,3.319-3.335    c1.845,0,3.337,1.491,3.337,3.335v316.85h24.508V124.117z M95.747,221.744c0-1.843,1.504-3.334,3.334-3.334    c1.844,0,3.336,1.491,3.336,3.334v25.16c0,1.844-1.492,3.335-3.336,3.335c-1.83,0-3.334-1.491-3.334-3.335V221.744z     M95.747,279.438c0-1.844,1.504-3.334,3.334-3.334c1.844,0,3.336,1.49,3.336,3.334v25.159c0,1.844-1.492,3.335-3.336,3.335    c-1.83,0-3.334-1.491-3.334-3.335V279.438z M95.747,337.131c0-1.844,1.504-3.335,3.334-3.335c1.844,0,3.336,1.491,3.336,3.335    v25.158c0,1.845-1.492,3.336-3.336,3.336c-1.83,0-3.334-1.491-3.334-3.336V337.131z M95.747,394.824    c0-1.844,1.504-3.336,3.334-3.336c1.844,0,3.336,1.492,3.336,3.336v25.159c0,1.843-1.492,3.334-3.336,3.334    c-1.83,0-3.334-1.491-3.334-3.334V394.824z M122.207,279.438c0-1.844,1.491-3.334,3.335-3.334c1.831,0,3.32,1.49,3.32,3.334    v25.159c0,1.844-1.49,3.335-3.32,3.335c-1.844,0-3.335-1.491-3.335-3.335V279.438z M122.207,337.131    c0-1.844,1.491-3.335,3.335-3.335c1.831,0,3.32,1.491,3.32,3.335v25.158c0,1.845-1.49,3.336-3.32,3.336    c-1.844,0-3.335-1.491-3.335-3.336V337.131z M122.207,394.824c0-1.844,1.491-3.336,3.335-3.336c1.831,0,3.32,1.492,3.32,3.336    v25.159c0,1.843-1.49,3.334-3.32,3.334c-1.844,0-3.335-1.491-3.335-3.334V394.824z M436.767,211.768    c0-1.843,1.504-3.334,3.334-3.334c1.844,0,3.334,1.491,3.334,3.334v25.16c0,1.816-1.49,3.334-3.334,3.334    c-1.83,0-3.334-1.518-3.334-3.334V211.768z M459.973,211.768c0-1.843,1.492-3.334,3.334-3.334c1.831,0,3.336,1.491,3.336,3.334    v25.16c0,1.816-1.505,3.334-3.336,3.334c-1.842,0-3.334-1.518-3.334-3.334V211.768z M436.767,262.954    c0-1.843,1.504-3.335,3.334-3.335c1.844,0,3.334,1.492,3.334,3.335v25.159c0,1.844-1.49,3.334-3.334,3.334    c-1.83,0-3.334-1.49-3.334-3.334V262.954z M459.973,262.954c0-1.843,1.492-3.335,3.334-3.335c1.831,0,3.336,1.492,3.336,3.335    v25.159c0,1.844-1.505,3.334-3.336,3.334c-1.842,0-3.334-1.49-3.334-3.334V262.954z M436.767,314.141    c0-1.844,1.504-3.336,3.334-3.336c1.844,0,3.334,1.492,3.334,3.336V339.3c0,1.843-1.49,3.335-3.334,3.335    c-1.83,0-3.334-1.492-3.334-3.335V314.141z M459.973,314.141c0-1.844,1.492-3.336,3.334-3.336c1.831,0,3.336,1.492,3.336,3.336    V339.3c0,1.843-1.505,3.335-3.336,3.335c-1.842,0-3.334-1.492-3.334-3.335V314.141z M436.767,365.326    c0-1.844,1.504-3.335,3.334-3.335c1.844,0,3.334,1.491,3.334,3.335v25.16c0,1.843-1.49,3.334-3.334,3.334    c-1.83,0-3.334-1.491-3.334-3.334V365.326z M459.973,365.326c0-1.844,1.492-3.335,3.334-3.335c1.831,0,3.336,1.491,3.336,3.335    v25.16c0,1.843-1.505,3.334-3.336,3.334c-1.842,0-3.334-1.491-3.334-3.334V365.326z M459.973,416.513    c0-1.844,1.492-3.335,3.334-3.335c1.831,0,3.336,1.491,3.336,3.335v24.454h14.287V215.455l-58.465-56.012v281.523h14.302v-24.454    c0-1.844,1.504-3.335,3.334-3.335c1.844,0,3.334,1.491,3.334,3.335v24.454h16.538V416.513z M62.684,468.892    c-1.842,0-3.334-1.518-3.334-3.335c0-1.844,1.492-3.335,3.334-3.335h281.429c1.845,0,3.335,1.491,3.335,3.335    c0,1.817-1.49,3.335-3.335,3.335H62.684z M227.481,485.999c-1.844,0-3.336-1.491-3.336-3.335c0-1.816,1.492-3.334,3.336-3.334    h194.741c1.842,0,3.334,1.518,3.334,3.334c0,1.844-1.492,3.335-3.334,3.335H227.481z M442.16,485.999    c-1.842,0-3.334-1.491-3.334-3.335c0-1.816,1.492-3.334,3.334-3.334h24.346c1.845,0,3.336,1.518,3.336,3.334    c0,1.844-1.491,3.335-3.336,3.335H442.16z M51.595,485.483c-1.842,0-3.334-1.49-3.334-3.335c0-1.843,1.492-3.334,3.334-3.334    h92.288c1.83,0,3.32,1.491,3.32,3.334c0,1.845-1.49,3.335-3.32,3.335H51.595z M37.633,117.801    c-0.841,1.707-2.927,2.412-4.636,1.572c-1.707-0.842-2.413-2.928-1.572-4.637c4.284-8.648,9.855-16.727,16.593-23.885    c6.506-6.939,14.152-13.041,22.813-18.057c8.675-5.015,17.798-8.566,27.044-10.735c9.583-2.251,19.357-3.036,28.967-2.44    c1.899,0.136,3.362,1.789,3.241,3.688c-0.123,1.897-1.776,3.361-3.674,3.253c-8.946-0.569-18.028,0.163-26.962,2.251    c-8.621,2.033-17.095,5.34-25.146,9.977c-8.066,4.663-15.182,10.356-21.241,16.81C46.784,102.266,41.605,109.775,37.633,117.801z     M60.881,127.994c-0.867,1.707-2.969,2.359-4.664,1.491c-1.693-0.868-2.358-2.955-1.49-4.663    c3.213-6.182,7.307-11.957,12.227-17.107c4.757-4.961,10.302-9.354,16.551-12.959l0.204-0.109    c6.194-3.551,12.701-6.126,19.316-7.727c6.914-1.707,13.962-2.358,20.902-2.061c1.899,0.082,3.376,1.709,3.308,3.634    c-0.081,1.897-1.707,3.361-3.618,3.308c-6.303-0.299-12.703,0.298-18.965,1.844c-5.991,1.463-11.888,3.795-17.514,6.994    l-0.161,0.109c-5.68,3.28-10.709,7.266-15.033,11.766C67.497,117.176,63.782,122.409,60.881,127.994z M85.525,138.92    c-0.95,1.653-3.064,2.223-4.731,1.274c-1.667-0.949-2.237-3.063-1.288-4.718c2.034-3.578,4.569-6.887,7.551-9.869    c2.86-2.873,6.168-5.449,9.883-7.59c3.701-2.143,7.577-3.715,11.495-4.771c4.04-1.085,8.2-1.6,12.322-1.6    c1.897,0,3.457,1.545,3.457,3.47c0,1.897-1.56,3.442-3.457,3.442c-3.497,0-7.049,0.462-10.534,1.383    c-3.36,0.896-6.668,2.251-9.814,4.067c-3.159,1.817-5.977,4.013-8.444,6.479C89.443,133.01,87.274,135.856,85.525,138.92z     M108.123,136.859c2.874-1.572,6.099-1.871,9.028-1.111c3.023,0.813,5.747,2.793,7.442,5.693l0.121,0.244    c1.574,2.873,1.885,6.127,1.099,9.055c-0.8,3.01-2.778,5.721-5.707,7.402c-2.915,1.681-6.249,2.032-9.246,1.246    c-3.036-0.813-5.747-2.792-7.442-5.693l-0.107-0.217c-1.586-2.873-1.899-6.127-1.113-9.082c0.8-3.01,2.766-5.721,5.694-7.4    L108.123,136.859z M206.077,62.71h103.511V49.182c-34.501,0-69.013,0-103.511,0V62.71z"

		var chart = am4core.create("chartUrbana", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.data = [{
			"name": "Mulher",
			"value": urbanaWoman + '%'
		}, {
			"name": "Homem",
			"value": urbanaMan + '%'
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
			alert('Gráfico Urbano -> Não possui dados para o país e ano selecionado.')
		}
	} catch( e ) {
	  console.log( e );
	}						
}