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
    date: {
      type: DataTypes.INTEGER(11),
      field: 'date_posted'
    },
    status: {
      type: DataTypes.STRING(20),
    },
    comment_count: {
      type: DataTypes.INTEGER(11),
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
  // TODO change the query to extract company & source from post body
  BlogPost.getLatestBlogPosts = function() {
    return BlogPost.findAll({
      limit: 5,
      order: [['id', 'DESC']],
    });
  };

  return BlogPost;
};
