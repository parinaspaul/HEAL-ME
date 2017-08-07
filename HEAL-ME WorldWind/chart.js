
		
		require(['crossfilter','d3','dc', 'queue'], function(crossfilter, d3, dc, queue){
		queue()
	.defer(d3.json, "json_files/charting/alldistrict.json")
	.defer(d3.json, "json_files/charting/Clinics.json")
	.defer(d3.json, "json_files/charting/Disease.json")
	.defer(d3.json, "json_files/charting/trainingcenter.json")
	.defer(d3.json, "json_files/charting/company.json")
	.defer(d3.json, "json_files/charting/hospital.json")
	.await(makeGraphs);

//d3.json("json_files/charting/alldistrict.json", function(error, projectsJson) {
	
//	d3.json("json_files/charting/Clinics.json", function(error, clinicsJson) {
		
//		d3.json("json_files/charting/Disease.json", function(error, diseaseJson) {
			
//			d3.json("json_files/charting/trainingcenter.json", function(error, trainingJson) {
function makeGraphs(error, projectsJson, clinicsJson, diseaseJson, trainingJson, companyJson, hospitalJson) {
 


  //Clean projectsJson data
  var donorschooseProjects = projectsJson;
  var clinicsProjects = clinicsJson;
  var diseaseProjects = diseaseJson;
  var trainingProjects = trainingJson;
  var companyProjects = companyJson;
  var hospitalProjects = hospitalJson;
  console.log(hospitalProjects);
  
  
  
  
  
  //var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
  //donorschooseProjects.forEach(function(d) {
  //  d["date_posted"] = dateFormat.parse(d["date_posted"]);
  //  d["date_posted"].setDate(1);
  //  d["total_donations"] = +d["total_donations"];
  //});

  //Create a Crossfilter instance
  var ndx = crossfilter(donorschooseProjects);

  //Define Dimensions
  var fuelLvlDim = ndx.dimension(function(d) { return d["Fuel_Level"]; });
  var GenVDim = ndx.dimension(function(d) { return d["Gen_V"]; });
  var regionDim = ndx.dimension(function(d) { return d["District"]; });
  var coopDim = ndx.dimension(function(d) { return d["Barangay"]; });
  var siteDim = ndx.dimension(function(d) { return d["Name"]; });
  //var clinicGroup = clinicDim.group().reduceSum(function (d) {return d["Clinic"]["Name"];});
  //console.log(clinicGroup);

//  var nested = donorschooseProjects.forEach(function(d) {
//    d.Region = d.Region;

//  console.log(d.Region);
// //var finalobj = $.merge(d.Sites,d.Sites);
// //console.log(finalobj);

// //console.log(d.value);
// });

// var nest = d3.nest()
//   .key(function(d) {return d.Coop})
  //  .key(function(d) {return d.Name})
  //  .key(function(d) {return d.Gen_V,d.Fuel_Level})  
  //  //.key(function(d) {return d.Gen_V})  
  //  .rollup(function(d) { 
  //  return d3.sum(d, function(g) {return g.value; });
  // })
//   .entries(donorschooseProjects);
   //console.log(JSON.stringify(nest));


//   projectsJson.forEach(function(d) {
//   d.Clinicas = d.Clinic[0].Clinic_Name;
   //d.Fuel_Level = d.key[2];
   //d.Gen_V = d.key[3];
//	console.log(d.Clinicas);
// });
// console.log(projectsJson.District);

//  var ndxNest = crossfilter(nest);
	//console.log(nest);
//  var NestedDim = ndxNest.dimension(function(d) { return d.key; });
//  var NestedGroup = ndxNest.groupAll().reduceCount(function(d) {return d.key;});
//  var NestedtotalFuelLvl = ndxNest.groupAll().reduceCount(function(d) {return d.values.Region;});
//  var NestedtotalGenV = ndxNest.groupAll().reduceSum(function(d) {return d["values"]["Gen_V"];});
  


  //Calculate metrics
  var numProjectsByregion = regionDim.group().reduceSum(function (d) {return d["Population"];});
  var numProjectsBycoop = coopDim.group().reduceSum(function (d) {return d["Population"];});
  var fuelLvlDimGroup = fuelLvlDim.group();
  var GenVGroup = GenVDim.group();
  //by region
  var fuelLvlDimByRegion = regionDim.group().reduceSum(function (d) {return d["Population"];});
  var GenVDimByRegion = regionDim.group().reduceSum(function (d) {return d["Population"];});
  //by site
  var fuelLvlDimBySite = siteDim.group().reduceSum(function (d) {return d["Fuel_Level"];});
  var GenVDimBySite = siteDim.group().reduceSum(function (d) {return d["Gen_V"];});

  var ndx2 = crossfilter(clinicsProjects);
  var all2 = ndx2.groupAll();
  var clinicDim = ndx2.groupAll().reduceCount(function(d) { return d["Clinic_Name"]; });
  var clinic2Dim = ndx2.dimension(function(d) { return d["Clinic_Type"]; });
  var clinic3Dim = ndx2.dimension(function(d) { return d["District"]; });
  var clinicPerDistrictDim = clinic2Dim.group().reduceCount(function (d) {return d["Clinic_Name"];});
  var clinicPerDistrict2Dim = clinic3Dim.group().reduceCount(function (d) {return d["Clinic_Type"];});


  var ndx3 = crossfilter(diseaseProjects);
  var all3 = ndx3.groupAll();
  var diseaseDim = ndx3.dimension(function(d) { return d["Location"]; });
  var diseaseTypeDim = ndx3.dimension(function(d) { return d["Cases"]; });
  var typePerLocation = diseaseTypeDim.group().reduceSum(function (d) {return d["Location_Num_Cases"];});
  var casesPerLocation = diseaseDim.group().reduceSum(function (d) {return d["Location_Num_Cases"];});
  
  
  var ndx6 = crossfilter(hospitalProjects);
  var all6 = ndx6.groupAll();
  var hospitalDistrictDim = ndx6.dimension(function(d) { return d["District"]; });
  var hospitalDim = ndx6.dimension(function(d) { return d["Type"]; });
  var hospitalPerTDristrict = hospitalDistrictDim.group().reduceCount(function (d) {return d["Type"];});
  var hospitalPerTDristrict2 = hospitalDim.group().reduceCount(function (d) {return d["District"];});
  
  
  var ndx4 = crossfilter(trainingProjects);
  var all4 = ndx4.groupAll();
  var trainingDistrictDim = ndx4.dimension(function(d) { return d["District"]; });
  var trainingDim = ndx4.dimension(function(d) { return d["Type_of_Training"]; });
  var typePerTDristrict = trainingDistrictDim.group().reduceCount(function (d) {return d["Type_of_Training"];});
  var typePerTDristrict2 = trainingDim.group().reduceCount(function (d) {return d["District"];});
  
  
  var ndx5 = crossfilter(companyProjects);
  var all5 = ndx5.groupAll();
  var companyDistrictDim = ndx5.dimension(function(d) { return d["District"]; });
  var companyDim = ndx5.dimension(function(d) { return d["Company_Type"]; });
  var companyPerTDristrict = companyDistrictDim.group().reduceCount(function (d) {return d["Company_Type"];});
  var companyPerTDristrict2 = companyDim.group().reduceCount(function (d) {return d["District"];});
  
  
  var all = ndx.groupAll();
  var total_Population = ndx.groupAll().reduceSum(function(d) {return d["Population"];});
  var total_Clinic = ndx2.groupAll().reduceCount(function(d) {return d["Clinic_Name"];});
  var total_Hospital = ndx6.groupAll().reduceCount(function(d) {return d["Hospital_Name"];});
  var total_Training = ndx4.groupAll().reduceCount(function(d) {return d["Training_Center"];});
  var total_Business = ndx5.groupAll().reduceCount(function(d) {return d["Address"];});
//   var total_Population = ndx.groupAll().reduce(

// function (p, v) {
//             p.Region = v.Region;
//             p.Name = v.Name;
//             p.Coop = v.Coop;
//             ++p.count;
//             return p;
//             console.log(p)
//         },
//          callback for when data is removed from the current filter results 
//         function (p, v) {
//             --p.count;

//             return p;
//         },
//         /* initialize p */
//         function () {
//             return {
//                 count: 0
//             };
//         }
// );

  //var filterRegion = regionDim.filter("ARMM");
  //var max_state = total_PopulationByState.top(1)[0].value;

  //Define values (to be used in charts)
  //var minDate = dateDim.bottom(1)[0]["date_posted"];
  //var maxDate = dateDim.top(1)[0]["date_posted"];

  // populations Charts
  regionChart = dc.barChart("#poverty-level-row-chart"); 
  coopChart = dc.rowChart("#coop-row-chart"); 
  totalPopulation = dc.numberDisplay("#total_pop");
  //var piechart = dc.pieChart('#pie-chart_fuel');
  totalClinic = dc.numberDisplay('#total_clinic');
  totalHospital = dc.numberDisplay("#total_hospital");
  totalTraining = dc.numberDisplay("#total_training");
  totalBusiness = dc.numberDisplay("#total_business");
  
  compositeChart = dc.compositeChart("#spend-chart");
  
  //clinic charts
  clinicChart = dc.rowChart("#clinic-chart");
  clinicperDistrictChart = dc.pieChart("#clinic2-chart");
  
  
  //disease charts
  diseaseChart = dc.barChart("#disease-chart");
  diseaseperlocationChart = dc.pieChart("#disease2-chart");
  
  
  //hospital charts
  hospitalChart = dc.rowChart("#hospital-chart");
  hospitalperdistrictChart = dc.pieChart("#hospital2-chart");
  
  
  //training charts
  trainingChart = dc.rowChart("#training-chart");
  trainingperdistrictChart = dc.pieChart("#training2-chart");
  
  
  //Company charts
  companyChart = dc.rowChart("#company-chart");
  companyperdistrictChart = dc.pieChart("#company2-chart");
  
  
  totalPopulation
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(total_Population)
    .formatNumber(d3.format(".4s"));

  totalHospital
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(total_Hospital)
    .formatNumber(d3.format(".4s"));

  totalClinic
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(clinicDim)
    .formatNumber(d3.format(".4n"));
	
  totalTraining
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(total_Training)
    .formatNumber(d3.format(".4n"));
	
  totalBusiness
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(total_Business)
    .formatNumber(d3.format(".4n"));

  // regionChart
  //   .width(300)
  //   .height(250)
  //       .dimension(regionDim)
  //       .group(numProjectsByregion)
  //       .xAxis().ticks(4);

  coopChart
    .width(300)
    .height(1780)
    .dimension(coopDim)
    .group(numProjectsBycoop)
//    .filter(document.getElementById("sel2").value) 
    .xAxis().ticks(4);
/* 
    regionChart
      .width(250)
      .height(250)
      .radius(80)
//    .slicesCap(1)
      .innerRadius(20)
      .transitionDuration(1300)
      .dimension(regionDim)
      .group(numProjectsByregion)
//    .filter(document.getElementById("pp-chart"))
      .controlsUseVisibility(true);
	  
	 */
    regionChart
        .width(368)
        .height(180)
        .margins({top: 20, right: 30, bottom: 30, left: 60})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('District')
        .yAxisLabel('Popupation Per District')
		.yAxisPadding(12)
        .dimension(regionDim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(numProjectsByregion);
	
/*     clinicChart
        .width(368)
        .height(180)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Type of Clinic')
        .yAxisLabel('Number of Clinic')
        .dimension(clinic2Dim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(clinicPerDistrictDim); */
		
	
	clinicChart
		.width(200)
		.height(150)
		.dimension(clinic2Dim)
		.group(clinicPerDistrictDim)
//    	.filter(document.getElementById("sel2").value) 
		.xAxis().ticks(4);
	
		
/* 	clinicChart.renderlet(function(chart){
		clinicChart.selectAll("g.x-text")
		.style('text-anchor',"end")
		.attr('dx','-10')
		.attr('dy','-5')
		.attr('transform','rotate(-90)');
	}); */
		
    clinicperDistrictChart
      .width(160)
      .height(160)
      .radius(50)
//    .slicesCap(1)
//      .innerRadius(0)
      .transitionDuration(1300)
      .dimension(clinic3Dim)
      .group(clinicPerDistrict2Dim)
//      .filter("District 1")
      .controlsUseVisibility(true);
	  
	//disease chart  
    diseaseChart
        .width(368)
        .height(230)
        .margins({top: 20, right: 30, bottom: 80, left: 60})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Type of Disease')
        .yAxisLabel('Number of Cases')
        .dimension(diseaseTypeDim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(typePerLocation);
		
		diseaseChart.renderlet(function (chart) {
			chart.selectAll("g.x text")
			.attr('dx', '-35')
			.attr('dy', '15')
			.attr('transform', "rotate(-45)")
			.attr("text-anchor", "end");});

		
		
    diseaseperlocationChart
      .width(250)
      .height(250)
      .radius(50)
//    .slicesCap(1)
      .innerRadius(50)
      .transitionDuration(1300)
      .dimension(diseaseDim)
      .group(casesPerLocation)
//      .filter("District 1")
      .controlsUseVisibility(true);
	  
	  
    hospitalChart
		.width(200)
		.height(250)
		.margins({top: 50, right: 50, bottom: 30, left: 50})
		.dimension(hospitalDim)
		.group(hospitalPerTDristrict2)
//    	.filter(document.getElementById("sel2").value) 
		.xAxis().ticks(4);
		
    hospitalperdistrictChart
      .width(250)
      .height(250)
      .radius(80)
//    .slicesCap(1)
      .innerRadius(20)
      .transitionDuration(1300)
      .dimension(hospitalDistrictDim)
      .group(hospitalPerTDristrict)
//      .filter("District 1")
      .controlsUseVisibility(true)
//	  .legend(dc.legend())
	  ;
	  
	  
	//training chart  
/*     trainingChart
        .width(368)
        .height(180)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Type of Training')
        .yAxisLabel('Number of Training Center')
        .dimension(trainingDistrictDim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(typePerTDristrict2); */
	
    trainingChart
		.width(200)
		.height(250)
		.margins({top: 50, right: 50, bottom: 30, left: 50})
		.dimension(trainingDim)
		.group(typePerTDristrict2)
//    	.filter(document.getElementById("sel2").value) 
		.xAxis().ticks(4);
		
    trainingperdistrictChart
      .width(250)
      .height(250)
      .radius(80)
//    .slicesCap(1)
      .innerRadius(20)
      .transitionDuration(1300)
      .dimension(trainingDistrictDim)
      .group(typePerTDristrict)
//      .filter("District 1")
      .controlsUseVisibility(true);
	  
	  
    companyChart
		.width(200)
		.height(250)
		.margins({top: 50, right: 50, bottom: 30, left: 50})
		.dimension(companyDim)
		.group(companyPerTDristrict2)
//    	.filter(document.getElementById("sel2").value) 
		.xAxis().ticks(4);
		
    companyperdistrictChart
      .width(200)
      .height(200)
      .radius(80)
//    .slicesCap(1)
      .innerRadius(20)
      .transitionDuration(1300)
      .dimension(companyDistrictDim)
      .group(companyPerTDristrict)
//      .filter("District 1")
      .controlsUseVisibility(true)
//	  .legend(dc.legend())
	  ;
	  
	  
/*  companyperdistrictChart.label(function(d) {
    return d.key + ' - ' + Math.round((d.endAngle - d.startAngle) / Math.PI * 50) + '%';
}); */

/*       companyperdistrictChart.on('pretransition', function(chart) {
          chart.selectAll('.dc-legend-item text')
              .text('')
            .append('tspan')
              .text(function(d) { return d.name; })
            .append('tspan')
              .attr('x', 100)
              .attr('text-anchor', 'end')
              .text(function(d) { return d.data; });
      }); */


	  
	  

// //pie chart
//   piechart
//     .width(300)
//     .height(300)
//     .radius(100)
// //  .slicesCap(1)
//     .innerRadius(20)
//     .transitionDuration(1000)
//     .dimension(GenVDim)
//     .group(GenVGroup);
// //  .filter(document.getElementById("pp-chart")) 
// //  .controlsUseVisibility(true);

//   barchart
//     //.xAxisLabel(col4)
//     .width(900)
//     .dimension(regionDim)
//     .group(fuelLvlDimByRegion)
//     .x(d3.scale.ordinal())
//     .xUnits(dc.units.ordinal);
 
 compositeChart
      .width(880)
      .height(230)
      .margins({top: 50, right: 50, bottom: 30, left: 50})
      .transitionDuration(500)
      .brushOn(false)
      .elasticY(true)
//      .mouseZoomable(true)
      .renderLabel(true)
      .renderHorizontalGridLines(true)
      //.x(d3.time.scale().domain([new Date("2011-11-14T16:15:00Z"), new Date("2011-11-14T17:45:00Z")]))
      ._rangeBandPadding(1)
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .dimension(regionDim)
      .group(fuelLvlDimByRegion)
      .legend(dc.legend().x(40).y(0).itemHeight(16).gap(4))

      .compose([
        dc.barChart(compositeChart)
          .group(fuelLvlDimByRegion, 'Fuel Level')
          .colors('blue')
          .gap(35)
          .centerBar(true)
          ,
        dc.barChart(compositeChart)
          .group(GenVDimByRegion, 'Gen V')
          .colors('red')
          .gap(35)
          .centerBar(true)
      ])
      .renderlet(function (chart) {
          chart.selectAll("g._1").attr("transform", "translate(-25, 0)");
      })
      ;

  dc.renderAll();


//add axis label on rowchart
        function AddXAxis(chartToUpdate, displayText) {
            chartToUpdate.svg()
                .append("text")
                .attr("class", "x-axis-label")
                .attr("text-anchor", "middle")
                .attr("x", chartToUpdate.width() / 2)
                .attr("y", chartToUpdate.height())
                .text(displayText);
        }
        AddXAxis(clinicChart, "Type of Clinics");
        AddXAxis(trainingChart, "Type of Training");
        AddXAxis(companyChart, "Type of Business Establishment");
        AddXAxis(hospitalChart, "Type of Hospital");
		
		
        AddXAxis(clinicperDistrictChart, "Clinic per District");
        AddXAxis(trainingperdistrictChart, "Training Center per District");
        AddXAxis(companyperdistrictChart, "Business per District");
        AddXAxis(hospitalperdistrictChart, "Hospital per District");
		


/*   function doSomething(){
var selected = document.getElementById("type").value;
//var val = selected.options[e.selectedIndex].value;
//console.log(val); 
console.log(selected); 
//document.getElementById("pp-chart").innerHTML = selected;
//filtering();
  }
 */



};

//});
//});
//});
//});

/* 	function myNewFunction(element) {
		var text = element.options[element.selectedIndex].text;
		console.log(text);
		
		regionChart
			.filter(text);
		dc.renderAll();

		clinicperDistrictChart
			.filter(text);
		dc.renderAll();
		//document.getElementById("test").innerHTML = text;
	}
 */
 
 	
document.getElementById('startJson').addEventListener('click', function() {
			
		/* var text = element.options[element.selectedIndex].text; */
		var text = jQuery("select option:selected").text();
		console.log(text);
		
		$('#reset_clinicpie a').attr('href',function(i,str) {
			return str + "javascript:require(['crossfilter','d3','dc', 'queue'], function(crossfilter, d3, dc, queue){dc.filterAll();dc.redrawAll();;});";
		});
/* 		
		$('#reset_clinicpie a').attr('href',function(i,str) {
			return str + "javascript:require(['crossfilter','d3','dc', 'queue'], function(crossfilter, d3, dc, queue){clinicperDistrictChart.filterAll();clinicChart.filterAll()dc.redrawAll();});";
		});
		
		$('#reset_clinicrow a').attr('href',function(i,str) {
			return str + "javascript:require(['crossfilter','d3','dc', 'queue'], function(crossfilter, d3, dc, queue){clinicChart.filterAll();clinicChart.filterAll()dc.redrawAll();});";
		});
		
		$('#reset_hospitalrow a').attr('href',function(i,str) {
			return str + "javascript:require(['crossfilter','d3','dc', 'queue'], function(crossfilter, d3, dc, queue){hospitalChart.filterAll();clinicChart.filterAll()dc.redrawAll();});";
		});
		
		$('#reset_hospitalpie a').attr('href',function(i,str) {
			return str + "javascript:require(['crossfilter','d3','dc', 'queue'], function(crossfilter, d3, dc, queue){hospitalperDistrictChart.filterAll();clinicChart.filterAll()dc.redrawAll();});";
		}); */
		
		regionChart
			.filter(text);
		dc.renderAll();

		clinicperDistrictChart
			.filter(text);
		dc.renderAll();
		
		trainingperdistrictChart
			.filter(text);
		dc.renderAll();
		
		hospitalperdistrictChart
			.filter(text);
		dc.renderAll();
		
		companyperdistrictChart
			.filter(text);
		dc.renderAll();
		
}, false);
		});