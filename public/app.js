window.replacetest = {};

replacetest.model = Backbone.Model.extend({
});

replacetest.collection = Backbone.Collection.extend({
    model: replacetest.model,
    url: '/collection'
});

replacetest.app = Backbone.View.extend({
    el: 'body',
    events: {
        "click button.refresh" : "update"
    },
    initialize: function() {
        _.bindAll(this,
            'render',
            'update');
        window.collection = new replacetest.collection();
        this.list = new replacetest.list();
    },
    render: function() {
        console.log("[VIEW] Render..");
        this.$('.list-wrapper').html(this.list.render().el);
    },
    update: function() {
        window.collection.fetch({replace: true});
    }
});

replacetest.list = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
        _.bindAll(this,
            'render',
            'renderAll',
            'renderOne',
            'collectionAdd');
        window.collection.on('add', this.collectionAdd);
    },

    render: function() {
        this.$el.empty();

        var dfd = window.collection.fetch();
        dfd.then(this.renderAll);

        return this;
    },

    renderAll: function() {
        return window.collection.each(this.renderOne);
    },

    renderOne: function(model) {
        var item = new replacetest.listItem( { model: model });
        this.$el.append(item.render().el);

        return this;
    },

    collectionAdd: function(model) {
        console.log('A model was added to the collection.', model);
        this.renderOne(model);
    }
});
replacetest.listItem = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#listItem').html()),

    initialize: function() {
        _.bindAll(this,
            'render',
            'changed');
        this.model.on('change', this.changed);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changed: function() {
        console.log("Change!", this.model);
        this.render();
    }
});
