'use strict'

const moment = require('moment');
const _ = require('lodash');
const cheerio = require('cheerio');

module.exports = (sequelize, DataTypes) => {
  var BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
    },
    author_id: {
      type: DataTypes.INTEGER(11),
    },
    title: {
      type: DataTypes.STRING(80),
    },
    slug: {
      type: DataTypes.STRING(80),
    },
    body: {
      type: DataTypes.TEXT('medium'),
      field: 'post_body'
    },
    date_posted: {
      type: DataTypes.INTEGER(11),
    },
    date: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return moment.unix(new Date(this.date_posted)).format('YYYY-MM-DD')
      },
    },
    status: {
      type: DataTypes.STRING(20),
    },
    media: {
      type: DataTypes.VIRTUAL,
      get: function() {
        const $ = cheerio.load(this.body);
        const mediaNames = $('span.media-name').map(function() { return _.trim($(this).text()) }).get();
        const mediaUrls = $('span.media-url').map(function() { return _.trim($(this).text()) }).get();

        return _.map(mediaNames, function(name, index) {
          return {
            name: name,
            url: mediaUrls[index],
          }
        });
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_blog_posts',
  });

  // Get latest blog posts
  BlogPost.getLatestBlogPosts = function(limit=5) {
    return BlogPost.findAll({
      limit: limit,
      order: [['id', 'DESC']],
    });
  };

  return BlogPost;
};
