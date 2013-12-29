# walkdir-hash #

Stream all filenames in a dir (recursively) and receive the filename, stat and
your specified hash for each file.

Builds on [walkdir](https://npmjs.org/package/walkdir) except you can specify
a hash type (e.g. md5, sha1, sha256) which should be performed on each file.

Unlike `walkdir` which returns an event emitter, `walkdir-hash` returns a
stream in object mode.  Hence you can listen for `data` events, `error` events
and the `end` event.

## Synopsis ##

```
var walk = require('walkdir-hash');

var stream = walk('files', 'md5');
stream.on('data', console.log);
stream.on('error', console.warn);
stream.on('end', function() {
    console.log('Ended');
});
```

For the files `files/hello-world.txt` and `files/file.json`, you will get two
`data` events.

The output might look like:

```
{ filename: '/home/chilts/src/chilts-walkdir-hash/test/files/file.json',
  stat:
   { dev: 19,
     mode: 33204,
     nlink: 1,
     uid: 1000,
     gid: 1000,
     rdev: 0,
     blksize: 4096,
     ino: 3541565,
     size: 3,
     blocks: 24,
     atime: Sun Dec 29 2013 20:27:11 GMT+1300 (NZDT),
     mtime: Sun Dec 29 2013 20:26:46 GMT+1300 (NZDT),
     ctime: Sun Dec 29 2013 20:26:46 GMT+1300 (NZDT) },
  hash: '8a80554c91d9fca8acb82f023de02f11' }
{ filename: '/home/chilts/src/chilts-walkdir-hash/test/files/hello-world.txt',
  stat:
   { dev: 19,
     mode: 33204,
     nlink: 1,
     uid: 1000,
     gid: 1000,
     rdev: 0,
     blksize: 4096,
     ino: 3541564,
     size: 14,
     blocks: 24,
     atime: Sun Dec 29 2013 20:27:11 GMT+1300 (NZDT),
     mtime: Sun Dec 29 2013 20:26:29 GMT+1300 (NZDT),
     ctime: Sun Dec 29 2013 20:26:29 GMT+1300 (NZDT) },
  hash: 'bea8252ff4e80f41719ea13cdf007273' }
```

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

## License ##

MIT - http://chilts.mit-license.org/2013/

(Ends)
