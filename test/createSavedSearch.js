const chai = require('chai');
const assert = chai.assert;
const SavedSearch = require('./lib/savedSearch');

describe('Create Saved Search', function() {
    let searchID;
    let res;
    let responseJson;
    let savedSearch = new SavedSearch();

    before(function(){
        res = savedSearch.createSavedSearch();
        responseJson = res.getBody().toString();
        searchID = JSON.parse(responseJson).id;
    });

    it('created saved search returned 200 status code', function() {
        assert.equal(res.statusCode,200, 'api didnt returned 200');
    });
    it('created saved search has a name stored', function() {
        assert.equal(JSON.parse(responseJson).name,'PSScene3Band Search', 'created saved search name do not match');
    });
    it('verify fields exist in response', function() {
        assert.exists(JSON.parse(responseJson).__daily_email_enabled);
        assert.exists(JSON.parse(responseJson)._links);
        assert.exists(JSON.parse(responseJson).created);
        assert.exists(JSON.parse(responseJson).filter);
        assert.exists(JSON.parse(responseJson).id);
        assert.exists(JSON.parse(responseJson).item_types);
        assert.exists(JSON.parse(responseJson).name);
        assert.exists(JSON.parse(responseJson).search_type);
        assert.exists(JSON.parse(responseJson).updated);
    });
    it('verify search type has saved value', function() {
        assert.equal(JSON.parse(responseJson).search_type,'saved');
    });
    it('verify item type is PSScene3Band ', function() {
        assert.equal(JSON.parse(responseJson).item_types,'PSScene3Band');
    });
    it('verify last executed field is null since its first search ', function() {
        assert.isNull(JSON.parse(responseJson).last_executed);
    });
    it('verify that search is actually saved using get saved search method ', function() {
        let response = savedSearch.findSavedSearch(searchID);
        let getSearchJSON = response.getBody().toString();
        assert.equal(JSON.parse(getSearchJSON).id,searchID);
    });
    it('verify create search & updated searchTime is same since its a new search ', function() {
        assert.equal(JSON.parse(responseJson).created, JSON.parse(responseJson).updated);
    });
});