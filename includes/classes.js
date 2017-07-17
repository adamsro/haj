// JavaScript Document


	/* Custom filtering function which will filter data in column four between two values */

$(document).ready(function() {
					  
	TableToolsInit.sSwfPath = "includes/TableTools/media/swf/ZeroClipboard.swf";
					  
	oTable = $('.display').dataTable( {
		"sDom": 'T<"clear">lfrtip',	   
		"bAutoWidth": false,
		"aoColumns": [ null, null, null, null, 
				    { "bSortable": false }, 
				    { "bSearchable": true , "bVisible":    false
				    }, 
				    { "bSortable": false },
				    { "bSortable": false }
				    ]
	});
	
/*	$.fn.dataTableExt.afnFiltering.push(
		function( oSettings, aData, iDataIndex ) {
			var iMin = document.getElementById('min').value * 1;
			var iMax = document.getElementById('max').value * 1;
			var iVersion = aData[3] == "-" ? 0 : aData[3]*1;
			if ( iMin == "" && iMax == "" )
			{
				return true;
			}
			else if ( iMin == "" && iVersion < iMax )
			{
				return true;
			}
			else if ( iMin < iVersion && "" == iMax )
			{
				return true;
			}
			else if ( iMin < iVersion && iVersion < iMax )
			{
				return true;
			}
			return false;
		}
	);*/
	
	function fnTeachers (){
		var teachers = [];
		$('#teachers :selected').each(function(i, selected){
			teachers[i] = "(" + $(selected).text() + ")";
		});
		var teachersJoin = teachers.join("|");
		var teachersString = "(" + teachersJoin + ")";
		return teachersString;
	}
	function fnMediums (){
		var mediums = [];
		$('#mediums :selected').each(function(i, selected){
			mediums[i] = "(" + $(selected).text() + ")";
		});
		var mediumsJoin = mediums.join("|");
		var mediumsString = "(" + mediumsJoin + ")";
		return mediumsString;
	}
	
	$('#min').keyup( function() { oTable.fnDraw(); } );
	$('#max').keyup( function() { oTable.fnDraw(); } );

	$('#teachers, #mediums').change( function () { 
		var teachersString = fnTeachers (" ", null);
		var mediumsString = fnMediums (" ", null);
		var finalFilterString = "(" + teachersString + " " + mediumsString + ")";
		
		if ((-1 != teachersString.search("(All Teachers)")) && (-1 != mediumsString.search("(All Mediums)"))) {
		oTable.fnFilter("(.)", null, false);
		}
		else if (-1 != teachersString.search("(All Teachers)") ) { 
		oTable.fnFilter(mediumsString, null, false);
		}
		else if (-1 != mediumsString.search("(All Mediums)") ) { 
		oTable.fnFilter(teachersString, null, false);
		}
		else { 
		oTable.fnFilter(finalFilterString, null, false);
		}
	});

 	// The instructions box 
	
	$("#instructions_close").click(function(){
		$("#instructions").slideUp("fast"); 
	});
});
