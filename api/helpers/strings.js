'use strict'

function isAudioFile(ext) {
    return (ext == 'mp3' || ext == 'ogg');
}

module.exports = {
    isAudioFile
}
