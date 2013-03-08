
// Push to cloud detail view

define([
	'lib/text!../../partials/pushdetail.html'
	], function (Template) {
	return Em.View.extend({
		template: Em.Handlebars.compile(Template),
		classNames: ['popup-modal'],
		apiKey: '',
		loading: false,
		destination: null,
		destinations: [],
		message: null,
		network: false,
		reload: function () {

			this.set('loading', true);

			var self = this;
			self.set('destinations', []);
			self.set('message', null);
			self.set('network', false);

			ENV.credential = this.get('apiKey');

			$.post('/credential', 'apiKey=' + this.get('apiKey'),
				function (result, status) {

				$.getJSON('/destinations', function (result, status) {

					if (result === 'network') {

						self.set('network', true);

					} else {

						var destinations = [];

						for (var i = 0; i < result.length; i ++) {

							destinations.push({
								id: result[i].vpc_name,
								name: result[i].vpc_label + ' (' + result[i].vpc_name + '.continuuity.net)'
							});

						}

						self.set('destinations', destinations);

					}

					self.set('loading', false);

				});

			});

		}.observes('apiKey'),
		submit: function () {

			this.set("pushing", true);
			var current = C.Ctl.Application.current;
			var self = this;

			var destination = self.get('destination');
			if (!destination) {
				return;
			}

			destination += '.continuuity.net';

			C.get('far', {
				method: 'promote',
				params: [current.id, destination, self.get('apiKey')]
			}, function (error, response) {

				if (error) {

					self.set('finished', 'Error');
					if (error.name) {
						self.set('finishedMessage', error.name + ': ' + error.message);
					} else {
						self.set('finishedMessage', response.message || JSON.stringify(error));
					}

				} else {

					self.set('finished', 'Success');
					self.set('finishedMessage', 'Successfully pushed to ' + destination + '.');
					self.set('finishedLink', 'https://' + destination + '/' + window.location.hash);
				}

				self.set("pushing", false);

			});

		},
		show: function (current) {

			var self = this;

			if (ENV.credential) {
				this.set('apiKey', ENV.credential);
			}

			$(this.get('element')).show();
			this.reload();

		},
		hide: function () {

			this.set('finished', null);
			this.set('current', null);
			$(this.get('element')).hide();

		}
	});
});