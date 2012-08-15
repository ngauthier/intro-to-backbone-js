(function() {
  var BreakfastRoll = {};
  window.BreakfastRoll = BreakfastRoll;

  var template = function(name) {
    return Handlebars.compile($('#'+name+'-template').html());
  };

  BreakfastRoll.Recipe = Backbone.Model.extend({
  });

  BreakfastRoll.Recipes = Backbone.Collection.extend({
    localStorage: new Store("recipes")
  });

  BreakfastRoll.Index = Backbone.View.extend({
    template: template('index'),
    initialize: function() {
      this.recipes = new BreakfastRoll.Recipes();
      this.recipes.on('all', this.render, this);
      this.recipes.fetch();
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    count: function() {
      return this.recipes.length;
    }
  });

  BreakfastRoll.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var view = new BreakfastRoll.Index();
      this.el.empty();
      this.el.append(view.render().el);
    }
  });

  BreakfastRoll.boot = function(container) {
    container = $(container);
    var router = new BreakfastRoll.Router({el: container})
    Backbone.history.start();
  }
})()
