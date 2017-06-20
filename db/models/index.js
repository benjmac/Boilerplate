'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const User = require('./user');


// Form the associations

// Examples
// Song.belongsTo(Album);
// Album.hasMany(Song);
// Album.belongsTo(Artist);

// Artist.belongsToMany(Song, { through: 'artistSong' });
// Song.belongsToMany(Artist, { through: 'artistSong' });

// Song.belongsToMany(Playlist, { through: 'playlistSong' });
// Playlist.belongsToMany(Song, { through: 'playlistSong' });

// exported just in case, but can also be fetched via db.model('Album') etc.

module.exports = {
  User: User
};
