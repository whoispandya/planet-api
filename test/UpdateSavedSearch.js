var request = require('sync-request');
const chai = require('chai');
const assert = chai.assert;
const Configs = require('./config/config');
const SavedSearch = require('./lib/savedSearch');

describe('Update Saved Search', function() {
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
        newres = savedSearch.updateSearch(searchID);
        newResponseJson = newres.getBody().toString();
        newSearchID = JSON.parse(newResponseJson).id;
    });

    it('update saved search returned 200 status code', function() {
        assert.equal(newres.statusCode,200, 'api didnt returned 200');
    });
    it('verify searchID remains same after update', function() {
        assert.equal(searchID,newSearchID, 'ID field changed after update');
    });
    it('verify certain fields are existing after updating saved saerch', function() {
        assert.exists(JSON.parse(newResponseJson).__daily_email_enabled);
        assert.exists(JSON.parse(newResponseJson)._links);
        assert.exists(JSON.parse(newResponseJson).created);
        assert.exists(JSON.parse(newResponseJson).filter);
        assert.exists(JSON.parse(newResponseJson).id);
        assert.exists(JSON.parse(newResponseJson).item_types);
        assert.exists(JSON.parse(newResponseJson).name);
        assert.exists(JSON.parse(newResponseJson).search_type);
        assert.exists(JSON.parse(newResponseJson).updated);
    });
    it('verify search type has saved value', function() {
        assert.equal(JSON.parse(newResponseJson).search_type,'saved');
    });
    it('verify itemtype is being updated ', function() {
        assert.notEqual(JSON.parse(responseJson).item_types,JSON.parse(newResponseJson).item_types);
    });
    it('verify last executed field is null since its first search ', function() {
        assert.isNull(JSON.parse(newResponseJson).last_executed);
    });
    it('verify updated flag is changed ', function() {
        assert.notEqual(JSON.parse(responseJson).updated, JSON.parse(newResponseJson).updated);
    });
});