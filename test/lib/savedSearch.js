function savedSearch() {
    var request = require('sync-request');
    const Configs = require('../config/config');

    this.createSavedSearch = function (){
        let res = request('POST', Configs.API_ENDPOINTS.SEARCH ,{
            'headers': {
                'Authorization': Configs.AUTH.API_TOKEN
            },
            //got json below from api example page
            'json':
                {
                    "name": "PSScene3Band Search",
                    "__daily_email_enabled": true,
                    "item_types": [
                        // changed item type here to PSScene3Band as per your take home assignment request
                        "PSScene3Band"
                    ],
                    "filter": {
                        "type":"AndFilter",
                        "config":[
                            {
                                "type":"DateRangeFilter",
                                "field_name":"acquired",
                                "config":{
                                    "gte":"2020-01-01T00:00:00Z",
                                    "lte":"2020-01-31T00:00:00Z"
                                }
                            },
                            {
                                "type": "AssetFilter",
                                "config": [
                                    "analytic_sr"
                                ]
                            }
                        ]
                    }
                }
        });
       return res;
    };
    this.findSavedSearch = function (searchID){
        let res = request('GET', Configs.API_ENDPOINTS.SEARCH + '/' + searchID ,{
            'headers': {
                'Authorization': Configs.AUTH.API_TOKEN
            }
        });
        return res;
    };

    this.updateSearch = function (searchID){
        let res = request('PUT', Configs.API_ENDPOINTS.SEARCH + '/' + searchID ,{
            'headers': {
                'Authorization': Configs.AUTH.API_TOKEN
            },
            'json':
                {
                    "name": "Updated PSScene3Band Search",
                    "__daily_email_enabled": true,
                    "item_types": [
                        "PSScene4Band"
                    ],
                    "filter": {
                        "type":"AndFilter",
                        "config":[
                            {
                                "type":"DateRangeFilter",
                                "field_name":"acquired",
                                "config":{
                                    "gte":"2020-01-01T00:00:00Z",
                                    "lte":"2020-01-31T00:00:00Z"
                                }
                            },
                            {
                                "type": "AssetFilter",
                                "config": [
                                    "analytic_sr"
                                ]
                            }
                        ]
                    }
                }
        });
        return res;
    };

    this.deleteSearch = function (searchID) {
        let res = request('DELETE', Configs.API_ENDPOINTS.SEARCH + '/' + searchID , {
            'headers': {
                'Authorization': Configs.AUTH.API_TOKEN
            }
        });
        return res;
    }

}

module.exports = savedSearch;