/**
 * This is the file that will be creating the list view.
 */
/* global $, odkTables, odkData, odkCommon */
/*exported display, handleClick, getResults */
'use strict';

var pediatria = {};

/** Handles clicking on a list item. Applied via a string. */
// Lunch follow-up form for rounds
function handleClick(index) {	
    if (!$.isEmptyObject(pediatria)) {
        odkTables.editRowWithSurvey(
        		null,
                'pediatria',
                index,
                'triagem',
                null);
    }
}

function cbSRSuccess(searchData) {
    console.log('cbSRSuccess data is' + searchData);
    if(searchData.getCount() > 0) {
        // open filtered list view if date found
    	var rowId = searchData.getRowId(0);
    	odkTables.openTableToListView(
    			null,
				'pediatria',
				'_id = ?',
				[rowId],
				'config/tables/pediatria/html/pediatria_list_old.html');
    } else {
        document.getElementById("search").value = "";
        document.getElementsByName("query")[0].placeholder="Client not found";
    }
}

function cbSRFailure(error) {
    console.log('pediatria_list: cbSRFailure failed with error: ' + error);
}

// filters list view by regdate entered by user
function getResults() {
    var searchText = document.getElementById('search').value;
    
    odkData.query('pediatria', 'regdate = ?', [searchText], null, null, 
    		null, null, null, null, true, cbSRSuccess, cbSRFailure);
}

// displays list view of patients
function render() {

    // create button that adds patients to the system - launches lateroundsQuick form
    var addClient = document.createElement('p');
    addClient.onclick = function() {
        odkTables.addRowWithSurvey(
        		null,
                'pediatria',
                'lateroundsQuick',
                null,
                null);
    };
    addClient.setAttribute('class', 'launchForm');
    addClient.innerHTML = 'Add child';
    document.getElementById('searchBox').appendChild(addClient);

    for (var i = 0; i < pediatria.getCount(); i++) {

        var regdateEntered = pediatria.getData(i, 'regdate');
        var nameEntered = pediatria.getData(i, 'nome');
        var dobEntered = pediatria.getData(i, 'dob');
        var anosEntered = pediatria.getData(i, 'anos');
        var mesEntered = pediatria.getData(i, 'meses');
        var semEntered = pediatria.getData(i, 'semanes');
        var diasEntered = pediatria.getData(i, 'dias');
        var	sexEntered = pediatria.getData(i, 'sex');
        var pesoEntered = pediatria.getData(i, 'peso');
        var tempEntered = pediatria.getData(i, 'tempr');
        var maeEntered = pediatria.getData(i, 'nomemae');
        var bairroEntered = pediatria.getData(i, 'bairro');
        var secEntered = pediatria.getData(i, 'sec1');
        var camEntered = pediatria.getData(i, 'cam1');
        var checkSmxcau = pediatria.getData(i, 'smxcau');

        // make list entry
        // Only show not patients not yet checked today
{
            /*    Creating the item space    */
            var item = document.createElement('li');
            item.setAttribute('class', 'item_space');
            item.setAttribute(
                    'onClick',
                    'handleClick("' + pediatria.getRowId(i) + '")');
            if(nameEntered === null) {
            	nameEntered = 'Não sabe';
            }
            item.innerHTML = nameEntered;
            document.getElementById('list').appendChild(item);

            var chevron = document.createElement('img');
            chevron.setAttribute(
                    'src',
                    odkCommon.getFileAsUrl('config/assets/img/little_arrow.png'));
            chevron.setAttribute('class', 'chevron');
            item.appendChild(chevron);

            // create sub-list in item space
            //  DoB/age information
            var age = document.createElement('li');
            var ageEntered = null;
        	age.setAttribute('class', 'detail');
            if(dobEntered !== null) {
                ageEntered = dobEntered.substring(8,10) + dobEntered.substring(4,7) + '-' + dobEntered.substring(0,4);
                age.innerHTML = 'Dob: ' + ageEntered;
            } else if(dobEntered === null) {
            	if(anosEntered !== null) {
            		ageEntered = anosEntered + ' ano(s)';
            	} else if(mesEntered !== null) {
            		ageEntered = mesEntered + ' mês(es)';
            	} else if(semEntered !== null) {
            		ageEntered = semEntered + ' semana(s)';
            	} else if(diasEntered !== null) {
            		ageEntered = diasEntered + ' dia(s)';
            	} else {
                	ageEntered = 'Não sabe';
                }
            	age.innerHTML = 'Age: ' + ageEntered;
            } 
            item.appendChild(age);
          
            //  Sex information
            var sex = document.createElement('li');
            sex.setAttribute('class', 'detail');
            if(sexEntered === '1') {
            	sexEntered = 'Male';
            } else if(sexEntered === '2') {
            	sexEntered = 'Female';
            } else {
            	sexEntered = 'Não sabe';
            }
            sex.innerHTML = 'Sex: ' + sexEntered;
            item.appendChild(sex);
            
            //  Weight and temperature information
            var pesotemp = document.createElement('li');
            pesotemp.setAttribute('class', 'detail');
            if(pesoEntered === null) {
            	pesoEntered = 'Não sabe';
            }
            if(tempEntered === null) {
            	tempEntered = 'Não sabe';
            }
            pesotemp.innerHTML = 'Weight: ' + pesoEntered + ',' + '     Temperature: ' + tempEntered;
            item.appendChild(pesotemp);
            
            //  Bairro information
            var bairro = document.createElement('li');
            bairro.setAttribute('class', 'detail');
            if(bairroEntered === '1') {
            	bairroEntered = 'Bandim I';
            } else if(bairroEntered === '2') {
            	bairroEntered = 'Bandim II';
            } else if(bairroEntered === '3') {
            	bairroEntered = 'Belem';
            } else if(bairroEntered === '4') {
            	bairroEntered = 'Mindera';
            } else if(bairroEntered === '7') {
            	bairroEntered = 'Cuntum I';
            } else if(bairroEntered === '9') {
            	bairroEntered = 'Cuntum II';
            } else if(bairroEntered === '999') {
            	bairroEntered = 'Não sabe';
            } else {
            	bairroEntered = 'Não sabe';
            }
            bairro.innerHTML = 'Bairro: ' + bairroEntered;
            item.appendChild(bairro);
            
            //  Name of mother
            var mae = document.createElement('li');
            mae.setAttribute('class', 'detail');
            if(maeEntered === null) {
            	maeEntered = 'Não sabe';
            }
            mae.innerHTML = 'Nome da mãe: ' + maeEntered;
            item.appendChild(mae);
            
            // Section and bed
            var seccam = document.createElement('li');
            seccam.setAttribute('class', 'detail');
            if(secEntered === null) {
            	secEntered = 'Não sabe';
            }
            if(camEntered === null) {
            	camEntered = 'Não sabe';
            }
            seccam.innerHTML = 'Seção: ' + secEntered + ',' + ' Cama: ' + camEntered;
            item.appendChild(seccam);
        }
    }
}

function cbSuccess(result) {
	pediatria = result;
    render();
}

function cbFailure(error) {
    console.log('pediatria_list: failed with error: ' + error);
}

function display() {
    odkData.getViewData(cbSuccess, cbFailure);
}
