// ----------------------------------------------------------------------------
//
// walkdir-hash
//
//
//
// ----------------------------------------------------------------------------

// core
var crypto = require('crypto');
var fs = require('fs');

// npm
var through2 = require('through2');
var walkdir = require('walkdir');

// ----------------------------------------------------------------------------

function walkdirWithHash(dir, hashType) {
    var stream = through2({ objectMode : true });

    if ( crypto.getHashes().indexOf(hashType) === -1 ) {
        throw new Error('Specify a valid hash type');
    }

    var inProgress = 0;
    var ended = false;

    var emitter = walkdir(dir);
    emitter.on('file', function(filename, stat) {
        inProgress++;
        var item = {
            filename : filename,
            stat     : stat,
        };

        var filestream = fs.createReadStream(filename);
        var hash = crypto.createHash(hashType);

        filestream.on('end', function() {
            item.hash = hash.digest('hex');
            stream.push(item);
            inProgress--;
            if ( ended === true && inProgress === 0 ) {
                stream.push(); // end
            }
        });

        // pipe the file to the hash
        filestream.pipe(hash, { end : false });
    });

    emitter.on('error', function(path, err) {
        stream.emit('error', err);
    });

    // emitter.on('fail', function(path, err) {
    //     console.log('fail:', path);
    //     console.log('fail:', err);
    //     stream.emit('error', err);
    // });

    emitter.on('end', function() {
        ended = true;
        if ( inProgress === 0 ) {
            stream.push(); // end
        }
    });

    return stream;
}

// ----------------------------------------------------------------------------

module.exports = walkdirWithHash;

// ----------------------------------------------------------------------------
