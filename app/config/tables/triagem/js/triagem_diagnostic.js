/**
 * This is the file that will be creating the list view.
 */
/* global $, odkTables, odkData, odkCommon */
/*exported display, handleClick, getResults */
'use strict';

var triagem = {};

/** Handles clicking on a list item. Applied via a string. */
// Lunch follow-up form for diagnostics
function handleClick(index) {	
    if (!$.isEmptyObject(triagem)) {
        odkTables.editRowWithSurvey(
        		null,
                'triagem',
                index,
                'diagnostic',
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
				'triagem',
				'_id = ?',
				[rowId],
				'config/tables/triagem/html/triagem_diagnostic.html');
    } else {
        document.getElementById("search").value = "";
        document.getElementsByName("query")[0].placeholder="Client not found";
    }
}

function cbSRFailure(error) {
    console.log('triagem_diagnostic: cbSRFailure failed with error: ' + error);
}

// filters list view by regdate entered by user
function getResults() {
    var searchText = document.getElementById('search').value;
    
    odkData.query('triagem', 'regdate = ?', [searchText], null, null, 
    		null, null, null, null, true, cbSRSuccess, cbSRFailure);
}

// displays list view of patients
function render() {

    // create button that adds patients to the system - launches diagnosticQuick form
    var addClient = document.createElement('p');
    addClient.onclick = function() {
        odkTables.addRowWithSurvey(
        		null,
                'triagem',
                'diagnosticQuick',
                null,
                null);
    };
    addClient.setAttribute('class', 'launchForm');
    addClient.innerHTML = 'Add child';
    document.getElementById('searchBox').appendChild(addClient);

    for (var i = 0; i < triagem.getCount(); i++) {

        var nameEntered = triagem.getData(i, 'nome');
        var dobEntered = triagem.getData(i, 'dob');
        var	sexEntered = triagem.getData(i, 'sex');
        var pesoEntered = triagem.getData(i, 'peso');
        var tempEntered = triagem.getData(i, 'tempr')
        var bairroEntered = triagem.getData(i, 'bairro');
        var checkHosp = triagem.getData(i, 'hospitzd');

        // make list entry
        // Only show patients not yet checked for admission
       if (checkHosp === null){
            /*    Creating the item space    */
            var item = document.createElement('li');
            item.setAttribute('class', 'item_space');
            item.setAttribute(
                    'onClick',
                    'handleClick("' + triagem.getRowId(i) + '")');
            item.innerHTML = nameEntered;
            document.getElementById('list').appendChild(item);

            var chevron = document.createElement('img');
            chevron.setAttribute(
                    'src',
                    odkCommon.getFileAsUrl('config/assets/img/little_arrow.png'));
            chevron.setAttribute('class', 'chevron');
            item.appendChild(chevron);

            // create sub-list in item space
            //  DoB information
            var dob = document.createElement('li');
            dob.setAttribute('class', 'detail');
            if(dobEntered !== null) {
            	dobEntered = dobEntered.substring(8,10) + dobEntered.substring(4,7) + '-' + dobEntered.substring(0,4);
            }
            dob.innerHTML = 'Dob: ' + dobEntered;
            item.appendChild(dob);
            
            //  Sex information
            var sex = document.createElement('li');
            sex.setAttribute('class', 'detail');
            if(sexEntered === '1') {
            	sexEntered = 'Male';
            } else if(sexEntered === '2') {
            	sexEntered = 'Female'
            }
            sex.innerHTML = 'Sex: ' + sexEntered;
            item.appendChild(sex);
            
            //  Weight and temperature information
            var peso = document.createElement('li');
            peso.setAttribute('class', 'detail');
            peso.innerHTML = 'Weight: ' + pesoEntered + ',' + '     Temperature: ' + tempEntered;
            item.appendChild(peso);
            
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
            	bairroEntered = null
            }
            bairro.innerHTML = 'Bairro: ' + bairroEntered;
            item.appendChild(bairro);
        }
    }
}

function cbSuccess(result) {
	triagem = result;
    render();
}

function cbFailure(error) {
    console.log('triagem_list: failed with error: ' + error);
}

function display() {
    odkData.getViewData(cbSuccess, cbFailure);
}
