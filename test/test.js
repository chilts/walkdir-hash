var test = require('tape');

var walkdirWithHash = require('../index.js');

test('Test for unknown hash type', function(t) {
    t.plan(1);
    try {
        var stream = walkdirWithHash(__dirname + '/files', 'unknown-hash');
        t.fail('We should not get here with an invalid hash');
    }
    catch (e) {
        t.pass('An error was thrown');
    }
    t.end();
});

test('Test with MD5s', function(t) {
    t.plan(4);

    var stream = walkdirWithHash(__dirname + '/files', 'md5');

    stream.on('data', function(data) {
        if ( data.filename.match(/\/file.json$/) ) {
            t.equal(data.stat.size, 3, 'Size of file.json is correct');
            t.equal(data.hash, '8a80554c91d9fca8acb82f023de02f11', 'MD5 of file.json is correct');
        }
        if ( data.filename.match(/\/hello-world.txt$/) ) {
            t.equal(data.stat.size, 14, 'Size of hello-world.txt is correct');
            t.equal(data.hash, 'bea8252ff4e80f41719ea13cdf007273', 'MD5 of hello-world.txt is correct');
        }
    });

    stream.on('end', function() {
        t.end();
    });

});

test('Test with Sha1s', function(t) {
    t.plan(4);

    var stream = walkdirWithHash(__dirname + '/files', 'sha1');

    stream.on('data', function(data) {
        if ( data.filename.match(/\/file.json$/) ) {
            t.equal(data.stat.size, 3, 'Size of file.json is correct');
            t.equal(data.hash, '5f36b2ea290645ee34d943220a14b54ee5ea5be5', 'Sha1 of file.json is correct');
        }
        if ( data.filename.match(/\/hello-world.txt$/) ) {
            t.equal(data.stat.size, 14, 'Size of hello-world.txt is correct');
            t.equal(data.hash, '60fde9c2310b0d4cad4dab8d126b04387efba289', 'Sha1 of hello-world.txt is correct');
        }
    });

    stream.on('end', function() {
        t.end();
    });

});

test('Test with non-existant directory', function(t) {
    t.plan(1);

    var stream = walkdirWithHash(__dirname + '/non-existant-dir', 'md5');
    stream.on('error', function(err) {
        t.equal('ENOENT', err.code, 'Error is ENOENT');
        t.end();
    });
});
