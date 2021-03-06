(function () {
    'use strict';

    var app = {
        isLoading: true,
        visibleCards: {},
        selectedTimetables: [],
        spinner: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.cardTemplate'),
        container: document.querySelector('.main'),
        addDialog: document.querySelector('.dialog-container')
    };

    // Implementacion de indexedDB
    if (!('indexedDB' in window)) {
        console.log('Este navegador no soporta IndexedDB');
        return;
    }

    localforage.config({
        driver      : localforage.INDEXEDDB,
        name        : 'db-ratp-pwa',
        version     : 1,
        storeName   : 'timetables', // Should be alphanumeric, with underscores.
        description : 'bd de los timetables de los trenes'
    });

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    document.getElementById('butRefresh').addEventListener('click', function () {
        // Refresh all of the forecasts
        app.updateSchedules();
    });

    document.getElementById('butAdd').addEventListener('click', function () {
        // Open/show the add new city dialog
        app.toggleAddDialog(true);
    });

    document.getElementById('butAddCity').addEventListener('click', function () {

        var select = document.getElementById('selectTimetableToAdd');
        var selected = select.options[select.selectedIndex];
        var key = selected.value;
        var label = selected.textContent;
        if (!app.selectedTimetables) {
            app.selectedTimetables = [];
        }
        app.getSchedule(key, label);
        app.selectedTimetables.push({key: key, label: label});
		app.saveSelectedTimetables();
        app.toggleAddDialog(false);
    });

    document.getElementById('butAddCancel').addEventListener('click', function () {
        // Close the add new city dialog
        app.toggleAddDialog(false);
    });


    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    // Toggles the visibility of the add new city dialog.
    app.toggleAddDialog = function (visible) {
        if (visible) {
            app.addDialog.classList.add('dialog-container--visible');
        } else {
            app.addDialog.classList.remove('dialog-container--visible');
        }
    };

    // Updates a weather card with the latest weather forecast. If the card
    // doesn't already exist, it's cloned from the template.

    app.updateTimetableCard = function (data) {
        var key = data.key;
        var dataLastUpdated = new Date(data.created);
        var schedules = data.schedules;
        var card = app.visibleCards[key];

        if (!card) {
            var label = data.label.split(', ');
            var title = label[0];
            var subtitle = label[1];
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.label').textContent = title;
            card.querySelector('.subtitle').textContent = subtitle;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[key] = card;
        }
        card.querySelector('.card-last-updated').textContent = data.created;

        var scheduleUIs = card.querySelectorAll('.schedule');
        for(var i = 0; i<4; i++) {
            var schedule = schedules[i];
            var scheduleUI = scheduleUIs[i];
            if(schedule && scheduleUI) {
                scheduleUI.querySelector('.message').textContent = schedule.message;
            }
        }

        if (app.isLoading) {
            app.spinner.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }
    };

    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/


    app.getSchedule = function (key, label) {

 		if ('caches' in window) {
		  /*
		   * Check if the service worker has already cached this city's weather
		   * data. If the service worker has the data, then display the cached
		   * data while the app fetches the latest data.
		   */
 		  caches.match(url).then(function(response) {
			if (response) {
			  response.json().then(function updateFromCache(json) {
				var results = json.query.results;
				results.key = key;
				results.label = label;
				results.created = json.query.created;
				app.updateTimetableCard(results);
			  });
			}
		  });
		}

        var url = 'https://api-ratp.pierre-grimaud.fr/v3/schedules/' + key;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.response);
                    var result = {};
                    result.key = key;
                    result.label = label;
                    result.created = response._metadata.date;
                    result.schedules = response.result.schedules;
                    app.updateTimetableCard(result);
                }
            } else {
                // Return the initial weather forecast since no data is available.
                app.updateTimetableCard(initialStationTimetable);
            }
        };
        request.open('GET', url);
        request.send();
    };

    // Iterate all of the cards and attempt to get the latest forecast data
    app.updateSchedules = function () {
        var keys = Object.keys(app.visibleCards);
        keys.forEach(function (key) {
            app.getSchedule(key);
        });
    };

	// Guarda las estaciones
    app.saveSelectedTimetables = function() {
  		var selectedTimetables = JSON.stringify(app.selectedTimetables);
  		//localStorage.selectedTimetables = selectedTimetables;
      localforage.setItem('selectedTimetables', selectedTimetables).then(function (savedTimetables) {
          console.log(savedTimetables);
      }).catch(function(err) {
        console.error(err);
      });
	};

    /*
     * Fake weather data that is presented when the user first uses the app,
     * or when the user has not saved any cities. See startup code for more
     * discussion.
     */

    var initialStationTimetable = {

        key: 'metros/1/bastille/A',
        label: 'Bastille, Direction La Défense',
        created: '2017-07-18T17:08:42+02:00',
        schedules: [
            {
                message: '0 mn'
            },
            {
                message: '2 mn'
            },
            {
                message: '5 mn'
            }
        ]


    };


    /************************************************************************
     *
     * Code required to start the app
     *
     * NOTE: To simplify this codelab, we've used localStorage.
     *   localStorage is a synchronous API and has serious performance
     *   implications. It should not be used in production applications!
     *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
     *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
     ************************************************************************/

	  //app.selectedTimetables = localStorage.selectedTimetables;
    app.selectedTimetables = localforage.getItem('selectedTimetables').then(function (selectedTimetables) {
        console.log(selectedTimetables);
        return JSON.parse(selectedTimetables);
    }).catch(function(err) {
        console.error(err);
    });

	  //if (app.selectedTimetables) {
    if (app.selectedTimetables.length > 0) {
        console.log('Hay TimeTables en indexedDB');
		    app.selectedTimetables = JSON.parse(app.selectedTimetables);
		    app.selectedTimetables.forEach(function(timetable) {
		        app.getSchedule(timetable.key, timetable.label);
		    });
	  } else {
  		/* The user is using the app for the first time, or the user has not
  		 * saved any cities, so show the user some fake data. A real app in this
  		 * scenario could guess the user's location via IP lookup and then inject
  		 * that data into the page.
  		 */
  		//app.getSchedule('metros/1/bastille/A', 'Bastille, Direction La Défense');
      console.log('NO Hay TimeTables en indexedDB');
      app.getSchedule(initialStationTimetable.key, initialStationTimetable.label);
  		app.selectedTimetables = [
  			{key: initialStationTimetable.key, label: initialStationTimetable.label}
  		];
  		app.saveSelectedTimetables();
	  }

 	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
				 .register('./service-worker.js')
				 .then(function() { console.log('Service Worker Registered'); });
	}

})();
