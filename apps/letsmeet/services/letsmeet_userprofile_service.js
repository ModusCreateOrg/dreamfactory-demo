var params, users, user;
var result = [];
var lodash = require("lodash.min.js");
var md5 = require('md5.js');

function getGravatarByEmailAddress(emailAddress) {
    return 'http://gravatar.com/avatar/' + md5.encode(emailAddress) + '?d=retro';
}

if (event.request.method !== 'GET') {
    throw('Only HTTP GET is allowed on this service.');
}
 
params = event.request.parameters;

if (params && params.ids) {
    users = platform.api.get('system/user?ids=' + params.ids);
    if (users.content && users.content.resource) {
        lodash._.each(users.content.resource, function(record) {
            result.push({
                id: record.id,
                name: record.name,
                first_name: record.first_name,
                last_name: record.last_name,
                email: record.email,
                phone: record.phone,
                profile_image_url: getGravatarByEmailAddress(record.email)
            });
        });
    }
} else {
    user = platform.api.get('user/profile');
    if (user && user.content) {
        // We can't get the ID like this... may need to get logged in user email and search system/user for it?
        user = user.content;
        result = {
            id: -1,
            name: user.name,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            profile_image_url: getGravatarByEmailAddress(user.email)
        };
    }
}

return { "resource": result };