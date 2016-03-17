var result = [];
var lodash = require("lodash.min.js");
var md5 = require('md5.js');

if (event.request.method !== 'GET') {
    throw('Only HTTP GET is allowed on this service.');
}
 
params = event.request.parameters;

if (params && params.ids) {
    users = platform.api.get('system/user?ids=' + params.ids);
} else {
    throw('ids is a required parameter for this service!');
}

if (users.content && users.content.resource) {
    lodash._.each(users.content.resource, function(record) {
        result.push({
            id: record.id,
            name: record.name,
            first_name: record.first_name,
            last_name: record.last_name,
            email: record.email,
            phone: record.phone,
            profile_image_url: 'http://gravatar.com/avatar/' + md5.encode(record.email) + '?d=retro'
        });
    });
}

return { "resource": result };