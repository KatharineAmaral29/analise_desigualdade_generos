/*
	Análise Mundial da Desigualdade de Gêneros
	by Katharine Amaral
*/

// Função que gera a timeline dos países com lei de igualdade salarial

/*(async function () {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create("chartIgualdadeSalarial", am4plugins_timeline.CurveChart);
	chart.curveContainer.padding(0, 100, 0, 120);
	chart.maskBullets = false;

	var colorSet = new am4core.ColorSet();

	//Varre o dataset e preenche as variáveis
	var datasetIgualdadeSalarial = await d3.csv('https://raw.githubusercontent.com/KatharineAmaral29/analise_desigualdade_generos/master/dados/gender_statistics.csv').then(function(data){		
		data.forEach(function(d){
			var paisComLei = {"category": "", "year": "", "size": 0, "text": ""}
			if(d['Series Code'] == 'SG.LAW.EQRM.WK'){ //série correspondente a variável "Law mandates equal remuneration for females and males for work of equal value (1=yes, 0=no)" do dataset
				console.log('achou serie')
				for(var i=1960; i<2019; i++){
					console.log('ano ' + i)
					if(d[i] == '1'){
						console.log('ano ' + i + 'tem lei')
						console.log('Entrei aqui1')
						paisComLei = {"category": "", "year": i, "size": 1, "text": d['name']}
						
						console.log('data' + paisComLei)
						//chart.data.push(paisComLei);
						//paisComLei = {"category": "", "year": "", "size": 0, "text": ""};
					}
				}
			}
		})
	})
/*
	try {
		chart.dateFormatter.inputDateFormat = "yyyy";

		chart.fontSize = 11;
		chart.tooltipContainer.fontSize = 11;

		var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "category";
		categoryAxis.renderer.grid.template.disabled = true;

		var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.points = [{ x: -400, y: 0 }, { x: 0, y: 50 }, { x: 400, y: 0 }]
		dateAxis.renderer.polyspline.tensionX = 0.8;
		dateAxis.renderer.grid.template.disabled = true;
		dateAxis.renderer.line.strokeDasharray = "1,4";
		dateAxis.baseInterval = {period:"day", count:1}; // otherwise initial animation will be not smooth

		dateAxis.renderer.labels.template.disabled = true;

		var series = chart.series.push(new am4plugins_timeline.CurveLineSeries());
		series.strokeOpacity = 0;
		series.dataFields.dateX = "year";
		series.dataFields.categoryY = "category";
		series.dataFields.value = "size";
		series.baseAxis = categoryAxis;

		var interfaceColors = new am4core.InterfaceColorSet();

		series.tooltip.pointerOrientation = "down";

		var distance = 100;
		var angle = 60;

		var bullet = series.bullets.push(new am4charts.Bullet());

		var line = bullet.createChild(am4core.Line);
		line.adapter.add("stroke", function(fill, target) {
		  if (target.dataItem) {
			return chart.colors.getIndex(target.dataItem.index)
		  }
		});

		line.x1 = 0;
		line.y1 = 0;
		line.y2 = 0;
		line.x2 = distance - 10;
		line.strokeDasharray = "1,3";

		var circle = bullet.createChild(am4core.Circle);
		circle.radius = 30;
		circle.fillOpacity = 1;
		circle.strokeOpacity = 0;

		var circleHoverState = circle.states.create("hover");
		circleHoverState.properties.scale = 1.3;

		series.heatRules.push({ target: circle, min: 20, max: 50, property: "radius" });
		circle.adapter.add("fill", function(fill, target) {
		  if (target.dataItem) {
			return chart.colors.getIndex(target.dataItem.index)
		  }
		});
		circle.tooltipText = "{text}: {value}";
		circle.adapter.add("tooltipY", function(tooltipY, target){
		  return -target.pixelRadius - 4;
		});

		var yearLabel = bullet.createChild(am4core.Label);
		yearLabel.text = "{year}";
		yearLabel.strokeOpacity = 0;
		yearLabel.fill = am4core.color("#fff");
		yearLabel.horizontalCenter = "middle";
		yearLabel.verticalCenter = "middle";
		yearLabel.interactionsEnabled = false;

		var label = bullet.createChild(am4core.Label);
		//label.propertyFields.text = "text";
		label.strokeOpacity = 0;
		label.horizontalCenter = "right";
		label.verticalCenter = "middle";

		label.adapter.add("opacity", function(opacity, target) {
		  if(target.dataItem){
			var index = target.dataItem.index;
			var line = target.parent.children.getIndex(0);

			if (index % 2 == 0) {
			  target.y = -distance * am4core.math.sin(-angle);
			  target.x = -distance * am4core.math.cos(-angle);
			  line.rotation = -angle - 180;
			  target.rotation = -angle;
			}
			else {
			  target.y = -distance * am4core.math.sin(angle);
			  target.x = -distance * am4core.math.cos(angle);
			  line.rotation = angle - 180;
			  target.rotation = angle;
			}
		  }
		  return 1;
		});

		var outerCircle = bullet.createChild(am4core.Circle);
		outerCircle.radius = 30;
		outerCircle.fillOpacity = 0;
		outerCircle.strokeOpacity = 0;
		outerCircle.strokeDasharray = "1,3";

		var hoverState = outerCircle.states.create("hover");
		hoverState.properties.strokeOpacity = 0.8;
		hoverState.properties.scale = 1.5;

		outerCircle.events.on("over", function(event){
		  var circle = event.target.parent.children.getIndex(1);
		  circle.isHover = true;
		  event.target.stroke = circle.fill;
		  event.target.radius = circle.pixelRadius;
		  event.target.animate({property: "rotation", from: 0, to: 360}, 4000, am4core.ease.sinInOut);
		});

		outerCircle.events.on("out", function(event){
		  var circle = event.target.parent.children.getIndex(1);
		  circle.isHover = false;
		});

		chart.scrollbarX = new am4core.Scrollbar();
		chart.scrollbarX.opacity = 0.5;
		chart.scrollbarX.width = am4core.percent(50);
		chart.scrollbarX.align = "center";
		
	} catch( e ) {
	  console.log( e );
	}						
})();*/

async function gerarGraficosTrabalho(){	
	//Pega dado do país selecionado
	var paisTrabalho = $('#paisTrabalho').val();
	var aux = paisTrabalho.substr(0, paisTrabalho.indexOf('-')-1)
	paisTrabalho = aux;
	
	//Pega dado do ano selecionado
	var anoTrabalho = $('#anoTrabalho').val();

	//Variáveis para as séries do gráfico área de trabalho
	var agricultureWoman;
	var industryWoman;
	var servicesWoman;
	
	var agricultureMan;
	var industryMan;
	var servicesMan;
	
	//Varre o dataset e preenche as variáveis
	var datasetTrabalho = await d3.csv('https://raw.githubusercontent.com/KatharineAmaral29/analise_desigualdade_generos/master/dados/gender_statistics.csv').then(function(data){		
		data.forEach(function(d){
			if(d['name'] == paisTrabalho){ //verifica se é o mesmo país escolhido
				//Mulheres
				if(d['Series Code'] == 'SL.AGR.EMPL.FE.ZS') //série correspondente a variável "Employment in agriculture, female (% of female employment) (modeled ILO estimate)" do dataset
					agricultureWoman = d[anoTrabalho]
				if(d['Series Code'] == 'SL.IND.EMPL.FE.ZS') //série correspondente a variável "Employment in industry, female (% of female employment) (modeled ILO estimate)" do dataset
					industryWoman = d[anoTrabalho]
				if(d['Series Code'] == 'SL.SRV.EMPL.FE.ZS') //série correspondente a variável "Employment in services, female (% of female employment) (modeled ILO estimate)" do dataset
					servicesWoman = d[anoTrabalho]
				
				//Homens
				if(d['Series Code'] == 'SL.AGR.EMPL.MA.ZS') //série correspondente a variável "Employment in agriculture, male (% of male employment) (modeled ILO estimate)" do dataset
					agricultureMan = d[anoTrabalho]
				if(d['Series Code'] == 'SL.IND.EMPL.MA.ZS') //série correspondente a variável "Employment in industry, male (% of male employment) (modeled ILO estimate)" do dataset
					industryMan = d[anoTrabalho]
				if(d['Series Code'] == 'SL.SRV.EMPL.MA.ZS') //série correspondente a variável "Employment in services, male (% of male employment) (modeled ILO estimate)" do dataset
					servicesMan = d[anoTrabalho]
			}
		})
	})

	try {
		// Themes begin
		am4core.useTheme(am4themes_frozen);
		am4core.useTheme(am4themes_animated);
		// Themes end
		
		var iconPath = "M197.210 7.476 C 195.276 7.581,193.980 7.856,193.541 8.253 C 193.168 8.591,192.083 8.969,191.131 9.093 C 190.177 9.218,188.892 9.741,188.269 10.260 C 187.647 10.777,186.799 11.200,186.383 11.200 C 185.968 11.200,185.435 11.560,185.200 12.000 C 184.965 12.440,184.546 12.800,184.270 12.800 C 183.603 12.800,176.400 20.246,176.400 20.937 C 176.400 21.233,176.056 21.787,175.636 22.167 C 175.216 22.548,174.758 23.314,174.618 23.870 C 174.479 24.425,174.031 25.357,173.623 25.940 C 173.215 26.523,172.781 27.818,172.659 28.818 C 172.538 29.818,172.160 31.168,171.821 31.818 C 170.827 33.724,170.945 43.352,171.991 45.656 C 172.426 46.615,172.786 48.075,172.791 48.900 C 172.797 49.851,173.089 50.689,173.590 51.190 C 174.024 51.624,174.502 52.479,174.651 53.090 C 174.800 53.700,175.299 54.679,175.761 55.264 C 176.222 55.849,176.870 56.694,177.200 57.142 C 179.185 59.834,180.713 61.543,182.077 62.600 C 182.929 63.260,184.141 64.205,184.771 64.700 C 185.400 65.195,186.182 65.600,186.509 65.600 C 186.835 65.600,187.325 65.869,187.598 66.197 C 187.870 66.526,188.837 66.994,189.747 67.239 C 190.656 67.483,191.512 67.863,191.650 68.084 C 192.812 69.949,209.612 69.867,213.135 67.979 C 213.934 67.550,214.968 67.200,215.432 67.200 C 215.896 67.200,216.602 66.840,217.000 66.400 C 217.398 65.960,217.943 65.600,218.211 65.600 C 218.923 65.600,223.120 62.143,225.495 59.600 C 228.684 56.186,228.764 56.081,229.026 55.040 C 229.161 54.500,229.616 53.748,230.036 53.367 C 230.456 52.987,230.800 52.323,230.800 51.892 C 230.800 51.462,231.147 50.454,231.572 49.654 C 233.994 45.093,234.078 30.415,231.700 27.514 C 231.468 27.231,231.074 26.235,230.824 25.300 C 230.574 24.365,230.223 23.600,230.045 23.600 C 229.867 23.600,229.397 22.880,229.000 22.000 C 228.603 21.120,228.138 20.400,227.966 20.400 C 227.794 20.400,227.541 20.045,227.404 19.612 C 227.144 18.795,223.052 14.400,222.551 14.400 C 222.395 14.400,221.982 14.125,221.634 13.788 C 220.671 12.859,217.459 10.816,216.949 10.807 C 216.701 10.803,216.284 10.542,216.023 10.228 C 215.762 9.913,214.654 9.463,213.563 9.229 C 212.471 8.995,211.177 8.547,210.689 8.234 C 209.711 7.607,202.383 7.195,197.210 7.476 M162.808 78.687 C 161.271 78.779,159.947 79.086,159.557 79.439 C 159.195 79.766,158.202 80.132,157.350 80.251 C 155.986 80.441,150.937 82.595,150.400 83.215 C 150.290 83.342,149.615 83.682,148.900 83.971 C 148.185 84.260,147.600 84.637,147.600 84.809 C 147.600 85.085,146.249 86.047,143.871 87.464 C 143.442 87.719,142.981 88.094,142.846 88.298 C 142.711 88.502,142.301 88.833,141.936 89.034 C 141.277 89.398,138.314 93.030,136.400 95.822 C 135.850 96.624,135.112 97.596,134.760 97.980 C 134.408 98.365,133.921 99.252,133.677 99.952 C 133.433 100.651,132.981 101.477,132.672 101.785 C 132.363 102.094,131.992 103.240,131.847 104.331 C 131.702 105.423,131.340 106.518,131.042 106.765 C 130.745 107.012,130.380 108.127,130.232 109.243 C 130.084 110.359,129.611 111.928,129.181 112.730 C 128.752 113.532,128.400 114.733,128.400 115.400 C 128.400 116.067,128.066 117.239,127.657 118.006 C 127.248 118.773,126.782 120.293,126.620 121.384 C 126.458 122.475,125.982 123.805,125.563 124.338 C 125.108 124.916,124.800 125.939,124.800 126.870 C 124.800 127.729,124.440 129.138,124.000 130.000 C 123.560 130.862,123.198 132.070,123.196 132.684 C 123.194 133.298,122.750 134.700,122.209 135.800 C 121.668 136.900,121.219 138.451,121.213 139.246 C 121.206 140.041,120.867 141.121,120.461 141.646 C 120.054 142.171,119.610 143.570,119.473 144.755 C 119.336 145.940,118.960 147.202,118.636 147.560 C 118.313 147.917,117.862 149.364,117.635 150.775 C 117.408 152.185,117.033 153.456,116.802 153.599 C 116.570 153.742,116.211 154.904,116.003 156.180 C 115.795 157.457,115.376 158.884,115.071 159.351 C 114.767 159.818,114.384 161.093,114.222 162.184 C 114.059 163.275,113.582 164.605,113.163 165.138 C 112.708 165.716,112.400 166.739,112.400 167.670 C 112.400 168.529,112.057 169.904,111.638 170.725 C 111.219 171.547,110.747 173.115,110.589 174.209 C 110.431 175.304,110.055 176.483,109.753 176.829 C 109.451 177.175,109.092 178.345,108.954 179.429 C 108.817 180.513,108.421 181.850,108.074 182.400 C 107.727 182.950,107.312 184.361,107.152 185.536 C 106.991 186.710,106.588 187.971,106.256 188.338 C 105.925 188.704,105.529 189.993,105.377 191.202 C 105.225 192.411,104.721 194.029,104.258 194.797 C 102.947 196.970,102.977 206.959,104.300 208.750 C 104.795 209.420,105.200 210.122,105.200 210.312 C 105.200 210.741,106.898 212.250,109.000 213.690 C 110.526 214.735,110.825 214.786,115.458 214.793 L 120.317 214.800 123.158 211.986 C 124.721 210.439,126.000 208.933,126.000 208.640 C 126.000 208.347,126.360 207.650,126.800 207.091 C 127.240 206.531,127.602 205.562,127.604 204.937 C 127.606 204.312,128.050 202.900,128.591 201.800 C 129.137 200.691,129.581 199.070,129.587 198.162 C 129.596 197.084,129.855 196.293,130.346 195.849 C 130.837 195.405,131.168 194.393,131.316 192.887 C 131.440 191.629,131.914 189.887,132.370 189.015 C 132.827 188.144,133.200 186.773,133.200 185.969 C 133.200 185.159,133.529 184.083,133.939 183.554 C 134.346 183.029,134.790 181.632,134.926 180.449 C 135.063 179.267,135.424 177.917,135.728 177.449 C 136.033 176.982,136.415 175.700,136.576 174.600 C 136.738 173.500,137.214 172.039,137.635 171.353 C 138.056 170.667,138.400 169.428,138.400 168.600 C 138.400 167.772,138.741 166.533,139.158 165.847 C 139.575 165.161,140.044 163.610,140.201 162.400 C 140.358 161.190,140.726 159.928,141.019 159.595 C 141.312 159.262,141.737 157.843,141.962 156.442 C 142.188 155.040,142.649 153.588,142.986 153.215 C 143.324 152.842,143.601 152.011,143.602 151.369 C 143.605 149.810,144.349 147.200,144.790 147.200 C 144.984 147.200,145.266 146.165,145.417 144.900 C 145.569 143.635,146.031 142.039,146.446 141.353 C 146.861 140.667,147.206 139.497,147.213 138.753 C 147.219 138.009,147.668 136.500,148.209 135.400 C 148.750 134.300,149.194 132.765,149.196 131.989 C 149.198 131.213,149.480 130.178,149.822 129.690 C 150.164 129.201,150.624 127.676,150.845 126.301 C 151.156 124.355,151.524 123.511,152.501 122.500 L 153.757 121.200 159.850 121.200 C 167.505 121.200,168.391 121.781,166.400 125.496 C 165.960 126.316,165.600 127.656,165.600 128.471 C 165.600 129.287,165.261 130.550,164.847 131.277 C 164.433 132.005,163.992 133.537,163.868 134.682 C 163.744 135.827,163.377 137.177,163.053 137.682 C 162.729 138.187,162.340 139.631,162.187 140.891 C 162.026 142.224,161.595 143.545,161.155 144.052 C 160.628 144.659,160.400 145.539,160.399 146.961 C 160.398 148.233,160.121 149.453,159.663 150.204 C 159.259 150.866,158.801 152.367,158.646 153.540 C 158.490 154.713,158.011 156.328,157.581 157.130 C 157.152 157.932,156.799 159.311,156.799 160.194 C 156.798 161.077,156.459 162.355,156.045 163.033 C 155.632 163.711,155.165 165.241,155.009 166.433 C 154.852 167.625,154.478 168.989,154.177 169.464 C 153.875 169.939,153.449 171.445,153.229 172.812 C 153.009 174.178,152.580 175.680,152.277 176.148 C 151.973 176.617,151.617 178.054,151.487 179.341 C 151.353 180.657,150.960 182.002,150.590 182.412 C 150.217 182.823,149.785 184.310,149.597 185.827 C 149.413 187.305,149.082 188.626,148.860 188.763 C 148.638 188.900,148.242 190.270,147.980 191.806 C 147.719 193.343,147.278 194.870,147.000 195.200 C 146.723 195.530,146.374 196.811,146.226 198.047 C 146.077 199.283,145.606 200.948,145.178 201.746 C 144.750 202.544,144.400 203.875,144.400 204.704 C 144.400 205.534,144.063 206.841,143.651 207.610 C 143.239 208.379,142.766 209.994,142.600 211.200 C 142.434 212.406,141.961 214.021,141.549 214.790 C 141.137 215.559,140.800 216.823,140.800 217.600 C 140.800 218.377,140.467 219.639,140.061 220.406 C 139.655 221.173,139.210 222.770,139.073 223.955 C 138.937 225.140,138.526 226.439,138.162 226.842 C 137.780 227.264,137.387 228.639,137.233 230.087 C 137.087 231.469,136.681 233.050,136.331 233.600 C 135.981 234.150,135.591 235.552,135.465 236.715 C 135.331 237.944,134.892 239.266,134.417 239.869 C 133.835 240.609,133.600 241.499,133.600 242.965 C 133.600 244.179,133.345 245.386,132.978 245.910 C 132.636 246.399,132.175 247.921,131.954 249.294 C 131.733 250.667,131.314 252.062,131.024 252.395 C 130.733 252.728,130.368 254.080,130.212 255.400 C 130.055 256.720,129.584 258.361,129.164 259.047 C 128.744 259.733,128.394 260.993,128.386 261.847 C 128.379 262.701,128.025 264.120,127.600 265.000 C 127.175 265.880,126.821 267.273,126.814 268.096 L 126.800 269.592 146.100 269.696 L 165.400 269.800 165.600 329.400 L 165.800 389.000 167.023 391.200 C 169.182 395.081,169.791 395.995,170.222 395.997 C 170.455 395.999,171.237 396.437,171.961 396.971 C 172.685 397.506,174.002 398.065,174.888 398.215 C 175.988 398.401,176.560 398.726,176.695 399.243 C 176.961 400.257,182.800 400.408,182.800 399.402 C 182.800 399.012,183.627 398.573,185.173 398.144 C 187.568 397.478,191.600 394.531,191.600 393.447 C 191.600 393.176,192.050 392.345,192.600 391.600 L 193.600 390.245 193.600 329.999 C 193.600 278.587,193.683 269.639,194.168 268.976 C 195.041 267.784,208.960 267.784,209.832 268.976 C 210.317 269.639,210.400 278.505,210.400 329.253 C 210.400 365.366,210.546 388.843,210.771 388.982 C 210.975 389.108,211.354 389.884,211.614 390.706 C 212.074 392.163,213.923 395.274,214.478 395.526 C 214.630 395.595,215.390 396.156,216.166 396.773 C 216.942 397.389,218.302 398.010,219.188 398.152 C 220.159 398.307,220.996 398.725,221.296 399.205 C 221.927 400.215,227.600 400.426,227.600 399.439 C 227.600 398.826,229.576 398.000,231.042 398.000 C 231.856 398.000,233.997 396.090,236.972 392.710 C 238.307 391.194,238.394 387.319,238.397 328.962 C 238.400 273.246,238.429 270.898,239.131 270.262 C 239.791 269.665,241.776 269.599,259.231 269.594 C 269.884 269.591,278.362 269.437,278.071 269.253 C 277.781 269.068,277.346 267.586,277.106 265.959 C 276.865 264.331,276.425 262.712,276.126 262.359 C 275.828 262.007,275.440 260.527,275.265 259.071 C 275.081 257.545,274.661 256.109,274.273 255.681 C 273.897 255.266,273.600 254.283,273.600 253.456 C 273.600 252.642,273.150 250.907,272.600 249.600 C 272.050 248.293,271.600 246.593,271.600 245.822 C 271.600 245.050,271.241 243.830,270.801 243.110 C 270.362 242.389,270.002 241.167,270.001 240.394 C 270.001 239.621,269.663 238.359,269.251 237.590 C 268.839 236.821,268.366 235.206,268.200 234.000 C 268.034 232.794,267.561 231.179,267.149 230.410 C 266.737 229.641,266.400 228.377,266.400 227.600 C 266.400 226.823,266.048 225.532,265.619 224.730 C 265.189 223.928,264.710 222.313,264.554 221.140 C 264.399 219.967,263.941 218.466,263.537 217.804 C 263.115 217.111,262.801 215.836,262.799 214.800 C 262.796 213.693,262.495 212.545,262.016 211.819 C 261.588 211.169,261.117 209.639,260.971 208.419 C 260.824 207.198,260.452 205.912,260.144 205.559 C 259.836 205.207,259.440 203.727,259.265 202.271 C 259.081 200.745,258.661 199.309,258.273 198.881 C 257.897 198.466,257.600 197.483,257.600 196.656 C 257.600 195.842,257.150 194.107,256.600 192.800 C 256.050 191.493,255.600 189.668,255.600 188.744 C 255.600 187.794,255.333 186.768,254.986 186.385 C 254.649 186.012,254.188 184.560,253.962 183.158 C 253.737 181.757,253.309 180.338,253.013 180.005 C 252.716 179.672,252.345 178.320,252.189 177.000 C 252.032 175.680,251.640 174.298,251.317 173.930 C 250.994 173.561,250.586 172.101,250.411 170.685 C 250.235 169.270,249.812 167.681,249.470 167.156 C 249.128 166.630,248.724 165.210,248.572 164.000 C 248.421 162.790,248.060 161.527,247.771 161.193 C 247.482 160.860,247.045 159.334,246.801 157.803 C 246.556 156.273,246.155 154.896,245.908 154.743 C 245.662 154.591,245.331 153.361,245.171 152.010 C 245.008 150.625,244.587 149.227,244.206 148.806 C 243.792 148.349,243.443 147.077,243.306 145.530 C 243.167 143.963,242.800 142.637,242.341 142.046 C 241.902 141.480,241.595 140.422,241.587 139.446 C 241.581 138.529,241.139 136.914,240.591 135.800 C 240.008 134.614,239.606 133.093,239.604 132.063 C 239.601 130.936,239.319 129.969,238.800 129.309 C 238.360 128.750,238.000 127.713,238.000 127.006 C 238.000 126.298,237.800 125.144,237.555 124.441 C 236.692 121.968,237.574 121.600,244.362 121.601 C 251.744 121.603,252.552 121.954,252.975 125.335 C 253.126 126.550,253.498 127.749,253.800 128.000 C 254.102 128.251,254.476 129.478,254.630 130.728 C 254.784 131.978,255.245 133.429,255.655 133.954 C 256.098 134.521,256.400 135.556,256.400 136.507 C 256.400 137.386,256.744 138.667,257.165 139.353 C 257.586 140.039,258.055 141.500,258.208 142.600 C 258.361 143.700,258.740 145.004,259.051 145.497 C 259.361 145.990,259.724 147.250,259.859 148.297 C 259.993 149.344,260.440 150.761,260.852 151.447 C 261.263 152.133,261.606 153.303,261.613 154.047 C 261.619 154.791,262.068 156.300,262.609 157.400 C 263.150 158.500,263.594 159.981,263.596 160.690 C 263.598 161.400,263.959 162.570,264.399 163.290 C 264.854 164.037,265.198 165.307,265.199 166.246 C 265.199 167.240,265.495 168.270,265.944 168.846 C 266.353 169.371,266.817 170.700,266.975 171.800 C 267.133 172.900,267.535 174.224,267.867 174.741 C 268.200 175.259,268.625 176.762,268.812 178.083 C 268.998 179.403,269.420 180.780,269.749 181.143 C 270.077 181.507,270.472 182.793,270.625 184.002 C 270.778 185.211,271.164 186.499,271.481 186.864 C 271.799 187.230,272.191 188.490,272.352 189.664 C 272.512 190.839,272.935 192.250,273.291 192.800 C 273.647 193.350,274.063 194.658,274.215 195.706 C 274.368 196.755,274.832 198.278,275.246 199.091 C 275.661 199.904,276.000 201.268,276.000 202.121 C 276.000 203.068,276.312 204.071,276.800 204.691 C 277.240 205.250,277.600 206.099,277.600 206.576 C 277.600 207.054,278.050 208.055,278.600 208.800 C 279.150 209.545,279.600 210.292,279.600 210.460 C 279.600 210.921,281.261 212.474,283.024 213.660 C 285.732 215.481,293.474 215.557,295.550 213.783 C 298.129 211.578,300.059 209.258,300.417 207.931 C 300.636 207.123,301.024 206.392,301.281 206.306 C 302.067 206.044,301.944 199.216,301.132 198.000 C 300.765 197.450,300.338 195.956,300.184 194.680 C 300.029 193.404,299.639 192.096,299.316 191.773 C 298.993 191.450,298.600 190.244,298.443 189.093 C 298.285 187.942,297.865 186.550,297.509 186.000 C 297.153 185.450,296.732 184.106,296.573 183.014 C 296.414 181.921,295.950 180.481,295.543 179.814 C 295.136 179.146,294.802 177.901,294.801 177.047 C 294.801 176.193,294.440 174.912,293.999 174.199 C 293.559 173.487,293.085 172.025,292.946 170.952 C 292.806 169.878,292.462 168.730,292.181 168.400 C 291.900 168.070,291.481 166.769,291.250 165.509 C 291.019 164.249,290.575 162.809,290.263 162.309 C 289.951 161.809,289.591 160.590,289.463 159.600 C 289.335 158.610,288.864 157.087,288.415 156.215 C 287.967 155.344,287.600 154.015,287.600 153.263 C 287.600 152.510,287.263 151.333,286.852 150.647 C 286.440 149.961,285.989 148.513,285.850 147.429 C 285.710 146.345,285.343 145.175,285.033 144.829 C 284.724 144.483,284.339 143.300,284.178 142.200 C 284.018 141.100,283.552 139.573,283.143 138.806 C 282.734 138.039,282.400 136.758,282.400 135.960 C 282.400 135.147,282.070 134.088,281.651 133.554 C 281.239 133.029,280.766 131.614,280.601 130.410 C 280.435 129.205,280.020 127.792,279.678 127.269 C 279.335 126.747,278.920 125.320,278.754 124.100 C 278.588 122.879,278.281 121.772,278.071 121.640 C 277.606 121.348,276.805 118.565,276.802 117.231 C 276.801 116.699,276.531 115.966,276.202 115.602 C 275.873 115.239,275.490 114.055,275.350 112.971 C 275.211 111.887,274.760 110.439,274.348 109.753 C 273.937 109.067,273.600 107.887,273.600 107.130 C 273.600 106.292,273.210 105.227,272.600 104.400 C 272.050 103.655,271.600 102.730,271.600 102.346 C 271.600 101.962,271.402 101.525,271.160 101.376 C 270.919 101.226,270.496 100.570,270.222 99.917 C 269.452 98.085,263.026 91.096,259.633 88.400 C 258.941 87.850,258.084 87.130,257.729 86.800 C 257.077 86.194,255.921 85.510,253.000 84.002 C 252.120 83.547,251.130 83.019,250.800 82.828 C 248.616 81.564,245.763 80.400,244.848 80.400 C 244.254 80.400,243.056 80.001,242.185 79.513 L 240.600 78.627 203.000 78.578 C 182.320 78.552,164.233 78.601,162.808 78.687 "

		var chart = am4core.create("chartAreasTrabalhoWoman", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.data = [{
			"name": "Agriculture",
			"value": agricultureWoman + '%'
		}, {
			"name": "Industry",
			"value": industryWoman + '%'
		}, {
			"name": "Services",
			"value": servicesWoman + '%'
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
			alert('Gráfico Área de Atuação Feminina -> Não possui dados para o país e ano selecionado.')
		}
	} catch( e ) {
	  console.log( e );
	}
	
	try {
		// Themes begin
		am4core.useTheme(am4themes_frozen);
		am4core.useTheme(am4themes_animated);
		// Themes end

		var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"

		var chart = am4core.create("chartAreasTrabalhoMan", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.data = [{
			"name": "Agriculture",
			"value": agricultureMan + '%'
		}, {
			"name": "Industry",
			"value": industryMan + '%'
		}, {
			"name": "Services",
			"value": servicesMan + '%'
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
			alert('Gráfico Área de Atuação Masculina -> Não possui dados para o país e ano selecionado.')
		}
	} catch( e ) {
	  console.log( e );
	}						
}