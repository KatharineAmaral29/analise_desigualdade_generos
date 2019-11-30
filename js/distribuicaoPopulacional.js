/*
	Análise Mundial da Desigualdade de Gêneros
	by Katharine Amaral
*/

(async function () {

    var dataset = await d3.csv('https://raw.githubusercontent.com/KatharineAmaral29/analise_desigualdade_generos/master/dados/gender_statistics.csv', function(data){});
	
    var i = 0;
	var datasetParaMapa;
	//Criando a variável Maioria para ser plotada no gráfico
    dataset.forEach(d => {
		if(d['Series Code'] == 'SP.POP.TOTL.FE.ZS'){ //série correspondente a variável "Population, female (% of total population)" do dataset
					if(d['2018'] >= 50){
						d.Maioria = 'Feminino'
					} else if(d['2018'] > 0 && d['2018'] < 50) {
						d.Maioria = 'Masculino'
					} else {
						d.Maioria = 'Nenhum'
					}
					datasetParaMapa[i].set(d['name_sort'],d.Maioria)
					i++
		}
    });

	dataset.forEach(d => {
			if(d['Series Code'] == 'SP.POP.TOTL.FE.ZS'){ //série correspondente a variável "Population, female (% of total population)" do dataset
			//console.log(d);
		}
	});
	
	var facts = crossfilter(dataset);
    var all = facts.groupAll();
    var countryDim = facts.dimension(d => d['name_sort'])
    var countryGroup = countryDim.group();

	/*var factsParaMapa = crossfilter(datasetParaMapa);
    var allParaMapa = factsParaMapa.groupAll();
    var countryDimParaMapa = factsParaMapa.dimension(d => d['name_sort'])
    var countryGroupParaMapa = countryDimParaMapa.group();
*/
    let world = await d3.json('https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json');
    var width = '100%'
    var height = 600
    var projection = d3.geoMercator()

    var path = d3.geoPath(projection)

    var zoom = d3.zoom()
        .scaleExtent([1 / 4, 9])
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
		.attr('fill', d => colorScale(dataset.Maioria))
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
            showTooltip(dataset['name_sort'], x, y)
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
		  .html("<b>País <u>X</u><span id='country_name'></b></span><br/><span id='taxa'> </span><u><b>Y</b></u>% da população total é mulher.")

	function showTooltip(county_id, x, y){
		d3.select("#tooltip")
		.style("left", x + "px")
		.style("top", y + "px")
		.select("#taxa")
		.text(dataset['Maioria']);
	  
		d3.select("#tooltip")
		.select("#country_name")
		.text(dataset['name_sort']);
	  
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
    return new Date(1960 + d, 10, 3);
  });

  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(1040)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1998, 10, 3))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
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

  //Fim Time Slider
	
})();