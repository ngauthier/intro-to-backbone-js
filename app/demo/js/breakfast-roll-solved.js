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
      this.recipes.each(this.addRecipe, this);
      var form = new BreakfastRoll.Index.Form({collection: this.recipes});
      this.$el.append(form.render().el);
      return this;
    },
    addRecipe: function(recipe) {
      var view = new BreakfastRoll.Index.Recipe({model: recipe});
      this.$('.recipes').append(view.render().el);
    },
    count: function() {
      return this.recipes.length;
    }
  });

  BreakfastRoll.Index.Recipe = Backbone.View.extend({
    className: 'well',
    template: template('recipe'),
    events: {
      'click button': 'delete'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    name:        function() { return this.model.get('name');        },
    ingredients: function() { return this.model.get('ingredients'); },
    delete: function() {
      this.model.destroy();
    }
  });

  BreakfastRoll.Index.Form = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    template: template('form'),
    events: {
      'submit': 'add'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    add: function(event) {
      event.preventDefault();
      this.collection.create({
        name: this.$('#name').val(),
        ingredients: this.$('#ingredients').val()
      });
      this.render();
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
      var index = new BreakfastRoll.Index();
      this.el.empty();
      this.el.append(index.render().el);
    }
  });

  BreakfastRoll.boot = function(container) {
    container = $(container);
    var router = new BreakfastRoll.Router({el: container})
    Backbone.history.start();
  }
})()
