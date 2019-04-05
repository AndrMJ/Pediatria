define(['database','opendatakit','controller','backbone','moment','formulaFunctions','handlebars','promptTypes','jquery','underscore','d3','handlebarsHelpers','combodate'],
function(database,  opendatakit,  controller,  Backbone,  moment,  formulaFunctions,  Handlebars,  promptTypes,  $,       _,           d3,   _hh) {
// custom functions are placed under 'window' to be visible in calculates...
// note that you need to be careful about naming -- should probably go somewhere else?
window.is_finalized = function() {
    return ('COMPLETE' === database.getInstanceMetaDataValue('_savepoint_type'));
};

var custom_date = promptTypes.datetime.extend({
    type: "date",
    showTime: false,
    timeFormat: "MM/DD/YYYY",
    timeTemplate: "DD / MM / YYYY"
});

return {
"custom_date" : custom_date
}

});
