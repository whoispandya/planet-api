var request = require('sync-request');
const chai = require('chai');
const assert = chai.assert;
const Configs = require('./config/config');
const SavedSearch = require('./lib/savedSearch');

describe('Delete Saved Search', function() {
    let searchID;
    let res;
    let newres;
    let responseJson;
    let newResponseJson;
    let savedSearch = new SavedSearch();
    let newSearchID;

    before(function(){
        res = savedSearch.createSavedSearch();
        responseJson = res.getBody().toString();
        searchID = JSON.parse(responseJson).id;

        //update search - name & itemType change
        newres = savedSearch.deleteSearch(searchID);
    });

    it('delete saved returned 204 status code', function() {
        assert.equal(newres.statusCode,204, 'api didnt returned 204');
    });
    it('finding saved search returns 404', function() {
        assert.equal(savedSearch.findSavedSearch(searchID).statusCode,404, 'delete search didnt work');
    });

});