/**
 * This is the file that will create the list view for the table.
 */
/* global $, odkCommon, odkData, odkTables, util, listViewLogic */
/* exported display, handleClick, getResults */
'use strict';

var listQuery = 'SELECT * FROM pediatria';

var searchParams = '(nome LIKE ? OR)';


function resumeFunc(state) {
    if (state === 'init') {
        // set the parameters for the list view
        listViewLogic.setTableId('pediatria');
        listViewLogic.setFormId('discharge');
        listViewLogic.setListQuery(listQuery);
        listViewLogic.setSearchParams(searchParams);
        listViewLogic.setListElement('#list');
        listViewLogic.setSearchTextElement('#search');
        listViewLogic.setLimitElement('#limitDropdown');
        listViewLogic.setPrevAndNextButtons('#prevButton', '#nextButton');
        listViewLogic.setNavTextElements('#navTextLimit', '#navTextOffset', '#navTextCnt');
        listViewLogic.setConstrains('hospitzd', '1', 'smxcau', '55')
        listViewLogic.showEditAndDeleteButtons(false);
     
        listViewLogic.setColIdsToDisplayInList(null, 'nome', 
            'Sex', 'sex', 'Dob', 'dob', 'Weight','peso', 
            'Bairro', 'bairro', 'Mother', 'nomemae','Lola','roundq');
    }

    listViewLogic.resumeFn(state);
    
 // create button that adds patients to the system - launches dischargeQuick form
    var addClient = document.createElement('p');
    addClient.onclick = function() {
        odkTables.addRowWithSurvey(
        		null,
                'pediatria',
                'dischargeQuick',
                null,
                null);
    };
    addClient.setAttribute('class', 'launchForm');
    addClient.innerHTML = 'Add child';
    document.getElementById('searchBox').appendChild(addClient);
}

function clearListResults() {
    listViewLogic.clearResults();
}

function prevListResults() {
    listViewLogic.prevResults();
}

function nextListResults() {
    listViewLogic.nextResults();
}

function getSearchListResults(){
    listViewLogic.getSearchResults();
}

function newListLimit(){
    listViewLogic.newLimit();
}