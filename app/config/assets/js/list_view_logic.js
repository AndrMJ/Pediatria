/**
 * This is the file that will create the list view for the table.
 */
/* global $, odkCommon, odkData, odkTables, util */
 (function() {
'use strict';

window.listViewLogic = {
    tableId: null,
    formId: null,
    limitKey: null,
    offsetKey: null,
    rowCountKey: null,
    queryKey: null,
    searchKey: null,
    queryStmt: 'stmt',
    queryArgs: 'args',
    constraintVar1: null,
    constraintVal1: null,
    constraintVar2: null,
    constraintVal2: null,

    rowCount: 0,  
    limit: -1,
    offset: 0,

    queryToRun: null,
    queryToRunParams: null,

    listQuery: null,
    listQueryParams: null,

    searchParams: null,

    listElemId: null,
    imgId: null,
    searchTxtId: null,
    headerId: null,
    limitId: null,
    prevBtnId: null,
    nextBtnId: null,
    navTextLimit: null,
    navTextOffset: null,
    navTextCnt: null,
    showEditAndDelButtons: false,

    hdrLabel: null,
    hdrColId: null,
    firstDetLabel: null,
    firstDetColId: null,
    secondDetLabel: null,
    secondDetColId: null,
    thirdDetLabel: null,
    thirdDetColId: null,
    fourthDetLabel: null,
    fourthDetColId: null,
    fifthDetLabel: null,
    fifthDetColId: null,
    sixthDetLabel: null,
    sixthDetColId: null,
    seventhDetLabel: null,
    seventhDetColId: null,
    
    setConstrains: function(colId1, value1, colId2, value2) {
    	var that = this;
    	
    	that.constraintVar1 = colId1;
    	that.constraintVal1 = value1;
    	that.constraintVar2 = colId2;
    	that.constraintVal2 = value2;
    },
    
    setTableId: function(tableName) {
        if (tableName === null || tableName === undefined ||
            tableName.length === 0) {
            console.log('setTableId: invalid table name');
            return;
        }
        
        var that = this;

        that.tableId = tableName;
        that.limitKey = that.tableId + ':limit';
        that.offsetKey = that.tableId + ':offset';
        that.rowCountKey = that.tableId + ':rowCount';
        that.queryKey = that.tableId + ':query';
        that.searchKey = that.tableId + ':search';
    },
   
    setFormId: function(formName) {
        if (formName === null || formName === undefined ||
            formName.length === 0) {
            console.log('setFormId: invalid form name');
            return;
        }
        
        var that = this;
        
        that.formId = formName;
    },
    
    setListQuery: function(queryToUse) {
        if (queryToUse === null || queryToUse === undefined ||
            queryToUse.length === 0) {
            console.log('setListQuery: invalid list query');
            return;
        }

        var that = this;

        that.listQuery = queryToUse;
    },

    setListQueryParams: function(paramsToUse) {
        if (paramsToUse === null || paramsToUse === undefined ||
            paramsToUse.length === 0) {
            console.log('setListQueryParams: invalid list query params');
            return;
        }

        var that = this;

        that.listQueryParams = paramsToUse;
    },

    setSearchParams: function(searchParamsToUse) {
        if (searchParamsToUse === null || searchParamsToUse === undefined ||
            searchParamsToUse.length === 0) {
            console.log('setSearchParams: invalid search params to use');
            return;
        }

        var that = this;

        that.searchParams = searchParamsToUse;
    },

    setListElement: function(listElemIdToUse) {
        if (listElemIdToUse === null || listElemIdToUse === undefined ||
            listElemIdToUse.length === 0) {
            console.log('setListElement: invalid list element id');
            return;
        }

        var that = this;

        that.listElemId = listElemIdToUse;
    },

    setSearchTextElement: function(searchTxtIdToUse) {
        if (searchTxtIdToUse === null || searchTxtIdToUse === undefined ||
            searchTxtIdToUse.length === 0) {
            console.log('setSearchTextElement: invalid search text id');
            return;
        }

        var that = this;

        that.searchTxtId = searchTxtIdToUse;
    },

    setHeaderElement: function(headerIdToUse) {
        if (headerIdToUse === null || headerIdToUse === undefined ||
            headerIdToUse.length === 0) {
            console.log('setHeaderElement: invalid header id');
            return;
        }

        var that = this;

        that.headerId = headerIdToUse;
    },

    setLimitElement: function(limitIdToUse) {
        if (limitIdToUse === null || limitIdToUse === undefined ||
            limitIdToUse.length === 0) {
            console.log('setLimitElement: invalid header id');
            return;
        }

        var that = this;

        that.limitId = limitIdToUse;
    },

    setPrevAndNextButtons: function(prevBtnIdToUse, nextBtnIdToUse) {
        if (prevBtnIdToUse === null || prevBtnIdToUse === undefined ||
            prevBtnIdToUse.length === 0) {
            console.log('setPrevAndNextButtons: invalid prev button id');
            return;
        }

        if (nextBtnIdToUse === null || nextBtnIdToUse === undefined || 
            nextBtnIdToUse.length === 0) {
            console.log('setPrevAndNextButtons: invalid next button id');
            return;
        }

        var that = this;

        that.prevBtnId = prevBtnIdToUse;
        that.nextBtnId = nextBtnIdToUse;
    },

    setNavTextElements: function(txtLimit, txtOffset, txtCnt) {
        if (txtLimit === null || txtLimit === undefined ||
            txtLimit.length === 0) {
            console.log('setNavTextElements: invalid text limit id');
            return;
        }

        if (txtOffset === null || txtOffset === undefined || 
            txtOffset.length === 0) {
            console.log('setNavTextElements: invalid text offset id');
            return;
        }

        if (txtCnt === null || txtCnt === undefined || 
            txtCnt.length === 0) {
            console.log('setNavTextElements: invalid text cnt id');
            return;
        }

        var that = this;

        that.navTextLimit = txtLimit;
        that.navTextOffset = txtOffset;
        that.navTextCnt = txtCnt;
    },

    showEditAndDeleteButtons: function(showButtons, formIdToUse){
        if (showButtons === null || showButtons === undefined) {
            return;
        }

        var that = this;
        if (showButtons === true) {
            that.showEditAndDelButtons = showButtons;
            if (formIdToUse !== null || formIdToUse !== undefined) {
                that.formId = formIdToUse;
            }
        }
    },

    setColIdsToDisplayInList: function(headerLabel, headerColId, 
            firstDetailLabel, firstDetailColId, secondDetailLabel, secondDetailColId,
            thirdDetailLabel, thirdDetailColId, fourthDetailLabel, fourthDetailColId,
            fifthDetailLabel, fifthDetailColId, sixthDetailLabel, sixthDetailColId,
            seventhDetailLabel, seventhDetailColId) {
        var that = this;

        if (headerLabel !== null && headerLabel !== undefined && headerLabel.length !== 0) {
            that.hdrLabel = headerLabel;
        }

        if (headerColId !== null && headerColId !== undefined && headerColId.length !== 0) {
            that.hdrColId = headerColId;
        }

        if (firstDetailLabel !== null && firstDetailLabel !== undefined && firstDetailLabel.length !== 0) {
            that.firstDetLabel = firstDetailLabel;
        }

        if (firstDetailColId !== null && firstDetailColId !== undefined && firstDetailColId.length !== 0) {
            that.firstDetColId = firstDetailColId;
        }

        if (secondDetailLabel !== null && secondDetailLabel !== undefined && secondDetailLabel.length !== 0) {
            that.secondDetLabel = secondDetailLabel;
        }

        if (secondDetailColId !== null && secondDetailColId !== undefined && secondDetailColId.length !== 0) {
            that.secondDetColId = secondDetailColId;
        }
        
        if (thirdDetailLabel !== null && thirdDetailLabel !== undefined && thirdDetailLabel.length !== 0) {
            that.thirdDetLabel = thirdDetailLabel;
        }

        if (thirdDetailColId !== null && thirdDetailColId !== undefined && thirdDetailColId.length !== 0) {
            that.thirdDetColId = thirdDetailColId;
        }
        
        if (fourthDetailLabel !== null && fourthDetailLabel !== undefined && fourthDetailLabel.length !== 0) {
            that.fourthDetLabel = fourthDetailLabel;
        }

        if (fourthDetailColId !== null && fourthDetailColId !== undefined && fourthDetailColId.length !== 0) {
            that.fourthDetColId = fourthDetailColId;
        }
        
        if (fifthDetailLabel !== null && fifthDetailLabel !== undefined && fifthDetailLabel.length !== 0) {
            that.fifthDetLabel = fifthDetailLabel;
        }

        if (fifthDetailColId !== null && fifthDetailColId !== undefined && fifthDetailColId.length !== 0) {
            that.fifthDetColId = fifthDetailColId;
        }
        
        if (sixthDetailLabel !== null && sixthDetailLabel !== undefined && sixthDetailLabel.length !== 0) {
            that.sixthDetLabel = sixthDetailLabel;
        }

        if (sixthDetailColId !== null && sixthDetailColId !== undefined && sixthDetailColId.length !== 0) {
            that.sixthDetColId = sixthDetailColId;
        }

        if (seventhDetailLabel !== null && seventhDetailLabel !== undefined && seventhDetailLabel.length !== 0) {
            that.seventhDetLabel = seventhDetailLabel;
        }

        if (seventhDetailColId !== null && seventhDetailColId !== undefined && seventhDetailColId.length !== 0) {
            that.seventhDetColId = seventhDetailColId;
        }
    },

    setImageToDisplayInList: function(imgIdToUse) {
        var that = this;
        if (imgIdToUse !== null && imgIdToUse !== undefined && imgIdToUse.length !== 0) {
            that.imgId = imgIdToUse;
        }
    },

    makeCntQuery: function(queryToWrap) {
        if (queryToWrap !== null && queryToWrap !== undefined &&
            queryToWrap.length > 0) {
            return 'SELECT COUNT(*) AS cnt FROM (' + queryToWrap + ')';
        } else  {
            return null;
        }
    },

    makeSearchQuery: function(searchQueryToWrap) {
        var that = this;
        if (searchQueryToWrap !== null && searchQueryToWrap !== undefined &&
            searchQueryToWrap.length > 0) {
            if (searchQueryToWrap.indexOf('WHERE') >= 0) {
                return searchQueryToWrap + ' AND ' + that.searchParams;
            } else {
                return searchQueryToWrap + ' WHERE ' + that.searchParams;
            }
        } else {
            return null;
        }
    },

    processPromises: function(cntResultSet, resultSet) {
        var that = this;
        // Set the text for the number of rows
        if (cntResultSet.getCount() > 0) {
            that.rowCount = parseInt(cntResultSet.getData(0, 'cnt'));
        } else {
            that.rowCount = 0;
        }

        odkCommon.setSessionVariable(that.rowCountKey, that.rowCount);

        if (that.rowCount === 0) {
            that.offset = 0;
            odkCommon.setSessionVariable(that.offsetKey, that.offset);
        }

        // Display the results in the list
        that.updateNavButtons();
        
        // Right now we have a problem with having the count(*)
        // respect group privileges
        // This is a hack until I can fix this!
        var actualResultCount = resultSet.getCount();
        that.updateNavText(actualResultCount);
        that.clearRows();

        if (resultSet.getCount() === 0) {
            console.log('No ' + util.formatDisplayText(that.tableId));
            var note = $('<li>');
            note.attr('class', 'note');
            note.text('No ' + util.formatDisplayText(that.tableId));
            $(that.listElemId).append(note);

        } else {
            that.displayGroup(resultSet);
        }
    },

    appendUriParamsToListQuery: function() {
        var that = this;
        var sqlUriParamStmt = '';
        var retUriParams = util.getAllQueryParameters();

        if (retUriParams === null || retUriParams === undefined ||
            $.isEmptyObject(retUriParams) === true) {
            return sqlUriParamStmt;
        }

        var uriKeys = Object.keys(retUriParams);

        if (that.listQuery.indexOf('WHERE') < 0) {
            sqlUriParamStmt = ' WHERE ';
        } else {
            sqlUriParamStmt = ' AND ';
        }
        
        for (var i = 0; i < uriKeys.length; i++) {
            var uKey = uriKeys[i];

            sqlUriParamStmt += uKey + ' = ?';
            
            if (i < uriKeys.length - 1) {
                sqlUriParamStmt += ' AND ';
            }
        } 
        return sqlUriParamStmt;
    },

    getUriQueryParams: function() {
        var uriArgs = [];
        var retUriParams = util.getAllQueryParameters();

        if (retUriParams === null || retUriParams === undefined) {
            return;
        }

        var uriKeys = Object.keys(retUriParams);
        
        for (var i = 0; i < uriKeys.length; i++) {
            var uKey = uriKeys[i];
            uriArgs.push(retUriParams[uKey]);
        } 

        return uriArgs;
    },

    resumeFn: function(fIdxStart) {
        var that = this;
        console.log('resumeFn called. fIdxStart: ' + fIdxStart);

        // Use session variables if came back from rotation
        if (fIdxStart === 'init') {
            var searchText = odkCommon.getSessionVariable(that.searchKey);
            if (searchText !== null && searchText !== undefined && searchText.length !== 0) {
                $(that.searchTxtId).val(searchText);
            } 

            that.rowCount = odkCommon.getSessionVariable(that.rowCountKey);
            if (that.rowCount === null || that.rowCount === undefined) {
                that.rowCount = 0;
                odkCommon.setSessionVariable(that.rowCountKey, that.rowCount);
            } else {
                that.rowCount = parseInt(that.rowCount);
            }

            that.offset = odkCommon.getSessionVariable(that.offsetKey);
            if (that.offset === null ||that.offset === undefined) {
                that.offset = 0;
                odkCommon.setSessionVariable(that.offsetKey, that.offset);
            } else {
                that.offset = parseInt(that.offset);
            }
    
            that.limit = odkCommon.getSessionVariable(that.limitKey);
            if (that.limit === null || that.limit === undefined) {
                that.limit = -1;
                if (that.limitId !== null && that.limitId !== undefined && 
                    that.limitId.length !== 0) {
                    var limitSelected = that.limitId + ' option:selected';
                    that.limit = parseInt($(limitSelected).text());
                }

                odkCommon.setSessionVariable(that.limitKey, that.limit);
            } else {
                if (that.limitId !== null && that.limitId !== undefined && 
                    that.limitId.length !== 0) {
                    $(that.limitId).val(that.limit);
                }
 
                that.limit = parseInt(that.limit);
            }

            // Set header
            if (that.headerId !== null && that.headerId !== undefined && that.headerId.length !== 0) {
                // Localize Header Text
                var headerText = util.formatDisplayText(that.tableId);
                var locale = odkCommon.getPreferredLocale();
                var localeHeaderText = odkCommon.localizeText(locale, that.tableId);
                if (localeHeaderText !== null && localeHeaderText !== undefined) {
                    headerText = localeHeaderText;
                }
                $(that.headerId).text(headerText);
            }

            var queryToRunParts = odkCommon.getSessionVariable(that.queryKey);
            that.queryToRun = null;
            that.queryToRunParams = null;
            if (queryToRunParts !== null && queryToRunParts !== undefined) {
                queryToRunParts = JSON.parse(queryToRunParts);
                that.queryToRun = queryToRunParts[that.queryStmt];
                that.queryToRunParams = queryToRunParts[that.queryArgs];
            } else {
                queryToRunParts = {};
            }

            if (that.queryToRun === null || that.queryToRun ===  undefined ||
                that.queryToRunParams === null || that.queryToRunParams === undefined) {
                // Init display
                that.queryToRunParams = [];
                if (that.listQueryParams !== null && that.listQueryParams !== undefined &&
                    that.listQueryParams.length !== 0) {
                    that.queryToRunParams = that.queryToRunParams.concat(that.listQueryParams);
                }
                var addSql = that.appendUriParamsToListQuery();
                that.queryToRunParams = that.queryToRunParams.concat(that.getUriQueryParams());

                that.queryToRun = that.listQuery + addSql;
                queryToRunParts[that.queryStmt] = that.queryToRun;
                queryToRunParts[that.queryArgs] = that.queryToRunParams;
                odkCommon.setSessionVariable(that.queryKey, JSON.stringify(queryToRunParts));
            } 
        }

        var cntQueryToRun = that.makeCntQuery(that.queryToRun);

        var cntQueryPromise = new Promise(function(resolve, reject) {
            odkData.arbitraryQuery(that.tableId, 
                cntQueryToRun, that.queryToRunParams, null, null, resolve, reject);
        });

        var queryPromise = new Promise(function(resolve, reject)  {
            odkData.arbitraryQuery(that.tableId, 
                that.queryToRun, that.queryToRunParams, that.limit, that.offset, resolve, reject);
        });

        Promise.all([cntQueryPromise, queryPromise]).then(function(resultArray) {
            that.processPromises(resultArray[0], resultArray[1]);

        }, function(err) {
            console.log('promises failed with error: ' +  err);
        });

        if (fIdxStart === 'init') {
            // We're also going to add a click listener on the wrapper ul that will
            // handle all of the clicks on its children.
            $(that.listElemId).click(function(e) {
                // wrap up the object so we can call closest()
                var jqueryObject = $(e.target);
                // we want the closest thing with class item_space, which we
                // have set up to have the row id
                var containingDiv = jqueryObject.closest('.item_space');
                var rowId = containingDiv.attr('rowId');
                console.log('clicked with rowId: ' + rowId);
                // make sure we retrieved the rowId
                if (rowId !== null && rowId !== undefined) {
                    // we'll pass null as the relative path to use the default file
                    //odkTables.openDetailView(null, that.tableId, rowId, null);
                    odkTables.editRowWithSurvey(null, that.tableId, rowId, that.formId, null, null);
                    console.log('opened detail view');
                }
            });
        }
    },

    createLabel: function(lbl) {
        var retLbl = '';
        if (lbl !== null && lbl !== undefined && lbl.length !== 0) {
            retLbl = lbl + ': ';
        }

        return retLbl;
    },

    displayGroup: function(resultSet) {
        var that = this;
        var locale = odkCommon.getPreferredLocale();
        /* Number of rows displayed per 'chunk' - can modify this value */
        for (var i = 0; i < resultSet.getCount(); i++) {
        	
        	/* Handles the constraint variables*/
        	var check1 = util.formatColIdForDisplay(that.constraintVar1, i, resultSet, true);
            var check2 = util.formatColIdForDisplay(that.constraintVar2, i, resultSet, true);	
        	var checkTotal = null
        	
            /* Special constraint for Lola's list*/
        	if (that.formId === 'laterounds') {
        		var td = new Date();
                var m = td.getMonth();
                var d = td.getDate();
                var y = td.getFullYear();

                var today = new Date(y,m,d);
                if (check2 !== '') {
                	check2 = new Date(check2.substring(0,4), check2.substring(5,7)-1, check2.substring(8,10));
                } 
        		if ((check1 === that.constraintVal1 && today > check2) || (check1 === that.constraintVal1 && check2 === '')) {
        			checkTotal = '1'
        		}
        	} else if (check1 === that.constraintVal1 && check2 === that.constraintVal2) {
        		checkTotal = '1'
        	}
            
        	if (checkTotal === '1') {
        		/* Creates the item space */
        		var item = $('<li>');
        		item.attr('rowId', resultSet.getRowId(i));
        		item.attr('class', 'item_space');
        		item.text(that.createLabel(that.hdrLabel) + util.formatColIdForDisplay(that.hdrColId, i, resultSet, true));

        		if (that.showEditAndDelButtons === false)  {
        			/* Creates arrow icon (Nothing to edit here) */
        			var chevron = $('<img>');
        			chevron.attr('src', odkCommon.getFileAsUrl('config/assets/img/white_arrow.png'));
        			chevron.attr('class', 'chevron');
        			item.append(chevron);
        		}

        		if (that.firstDetColId !== null && that.firstDetColId !== undefined && that.firstDetColId.length !== 0) {
        			var field1 = $('<li>');
        			field1.attr('class', 'detail');
        			var fDetail = util.formatColIdForDisplay(that.firstDetColId, i, resultSet, true);
        			if (that.firstDetColId === 'sex') {
        				if (fDetail === '1') {
        					fDetail = 'Male';
        				} else if (fDetail === '2') {
        					fDetail = 'Female';
        				} else {
        					fDetail = 'Não sabe';
        				}
        			}
        			
        			field1.text(that.createLabel(that.firstDetLabel) + fDetail);
        			item.append(field1);
        		}

        		if (that.secondDetColId !== null && that.secondDetColId !== undefined && that.secondDetColId.length !== 0) {
        			var field2 = $('<li>');
        			field2.attr('class', 'detail');
                	var sDetail = util.formatColIdForDisplay(that.secondDetColId, i, resultSet, true);
                	if(that.secondDetColId === 'dob') {
                		if(sDetail !== null) {
                			var dobEntered = sDetail;
                			sDetail = dobEntered.substring(8,10) + dobEntered.substring(4,7) + '-' + dobEntered.substring(0,4);
                		}
                		else {
                			var ano = util.formatColIdForDisplay('anos', i, resultSet, true);
                			var mes = util.formatColIdForDisplay('meses', i, resultSet, true);
                			var sem = util.formatColIdForDisplay('semanes', i, resultSet, true);
                			var dia = util.formatColIdForDisplay('dias', i, resultSet, true);
                			if (ano !== '') {
                				sDetail = ano;
                				that.secondDetLabel = 'Ano(s)';
                			} else if (mes !== '') {
                				sDetail = mes;
                				that.secondDetLabel = 'Mês(es)';
                			} else if (sem !== '') {
                				sDetail = sem;
                				that.secondDetLabel = 'Semana(s)';
                			} else if (dia !== '') {
                				sDetail = dia;
                				that.secondDetLabel = 'Dia(s)';
                			} else {
                				sDetail = 'Não sabe';
                			}
                		}
                	}
                
                	field2.text(that.createLabel(that.secondDetLabel) + sDetail);
                	item.append(field2);
        		}
            
        		if (that.thirdDetColId !== null && that.thirdDetColId !== undefined && that.thirdDetColId.length !== 0) {
        			var field3 = $('<li>');
        			field3.attr('class', 'detail');
        			var tDetail = util.formatColIdForDisplay(that.thirdDetColId, i, resultSet, true);
        			if (that.thirdDetColId === 'peso') {
        				var ttDetail = util.formatColIdForDisplay('tempr', i, resultSet, true);
        				if(ttDetail === '') {
        					ttDetail = 'Não sabe';
        				}
        				if(tDetail === '') {
            				tDetail = 'Não sabe';
            			}
        			}
        			field3.text(that.createLabel(that.thirdDetLabel) + tDetail + that.createLabel('; Temperature') + ttDetail);
        			item.append(field3);
        		}
            
        		if (that.fourthDetColId !== null && that.fourthDetColId !== undefined && that.fourthDetColId.length !== 0) {
        			var field4 = $('<li>');
        			field4.attr('class', 'detail');
        			var foDetail = util.formatColIdForDisplay(that.fourthDetColId, i, resultSet, true);
        			if (that.fourthDetColId === 'bairro') {
                		if (foDetail === '1') {
                			foDetail = 'Bandim I';
                		} else if (foDetail === '2') {
                			foDetail = 'Bandim II';
						} else if (foDetail === '3') {
							foDetail = 'Belem';
                		} else if (foDetail === '4') {
                			foDetail = 'Mindera';
                		} else if (foDetail === '7') {
                			foDetail = 'Cuntum I';
                		} else if (foDetail === '9') {
                			foDetail = 'Cuntum II';
                		} else if (foDetail === '99' || foDetail === '') {
                			foDetail = 'Não sabe';
                		} else {
                		}
                	}
        			field4.text(that.createLabel(that.fourthDetLabel) + foDetail);
        			item.append(field4);
        		}
            
        		if (that.fifthDetColId !== null && that.fifthDetColId !== undefined && that.fifthDetColId.length !== 0) {
        			var field5 = $('<li>');
        			field5.attr('class', 'detail');
        			var fiDetail = util.formatColIdForDisplay(that.fifthDetColId, i, resultSet, true);
        			if(that.fifthDetColId === 'regdate') {
                		if(fiDetail !== '') {
                			var regEntered = fiDetail;
                			fiDetail = regEntered.substring(8,10) + regEntered.substring(4,7) + '-' + regEntered.substring(0,4);
                		} else {
                			fiDetail = 'Não sabe';
                		}
        			}
        			if(that.fifthDetColId === 'nomemae') {
        				if(fiDetail === '') {
        					fiDetail = 'Não sabe';
        				}
        			}
        			field5.text(that.createLabel(that.fifthDetLabel) + fiDetail);
        			item.append(field5);
        		}
        		
        		if (that.sixthDetColId !== null && that.sixthDetColId !== undefined && that.sixthDetColId.length !== 0) {
        			var field6 = $('<li>');
        			field6.attr('class', 'detail');
        			var siDetail = util.formatColIdForDisplay(that.sixthDetColId, i, resultSet, true);
        			if (that.sixthDetColId === 'sec1') {
        				var scDetail = util.formatColIdForDisplay('cam1', i, resultSet, true);
        				if(scDetail === '') {
        					scDetail = 'Não sabe';
        				}
        				if(siDetail === '') {
            				siDetail = 'Não sabe';
            			}
        				var label = that.createLabel(that.sixthDetLabel) + siDetail + that.createLabel('; Bed') + scDetail;
        			}
        			if (that.sixthDetColId === 'roundq') {
        				if(siDetail === '') {
            				siDetail = 'Não sabe';
            			}
        				var label = that.createLabel(that.sixthDetLabel) + siDetail;
        			}
        			field6.text(label);
        			item.append(field6);  
        		}
        		
        		if (that.seventhDetColId !== null && that.seventhDetColId !== undefined && that.seventhDetColId.length !== 0) {
        			var field7 = $('<li>');
        			field7.attr('class', 'detail');
        			var seDetail = util.formatColIdForDisplay(that.seventhDetColId, i, resultSet, true);
        			if (that.seventhDetColId === 'roundsdatelate') {
        				if (seDetail !== '') {
        					var visEntered = seDetail;
                			seDetail = visEntered.substring(8,10) + visEntered.substring(4,7) + '-' + visEntered.substring(0,4);
        				} else {
            				seDetail = 'Não sabe';
            			}
        			}
        			field7.text(that.createLabel(that.seventhDetLabel) + seDetail);
        			item.append(field7);  
        		}
        			
        		$(that.listElemId).append(item);
        		
        		
        		// don't append the last one to avoid the fencepost problem
        		var borderDiv = $('<div>');
        		borderDiv.addClass('divider');
        		$(that.listElemId).append(borderDiv);
        	}
        }    
    },

    clearRows: function() {
        var that = this;
        $(that.listElemId).empty();
    },

    updateNavText: function(actualResultSetCnt) {
        var that = this;

        if (that.navTextCnt !== null && that.navTextCnt !== undefined &&
            that.navTextCnt.length !== 0) {
            $(that.navTextCnt).text(that.rowCount);
        }

        if (that.rowCount <= 0) {

            if (that.navTextOffset !== null && that.navTextOffset !== undefined &&
                that.navTextOffset.length !== 0) {
                $(that.navTextOffset).text(0);
            }

            if (that.navTextLimit !== null && that.navTextLimit !== undefined &&
                that.navTextLimit.length !== 0) {
                $(that.navTextLimit).text(0);
            }
        } else {
            if (that.navTextOffset !== null && that.navTextOffset !== undefined &&
                that.navTextOffset.length !== 0) {
                var offsetDisplay = that.offset + 1;
                $(that.navTextOffset).text(offsetDisplay);
            }

            if (that.navTextLimit !== null && that.navTextLimit !== undefined &&
                that.navTextLimit.length !== 0) {

                // Hack until group permissions can be respected
                // We need a special case for when limit > actualResultSet and 
                // offset + actualResultSet < rowCount - then we need to display something else
                
                if (actualResultSetCnt < that.limit) {
                    var actualCnt = that.offset + actualResultSetCnt;
                    if (actualCnt < that.rowCount) {
                        $(that.navTextLimit).text(actualCnt);
                        return;
                    }
                }

                var limitVal = (that.offset + that.limit >= that.rowCount) ? that.rowCount : that.offset + that.limit;
                $(that.navTextLimit).text(limitVal);
            }
        }
    },

    updateNavButtons: function() {
        var that = this;
        if (that.prevBtnId !== null && that.prevBtnId !== undefined &&
            that.prevBtnId.length !== 0) {
            if (that.offset <= 0) {
                $(that.prevBtnId).prop('disabled',true);  
            } else {
                $(that.prevBtnId).prop('disabled',false);
            }
        }

        if (that.nextBtnId !== null && that.nextBtnId !== undefined &&
            that.nextBtnId.length !== 0) {
            if (that.offset + that.limit >= that.rowCount) {
                $(that.nextBtnId).prop('disabled',true);  
            } else {
                $(that.nextBtnId).prop('disabled',false);  
            }
        }
    },

    prevResults: function() {
        var that = this;

        if (that.prevBtnId === null && that.prevBtnId === undefined &&
            that.prevBtnId.length === 0) {
            return;
        }

        that.offset -= that.limit;
        if (that.offset < 0) {
            that.offset = 0;
        }

        that.updateNavButtons();

        odkCommon.setSessionVariable(that.offsetKey, that.offset);

        that.clearRows();
        that.resumeFn('prevButtonClicked');
    },

    nextResults: function() {
        var that = this;

        if (that.nextBtnId === null && that.nextBtnId === undefined &&
            that.nextBtnId.length === 0) {
            return;
        }

        that.updateNavButtons();

        if (that.offset + that.limit >= that.rowCount) {  
            return;
        }

        that.offset += that.limit;

        odkCommon.setSessionVariable(that.offsetKey, that.offset);

        that.clearRows();
        that.resumeFn('nextButtonClicked');
    },

    newLimit: function() {
        var that = this;
        var limitSelected = that.limitId + ' option:selected';
        that.limit = parseInt($(limitSelected).text());
        odkCommon.setSessionVariable(that.limitKey, that.limit);

        that.clearRows();
        that.resumeFn('limitChanged');
    },

    getSearchResults :function() {
        var that = this;
        if (that.searchTxtId === null || that.searchTxtId === undefined || 
            that.searchTxtId.length === 0) {
            return;
        }
        var searchText = $(that.searchTxtId).val();

        if (searchText !== null && searchText !== undefined &&
            searchText.length !== 0) {
            odkCommon.setSessionVariable(that.searchKey, searchText);
            searchText = '%' + searchText + '%';

            that.queryToRunParams = [];
            if (that.listQueryParams !== null && that.listQueryParams !== undefined &&
                that.listQueryParams.length > 0) {
                that.queryToRunParams = that.queryToRunParams.concat(that.listQueryParams);
            }

            var addSql = that.appendUriParamsToListQuery();
            var queryWithParams = that.listQuery + addSql;
            that.queryToRun = that.makeSearchQuery(queryWithParams);
            that.queryToRunParams = that.queryToRunParams.concat(that.getUriQueryParams());

            // Count the number of ?'s in queryToRun and 
            // append that to queryToRunParams
            var searchParamsToAdd = that.searchParams.split('?').length - 1;
            for (var i = 0; i < searchParamsToAdd; i++) {
                that.queryToRunParams.push(searchText);
            } 

            var queryToRunParts = {};
            queryToRunParts[that.queryStmt] = that.queryToRun;
            queryToRunParts[that.queryArgs] = that.queryToRunParams;
            odkCommon.setSessionVariable(that.queryKey, JSON.stringify(queryToRunParts));

            // Starting a new query - offset has to be 0
            that.offset = 0;
            odkCommon.setSessionVariable(that.offsetKey, that.offset);

            that.resumeFn('searchSelected');
        }
    },

    clearResults: function() {
        var that = this;
        if (that.searchTxtId === null || that.searchTxtId === undefined || 
            that.searchTxtId.length === 0) {
            return;
        }

        var searchText = $(that.searchTxtId).val();

        if (searchText === null || searchText === undefined ||
            searchText.length === 0) {
            odkCommon.setSessionVariable(that.searchKey, '');

            that.queryToRunParams = [];
            if (that.listQueryParams !== null && that.listQueryParams !== undefined &&
                that.listQueryParams.length > 0) {
                that.queryToRunParams = that.queryToRunParams.concat(that.listQueryParams);
            }

            var addSql = that.appendUriParamsToListQuery();
            that.queryToRun = that.listQuery + addSql;
            that.queryToRunParams = that.queryToRunParams.concat(that.getUriQueryParams());

            var queryToRunParts = {};
            queryToRunParts[that.queryStmt] = that.queryToRun;
            queryToRunParts[that.queryArgs] = that.queryToRunParams;
            odkCommon.setSessionVariable(that.queryKey, JSON.stringify(queryToRunParts));

            // Starting a new query - offset has to be 0
            that.offset = 0;
            odkCommon.setSessionVariable(that.offsetKey, that.offset);

            that.resumeFn('undoSearch');  
        }  
    }
};
})();
