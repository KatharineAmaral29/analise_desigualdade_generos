/*
	Análise Mundial da Desigualdade de Gêneros
	by Katharine Amaral
*/

$(document).ready(function() {
	
	 	// Instancia um novo mundoMapa
	 	var osmUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
	 	    osmAttrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, map tiles by &copy; <a href="https://carto.com/attribution">CARTO</a>',
	 	    osm = L.tileLayer(osmUrl, {
	 	        maxZoom: 18,
	 	        attribution: osmAttrib
	 	    });
  
	 	// inicialize o mundoMapa na div "mapid" centralizado no centro do globo e com zoom de 1.5
	 	var mundoMap = L.map('mapid').setView([16.636192, 13.886719], 1.5).addLayer(osm);

		// Lendo o arquivo com os dados
		dadosMundiais = d3.csv("https://media.githubusercontent.com/media/KatharineAmaral29/datavis_trabalho_final/master/dados/gender_statistics.csv").then(function(data){
			let mundoMap = d3.map()
			let maioria;
			data.forEach(function(d) {
				maioria = "Nenhum"
				console.log("Séries " + d["SeriesCode"] + "Ano " + d.Ano)
				if(d.SeriesCode == "SP.POP.TOTL.FE.ZS" && d.Ano == "2018"){
					if(d.Value >= 50){
						d.maioria = "Feminino"
					} else if(d.Value > 0 && d.Value < 50) {
						d.maioria = "Masculino"
					} else {
						d.maioria = "Nenhum"
					}
					mundoMap.set(d.CountryName,[+d.Ano, d.Valor, d.maioria])
				}			
			})
			return mundoMap
		})

		colorScale = d3.scaleOrdinal()
          .domain(["Feminino", "Masculino", "Nenhum"])
          .range(["#EB4CA0", "#6061A6", "#FBF495"]);

/*
		function highlightFeature(e) {
			let layer = e.target;
			//console.log(e.target)

			layer.setStyle({
				weight: 2,
				color: '#AAA',
				dashArray: '',
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			info.update(layer.feature);
		}

		function resetHighlight(e) {
			geoj.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			mundoMap.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}
	
		L.geoJson(dadosMundiais, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(mundoMap)


		function style(feature) {
		 			weight: 1,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.6,
					fillColor: red;//colorScale(homicidesByName.get(feature.properties.NOME)[1])
		}	
*/		
});
