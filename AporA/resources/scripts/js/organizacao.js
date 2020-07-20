import { Calendar } from './modules/Calendar/Calendar.js';
import { CalendarDisplay } from './modules/Calendar/CalendarDisplay.js';
import { ActivityDisplayFactory } from './modules/Calendar/ActivityDisplayFactory.js';
import { ActivityFactory } from './modules/Calendar/ActivityFactory.js';
import { CalendarMouseActionsMenu } from './modules/Calendar/CalendarMouseMenu.js';

function main() {
    const container = document.getElementById('calendarContainer');

    const activityDisplayFactory = new ActivityDisplayFactory('SelectedActivity');
    const calendarDisplay = new CalendarDisplay(container, activityDisplayFactory);
    calendarDisplay.render();

    const activityFactory = new ActivityFactory();
    const calendar = new Calendar(activityFactory);

    calendar.registerDisplay(calendarDisplay);

    const calendarMenu = new CalendarMouseActionsMenu(calendarDisplay.getCalendarGrid(), calendar);
    calendarMenu.startListening();

    const easySubjects = document.getElementsByClassName('easy_subject');
    const difficultSubjects = document.getElementsByClassName('dificult_subject');
    console.log(easySubjects);
    console.log(difficultSubjects);

    const submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = {}
        const json = '{"easySubjects":[' + '"' + easySubjects[0].value + '",' +
                     '"' + easySubjects[1].value + '"], "difficultSubjects":[' +
                     '"' + difficultSubjects[0].value + '",' +
                     '"' + difficultSubjects[1].value + '"],"availableHours":' + 
                     calendar.toJson() + '}';
        const request = new XMLHttpRequest();
        const csrfToken = Cookies.get('csrftoken');
        console.log(json);
        console.log('object');
        console.log(JSON.parse(json));
        request.open('POST', 'organizacao');
        request.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.setRequestHeader("X-CSRFToken", csrfToken);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = () => {
            console.log(request.response);
            //window.location.reload(true);
        };
        request.send(json);
    });
}

window.onload = main;
